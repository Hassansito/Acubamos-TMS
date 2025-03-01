<template>
    <Form @submit="handleSubmit" :validation-schema="schema" v-slot="{ resetForm }">
        <div class="row my-6">
            <div class="py-4">
                <div class="card shadow-sm">
                    <div class="mb-4 px-4 py-4 col-11 mx-6">
                        <label class="required form-label">Cliente</label>
                        <Field name="cliente" as="input" type="text" class="form-control"
                            placeholder="Nombre del cliente" />
                        <ErrorMessage name="cliente" class="text-danger" />
                    </div>
                    <div class="mb-4 px-4 py-4 col-11 mx-6">
                        <label class="required form-label">Correo</label>
                        <Field name="correo" as="input" type="email" class="form-control"
                            placeholder="Correo del cliente" />
                        <ErrorMessage name="correo" class="text-danger" />
                    </div>
                    <div class="row mx-1">
                        <div class="mb-4 px-4 py-4 col-5 mx-8">
                            <label class="required form-label">Fecha de inicio</label>
                            <Field name="fechaI" as="input" type="date" class="form-control" />
                            <ErrorMessage name="fechaI" class="text-danger" />
                        </div>
                        <div class="mb-4 px-4 py-4 col-5 mx-8">
                            <label class="required form-label">Fecha de finalización</label>
                            <Field name="fechaF" as="input" type="date" class="form-control" />
                            <ErrorMessage name="fechaF" class="text-danger" />
                        </div>
                    </div>
                    <div class="mb-4 px-4 py-4 col-11 mx-6">
                        <label class="form-label">Contrato (PDF o Word)</label>
                        <input name="contrato" type="file" @change="handleFileChange" class="form-control"
                            accept=".pdf,.doc,.docx" />
                        <small v-if="contratoFile" class="text-muted">Archivo seleccionado: {{ contratoFile.name
                            }}</small>
                    </div>
                </div>
                <div class="card-footer my-8 d-flex justify-content-end">
                    <a href="#" class="btn btn-bg-secondary">Cancelar</a>
                    <button type="submit" class="btn btn-bg-primary mx-3" :disabled="loading">
                        <span v-if="!loading">Guardar</span>
                        <span v-if="loading">
                            Guardando...
                            <span class="spinner-border spinner-border-sm align-middle ms-2"></span>
                        </span>
                    </button>
                </div>
            </div>
        </div>
    </Form>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import { type IContratos } from "@/core/data/contratos";
import { useContratosStore } from "@/stores/contratos";
import Swal from "sweetalert2/dist/sweetalert2.js";

// Interfaz para los valores del formulario
interface FormValues {
    cliente: string;
    correo: string;
    fechaI: string;
    fechaF: string;
}

export default defineComponent({
    name: "AddContratos",
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    setup() {
        const contratosStore = useContratosStore();
        const loading = ref(false);
        const contratoFile = ref<File | null>(null);

        // Esquema de validación con Yup
        const schema = yup.object({
            cliente: yup.string().required("El nombre del cliente es requerido"),
            correo: yup.string().email("Correo inválido").required("El correo es requerido"),
            fechaI: yup.string().required("La fecha de inicio es requerida"),
            fechaF: yup.string().required("La fecha de finalización es requerida"),
        });

        // Manejar el cambio de archivo
        const handleFileChange = (event: Event) => {
            const target = event.target as HTMLInputElement;
            if (target.files && target.files[0]) {
                const file = target.files[0];
                if (!file.name.match(/\.(pdf|doc|docx)$/i)) {
                    Swal.fire({
                        text: "Formato de archivo no válido. Solo se permiten PDF o Word.",
                        icon: "error",
                        buttonsStyling: false,
                        confirmButtonText: "Ok, entendido",
                        heightAuto: false,
                        customClass: {
                            confirmButton: "btn btn-primary",
                        },
                    });
                    return;
                }
                contratoFile.value = file;
            } else {
                contratoFile.value = null; // Limpiar el archivo seleccionado si no hay archivo
            }
        };

        // Función para manejar el envío del formulario
        const handleSubmit = async (values: FormValues, { resetForm }: { resetForm: () => void }) => {
            loading.value = true;

            try {
                let contratoUrl = ""; // Valor por defecto: cadena vacía
                if (contratoFile.value) {
                    contratoUrl = await uploadFile(contratoFile.value);
                }

                const newContrato: IContratos = {
                    id: contratosStore.contracts.length + 1, // Usar `contracts` en lugar de `contratos`
                    cliente: values.cliente,
                    correo: values.correo,
                    fechaI: values.fechaI,
                    fechaF: values.fechaF,
                    contrato: contratoUrl, // Será una cadena vacía si no se subió un archivo
                };

                contratosStore.addContrato(newContrato); // Agregar el contrato al store
                console.log("Contrato agregado:", newContrato);

                Swal.fire({
                    text: "Contrato guardado exitosamente!",
                    icon: "success",
                    buttonsStyling: false,
                    confirmButtonText: "Ok, entendido",
                    heightAuto: false,
                    customClass: {
                        confirmButton: "btn btn-primary",
                    },
                }).then(() => {
                    resetForm();
                    contratoFile.value = null;
                    const fileInput = document.querySelector('input[name="contrato"]') as HTMLInputElement;
                    if (fileInput) fileInput.value = "";
                });
            } catch (error) {
                console.error("Error al agregar el contrato a la lista:", error); // Registrar el error en la consola
                Swal.fire({
                    text: "Hubo un error al guardar el contrato. Por favor, inténtalo de nuevo.",
                    icon: "error",
                    buttonsStyling: false,
                    confirmButtonText: "Ok, entendido",
                    heightAuto: false,
                    customClass: {
                        confirmButton: "btn btn-primary",
                    },
                });
            } finally {
                loading.value = false;
            }
        };

        // Función para subir el archivo (simulada o real)
        const uploadFile = async (file: File): Promise<string> => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    const fakeUrl = URL.createObjectURL(file);
                    resolve(fakeUrl);
                }, 1000);
            });
        };

        return {
            schema,
            handleSubmit,
            handleFileChange,
            loading,
            contratoFile,
        };
    },
});
</script>