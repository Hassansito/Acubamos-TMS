<template>
    <div class="card">
        <div class="card-header">
            <div class="d-flex align-items-center position-relative my-1">
                <KTIcon icon-name="magnifier" icon-class="fs-1 position-absolute ms-6" />
                <input type="text" v-model="search" @input="searchItems()"
                    class="form-control form-control-solid w-250px ps-15" placeholder="Buscar Reserva" />
            </div>
            <div class="card-toolbar">
                <div v-if="selectedIds.length === 0" class="d-flex justify-content-end"
                    data-kt-subscription-table-toolbar="base"></div>
                <div v-else class="d-flex justify-content-end align-items-center">
                    <div class="fw-bold me-5">
                        <span class="me-2">{{ selectedIds.length }}</span>Selected
                    </div>
                    <button type="button" class="btn btn-danger" @click="deleteFewReservas()">
                        Delete Selected
                    </button>
                </div>
            </div>
        </div>
        <div class="card-body">
            <KTDatatable :header="tableHeader" :data="reservas" @on-sort="sort" :checkbox-enabled="true"
                @on-items-select="onItemSelect">
                <template v-slot:id="{ row: data }">
                    {{ data.id }}
                </template>
                <template v-slot:nombre="{ row: data }">
                    {{ data.nombre }}
                </template>
                <template v-slot:pasaporte="{ row: data }">
                    {{ data.pasaporte }}
                </template>
                <template v-slot:telefono="{ row: data }">
                    {{ data.telefono }}
                </template>
                <template v-slot:origen="{ row: data }">
                    {{ data.origen }}
                </template>
                <template v-slot:destino="{ row: data }">
                    {{ data.destino }}
                </template>
                <template v-slot:fecha="{ row: data }">
                    {{ formatDate(data.fecha) }}
                </template>
                <template v-slot:hora="{ row: data }">
                    {{ data.hora }}
                </template>
                <template v-slot:tipodepago="{ row: data }">
                    {{ data.tipodepago }}
                </template>
                <template v-slot:tipodemercado="{ row: data }">
                    {{ data.tipodemercado }}
                </template>
                <template v-slot:tipodetrasnporte="{ row: data }">
                    {{ data.tipodetrasnporte }}
                </template>
                <template v-slot:condicionesadicionales="{ row: data }">
                    {{ data.condicionesadicionales }}
                </template>
                <template v-slot:actions="{ row: data }">
                    <div>
                        <a href="#" class="btn btn-sm btn-light btn-active-light-primary" data-kt-menu-trigger="click"
                            data-kt-menu-placement="bottom-end" data-kt-menu-flip="top-end">Actions
                            <KTIcon icon-name="down" icon-class="fs-5 m-0" />
                        </a>
                        <!--begin::Menu-->
                        <div class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-semibold fs-7 w-125px py-4"
                            data-kt-menu="true">
                            <!--begin::Menu item-->
                            <div class="menu-item px-3">
                                <a @click="openModal(data)" class="menu-link px-3">Editar</a>
                            </div>
                            <!--end::Menu item-->
                            <!--begin::Menu item-->
                            <div class="menu-item px-3">
                                <a @click="deleteReserva(data.id)" class="menu-link px-3">Delete</a>
                            </div>
                            <!--end::Menu item-->
                        </div>
                        <!--end::Menu-->
                    </div>
                </template>
            </KTDatatable>
            <!--Modal-->
            <div class="modal fade" tabindex="-1" id="kt_modal_1">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h3 class="modal-title">Detalles de la reserva</h3>
                            <div class="btn btn-icon btn-sm btn-active-light-primary ms-2" data-bs-dismiss="modal"
                                aria-label="Close">
                                <i class="ki-duotone ki-cross fs-1"><span class="path1"></span><span
                                        class="path2"></span></i>
                            </div>
                        </div>
                        <div class="modal-body">
                            <div>
                                <div v-if="isEditable">
                                    <el-form :model="selectedReserva" ref="formRef">
                                        <!-- Nombre -->
                                        <label class="fs-5 fw-semibold form-label mb-5">Nombre:</label>
                                        <div class="fv-row mb-5">
                                            <el-form-item prop="nombre">
                                                <el-input v-model="selectedReserva.nombre"
                                                    class="form-control-solid w-250px"
                                                    aria-label="Edit customer name" />
                                            </el-form-item>
                                        </div>

                                        <!-- Pasaporte -->
                                        <label class="fs-5 fw-semibold form-label mb-5">Pasaporte:</label>
                                        <div class="fv-row mb-5">
                                            <el-form-item prop="pasaporte">
                                                <el-input v-model="selectedReserva.pasaporte"
                                                    class="form-control-solid w-250px" aria-label="Edit pasaporte" />
                                            </el-form-item>
                                        </div>

                                        <!-- Teléfono -->
                                        <label class="fs-5 fw-semibold form-label mb-5">Teléfono:</label>
                                        <div class="fv-row mb-5">
                                            <el-form-item prop="telefono">
                                                <el-input v-model="selectedReserva.telefono"
                                                    class="form-control-solid w-250px" aria-label="Edit telefono" />
                                            </el-form-item>
                                        </div>

                                        <!-- Origen -->
                                        <label class="fs-5 fw-semibold form-label mb-5">Origen:</label>
                                        <div class="fv-row mb-5">
                                            <el-form-item prop="origen">
                                                <el-input v-model="selectedReserva.origen"
                                                    class="form-control-solid w-250px" aria-label="Edit origen" />
                                            </el-form-item>
                                        </div>

                                        <!-- Destino -->
                                        <label class="fs-5 fw-semibold form-label mb-5">Destino:</label>
                                        <div class="fv-row mb-5">
                                            <el-form-item prop="destino">
                                                <el-input v-model="selectedReserva.destino"
                                                    class="form-control-solid w-250px" aria-label="Edit destino" />
                                            </el-form-item>
                                        </div>

                                        <!-- Fecha -->
                                        <label class="fs-5 fw-semibold form-label mb-5">Fecha:</label>
                                        <div class="fv-row mb-5">
                                            <el-form-item prop="fecha">
                                                <el-date-picker v-model="selectedReserva.fecha" type="date"
                                                    class="form-control-solid w-250px" aria-label="Edit fecha" />
                                            </el-form-item>
                                        </div>

                                        <!-- Hora -->
                                        <p>
                                            Hora:
                                            <input type="time" v-model="selectedReserva.hora"
                                                class="form-control w-250px" aria-label="Edit hora" />
                                        </p>

                                        <!-- Tipo de pago -->
                                        <label class="fs-5 fw-semibold form-label mb-5">Tipo de pago:</label>
                                        <div class="fv-row mb-5">
                                            <el-form-item prop="tipodepago">
                                                <div class="form-check form-check-custom" v-for="tarjetas in tarjetasT"
                                                    :key="tarjetas">
                                                    <input class="form-check-input" type="radio" :value="tarjetas"
                                                        v-model="selectedReserva.tipodepago"
                                                        :id="`radio-${tarjetas}`" />
                                                    <label class="form-check-label me-3 text-white" :for="`radio-${tarjetas}`">
                                                        {{ tarjetas }}
                                                    </label>
                                                </div>
                                            </el-form-item>
                                        </div>     
                                    <!-- Tipo de mercado -->
                                    <label class="fs-5 fw-semibold form-label mb-5">Tipo de mercado:</label>
                                    <div class="fv-row mb-5">
                                        <el-form-item prop="tipodemercado">
                                            <div class="form-check form-check-custom" v-for="mercado in mercadoT"
                                                :key="mercado">
                                                <input class="form-check-input" type="radio" :value="mercado"
                                                    v-model="selectedReserva.tipodemercado" :id="`radio-${mercado}`" />
                                                <label class="form-check-label me-3 text-white" :for="`radio-${mercado}`">
                                                    {{ mercado }}
                                                </label>
                                            </div>
                                        </el-form-item>
                                    </div>
                                    <!-- Tipo de transporte -->
                                    <label class="fs-5 fw-semibold form-label mb-5">Tipo de transporte:</label>
                                    <div class="fv-row mb-5">
                                        <el-form-item prop="tipodetrasnporte">
                                            <div class="form-check form-check-custom" v-for="transporte in mediosT"
                                                :key="transporte">
                                                <input class="form-check-input" type="radio" :value="transporte"
                                                    v-model="selectedReserva.tipodetrasnporte"
                                                    :id="`radio-${transporte}`" />
                                                <label class="form-check-label me-3 text-white" :for="`radio-${transporte}`">
                                                    {{ transporte }}
                                                </label>
                                            </div>
                                        </el-form-item>
                                    </div>
                                    <!-- Condiciones adicionales -->
                                    <label class="fs-5 fw-semibold form-label mb-5">Condiciones adicionales:</label>
                                    <div class="fv-row mb-5">
                                        <el-form-item prop="condicionesadicionales">
                                            <el-input v-model="selectedReserva.condicionesadicionales" type="textarea"
                                                class="form-control-solid w-450px"
                                                aria-label="Edit condiciones adicionales" />
                                        </el-form-item>
                                    </div>
                                    </el-form>
                                </div>
                                <div v-else>
                                    <!-- Vista de solo lectura -->
                                    <p>ID: {{ selectedReserva.id }}</p>
                                    <p>Nombre: {{ selectedReserva.nombre }}</p>
                                    <p>Pasaporte: {{ selectedReserva.pasaporte }}</p>
                                    <p>Teléfono: {{ selectedReserva.telefono }}</p>
                                    <p>Origen: {{ selectedReserva.origen }}</p>
                                    <p>Destino: {{ selectedReserva.destino }}</p>
                                    <p>Fecha: {{ formatDate(selectedReserva.fecha) }}</p>
                                    <p>Hora: {{ selectedReserva.hora }}</p>
                                    <p>Tipo de pago: {{ selectedReserva.tipodepago }}</p>
                                    <p>Tipo de mercado: {{ selectedReserva.tipodemercado }}</p>
                                    <p>
                                        Tipo de transporte: {{ selectedReserva.tipodetrasnporte }}
                                    </p>
                                    <p>
                                        Condiciones adicionales:
                                        {{ selectedReserva.condicionesadicionales }}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button :data-kt-indicator="loading ? 'on' : null" class="btn btn-lg btn-primary"
                                type="submit" @click="toggleEditMode">
                                <span v-if="!loading" class="indicator-label">
                                    {{ isEditable ? "Guardar cambios" : "Actualizar" }}
                                </span>
                                <span v-if="loading" class="indicator-progress">
                                    Please wait...
                                    <span class="spinner-border spinner-border-sm align-middle ms-2"></span>
                                </span>
                            </button>
                            <button type="button" class="btn btn-light" data-bs-dismiss="modal">
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <!--End Modal-->
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, onMounted } from "vue";
import KTDatatable from "@/components/kt-datatable/KTDataTable.vue";
import type { Sort } from "@/components/kt-datatable/table-partials/models";
import arraySort from "array-sort";
import { useReservasStore } from "@/stores/reservas";
import { type IReservaciones } from "@/core/data/reservaciones";
import { Modal } from "bootstrap";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { MenuComponent } from "@/assets/ts/components";
export default defineComponent({
    name: "ListReservations",
    components: {
        KTDatatable,
    },
    setup() {
        const reservasStore = useReservasStore();
        const reservas = computed(() => reservasStore.getProducts);
        const loading = ref<boolean>(false);
        const initCustomers = ref<Array<IReservaciones>>([]);
        const mediosT = ref(["Bus", "Carro", "Taxi", "Minibus"]);
        const tarjetasT = ref(["Transfermovil", "Enzona", "Visa", "Mastercard"]);
        const mercadoT = ref(["Nacional", "Internacional"]);
        console.log("Productos en el store:", reservas.value);
        onMounted(() => {
            initCustomers.value.splice(0, reservas.value.length, ...reservas.value);
        });
        const tableHeader = ref([
            {
                columnName: "",
                columnLabel: "id",
                sortEnabled: true,
                columnWidth: 20,
            },
            {
                columnName: "Nombre",
                columnLabel: "nombre",
                sortEnabled: true,
                columnWidth: 100,
            },
            {
                columnName: "Pasaporte",
                columnLabel: "pasaporte",
                sortEnabled: true,
                columnWidth: 100,
            },
            {
                columnName: "Telefono",
                columnLabel: "telefono",
                sortEnabled: true,
                columnWidth: 100,
            },
            {
                columnName: "Origen",
                columnLabel: "origen",
                sortEnabled: true,
                columnWidth: 100,
            },
            {
                columnName: "Destino",
                columnLabel: "destino",
                sortEnabled: true,
                columnWidth: 100,
            },
            {
                columnName: "Fecha",
                columnLabel: "fecha",
                sortEnabled: true,
                columnWidth: 50,
            },
            {
                columnName: "Hora",
                columnLabel: "hora",
                sortEnabled: true,
                columnWidth: 50,
            },
            {
                columnName: "Pago",
                columnLabel: "tipodepago",
                sortEnabled: true,
                columnWidth: 100,
            },
            {
                columnName: "Mercado",
                columnLabel: "tipodemercado",
                sortEnabled: true,
                columnWidth: 100,
            },
            {
                columnName: "Transporte",
                columnLabel: "tipodetrasnporte",
                sortEnabled: true,
                columnWidth: 50,
            },
            {
                columnName: "Condiciones adicionales",
                columnLabel: "condicionesadicionales",
                sortEnabled: true,
                columnWidth: 200,
            },
            {
                columnName: "",
                columnLabel: "actions",
                columnWidth: 120,
            },
        ]);

        const sort = (sort: Sort) => {
            const reverse: boolean = sort.order === "asc";
            if (sort.label) {
                arraySort(reservas.value, sort.label, { reverse });
            }
        };
        const deleteReserva = (id: number) => {
            for (let i = 0; i < reservas.value.length; i++) {
                if (reservas.value[i].id === id) {
                    reservas.value.splice(i, 1);
                }
            }
        };
        const selectedIds = ref<Array<number>>([]);
        const deleteFewReservas = () => {
            selectedIds.value.forEach((item) => {
                deleteReserva(item);
            });
            selectedIds.value.length = 0;
        };
        const onItemSelect = (selectedItems: Array<number>) => {
            selectedIds.value = selectedItems;
        };

        const selectedReserva = ref<IReservaciones>({
            id: 0,
            origen: "",
            destino: "",
            fecha: "",
            hora: "",
            pasaporte: "",
            tipodetrasnporte: "",
            tipodemercado: "",
            nombre: "",
            telefono: "",
            tipodepago: "",
            condicionesadicionales: "",
        });
        const openModal = (order: IReservaciones) => {
            selectedReserva.value = order;
            const modalElement = document.getElementById("kt_modal_1");
            if (modalElement) {
                const modal = new Modal(modalElement);
                modal.show();
            }
        };

        const closeModal = () => {
            const modalElement = document.getElementById("kt_modal_1");
            if (modalElement) {
                const modal = new Modal(modalElement);
                modal.hide();
            }
        };
        const isEditable = ref(false);

        const toggleEditMode = async () => {
            if (isEditable.value) {
                loading.value = true;
                try {
                    reservasStore.updateReserva(selectedReserva.value);

                    Swal.fire({
                        text: "¡Oferta actualizada exitosamente!",
                        icon: "success",
                        buttonsStyling: false,
                        confirmButtonText: "Ok",
                        customClass: {
                            confirmButton: "btn btn-primary",
                        },
                    }).then(() => {
                        const modalElement = document.getElementById("kt_modal_1");
                        if (modalElement) {
                            const modal =
                                Modal.getInstance(modalElement) || new Modal(modalElement);
                            modal.hide();
                        }
                    });
                } catch (error) {
                    Swal.fire({
                        text: "Hubo un error al actualizar la oferta.",
                        icon: "error",
                        buttonsStyling: false,
                        confirmButtonText: "Ok",
                        customClass: {
                            confirmButton: "btn btn-primary",
                        },
                    });
                } finally {
                    loading.value = false;
                }
            }
            isEditable.value = !isEditable.value;
        };
        const formatDate = (dateString) => {
            if (!dateString) return "";
            const date = new Date(dateString);
            if (isNaN(date.getTime())) {
                return "Invalid Date";
            }
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, "0");
            const day = String(date.getUTCDate()).padStart(2, "0");
            return `${day}/${month}/${year}`;
        };
        const search = ref<string>("");
        const searchItems = () => {
            reservas.value.splice(0, reservas.value.length, ...initCustomers.value);
            if (search.value !== "") {
                let results: Array<IReservaciones> = [];
                for (let j = 0; j < reservas.value.length; j++) {
                    if (searchingFunc(reservas.value[j], search.value)) {
                        results.push(reservas.value[j]);
                    }
                }
                reservas.value.splice(0, reservas.value.length, ...results);
            }
            MenuComponent.reinitialization();
        };
        const searchingFunc = (obj: any, value: string): boolean => {
            for (let key in obj) {
                if (!Number.isInteger(obj[key]) && !(typeof obj[key] === "object")) {
                    if (obj[key].indexOf(value) != -1) {
                        return true;
                    }
                }
            }
            return false;
        };
        return {
            tableHeader,
            reservas,
            sort,
            deleteReserva,
            deleteFewReservas,
            selectedIds,
            onItemSelect,
            selectedReserva,
            openModal,
            closeModal,
            toggleEditMode,
            isEditable,
            formatDate,
            loading,
            search,
            searchItems,
            mediosT,
            tarjetasT,
            mercadoT,
        };
    },
});
</script>