import type { MenuItem } from "@/layouts/default-layout/config/types";
import { ref, computed, watch } from "vue";
import { useAppStore } from "@/stores/store";

export default function useDynamicMenu() {
  const store = useAppStore();
  const menuItems = ref<Array<MenuItem>>([]);

  const computedMenuItems = computed(() => {
    if (store.categoriaSeleccionada === "Hoteles") {
      return [
        {
          pages: [
            {
              heading: "dashboard",
              route: "/dashboard",
              keenthemesIcon: "element-11",
              bootstrapIcon: "bi-app-indicator",
            },
            // {
            //   heading: "layoutBuilder",
            //   route: "/builder",
            //   keenthemesIcon: "switch",
            //   bootstrapIcon: "bi-layers",
            // },
          ],
        },

        /*               Administración            */
        {
          heading: "Adminintración",
          route: "/adminintracion",
          pages: [
            {
              sectionTitle: "nomencladores",
              route: "/nomencladores",
              keenthemesIcon: "element-plus",
              bootstrapIcon: "bi-archive",
              sub: [
                {
                  heading: "tipos de camas",
                  route: "/administracion/nomencladores/hoteles/tiposcama",
                },
                {
                  heading: "clasificación de habitaciones",
                  route:
                    "/administracion/nomencladores/hoteles/clasificacionhabitaciones",
                },
                {
                  heading: "cadena hotelera",
                  route: "/administracion/nomencladores/hoteles/cadenahotelera",
                },
              ],
            },
          ],
        },
        /*               Comercialización            */
        {
          heading: "Comercialización",
          route: "/comercializacion",
          pages: [
            {
              heading: "reservar",
              route: "/comercializacion/reservar",
              keenthemesIcon: "fingerprint-scanning",
              bootstrapIcon: "bi-sticky",
            },
            {
              heading: "reservas",
              route: "/comercializacion/reservas",
              keenthemesIcon: "fingerprint-scanning",
              bootstrapIcon: "bi-sticky",
            },
            {
              heading: "hoteles",
              route: "/comercializacion/hoteles",
              keenthemesIcon: "fingerprint-scanning",
              bootstrapIcon: "bi-sticky",
            },
            {
              heading: "ofertas",
              route: "/comercializacion/ofertas",
              keenthemesIcon: "fingerprint-scanning",
              bootstrapIcon: "bi-sticky",
            },
            {
              heading: "productos",
              route: "/comercializacion/productos",
              keenthemesIcon: "fingerprint-scanning",
              bootstrapIcon: "bi-sticky",
            },
            {
              heading: "calendarApp",
              route: "/apps/calendar",
              keenthemesIcon: "calendar-8",
              bootstrapIcon: "bi-calendar3-event",
            },
          ],
        },
        /*               Configuración            */
        {
          heading: "Configuración",
          route: "/configuracion",
          pages: [
            {
              heading: "edades",
              route: "/configuracion/hoteles/edades",
              keenthemesIcon: "fingerprint-scanning",
              bootstrapIcon: "bi-sticky",
            },
            {
              heading: "planes alimenticios",
              route: "/configuracion/hoteles/planes",
              keenthemesIcon: "fingerprint-scanning",
              bootstrapIcon: "bi-sticky",
            },
          ],
        },
      ];

      /*                     TRANSFER                     */
    }else if (store.categoriaSeleccionada === "Transfer") {
      return [
        {
          pages: [
            {
              heading: "dashboard",
              route: "/dashboard",
              keenthemesIcon: "element-11",
              bootstrapIcon: "bi-app-indicator",
            },
          ],
        },

        /*               Administración            */
        {
          heading: "Adminintración",
          route: "/adminintracion",
          pages: [
            {
              sectionTitle: "nomencladores",
              route: "/nomencladores",
              keenthemesIcon: "element-plus",
              bootstrapIcon: "bi-archive",
              sub: [
                {
                  heading: "origen",
                  route: "/administracion/nomencladores/transfer/origen",
                },
                {
                  heading: "destino",
                  route: "/administracion/nomencladores/transfer/destino",
                },
                {
                  heading: "tipo de viaje",
                  route: "/administracion/nomencladores/transfer/tipodeviaje",
                },  
                {
                  heading: "tipo de trasnporte",
                  route: "/administracion/nomencladores/transfer/tipodetrasnporte",
                },  
                {
                  heading: "tipo de mercado",
                  route: "/administracion/nomencladores/transfer/tipodemercado",
                },  
                {
                  heading: "tipo de pago",
                  route: "/administracion/nomencladores/transfer/tipodepago",
                },              
              ],
            },                               
          ],
        },
        /*               Pages            */
        {
          heading: "Comercializacion",
          route: "/comercializacion",
          pages: [
            {
              sectionTitle: "reservas",
              route: "/reservas",
              keenthemesIcon: "fingerprint-scanning",
              bootstrapIcon: "bi-sticky",
              sub: [
                {
                  heading: "Lista de reservas",
                  route: "/comercializacion/reservas/listreservations",
                },
                {
                  heading: "Crear reservas",
                  route: "/comercializacion/reservas/addreservation",
                },               
              ],
            },
            {
              sectionTitle: "ofertas",
              route: "/ofertas",
              keenthemesIcon: "design",
              bootstrapIcon: "bi-shield-check",
              sub: [
                {
                  heading: "Lista de ofertas",
                  route: "/comercializacion/ofertas/listofertas",
                },
                {
                  heading: "Crear oferta",
                  route: "/comercializacion/ofertas/addofertas",
                },               
              ],
            },  
            {
              heading: "crear ruta",
              route: "crearruta",
              keenthemesIcon: "fingerprint-scanning",
              bootstrapIcon: "bi-sticky",
            },                          
            {
              heading: "calendario",
              route: "calendario",
              keenthemesIcon: "fingerprint-scanning",
              bootstrapIcon: "bi-sticky",
            },                               
            {
              sectionTitle: "Custom",
              route: "/custom",
              keenthemesIcon: "setting-2",
              bootstrapIcon: "bi bi-gear-fill",
              sub: [
                {
                  heading: "Editar Banners",
                  route: "/apps/custom/editar-banner",
                },
              ],
            },
          ],
        },
      ];

    }else if (store.categoriaSeleccionada === "Excursiones") {
      return [
        {
          pages: [
            {
              heading: "dashboard",
              route: "/dashboard",
              keenthemesIcon: "element-11",
              bootstrapIcon: "bi-app-indicator",
            },
          ],
        },

        /*               Administración            */
        {
          heading: "Adminintración",
          route: "/adminintracion",
          pages: [
            {
              sectionTitle: "nomencladores",
              route: "/nomencladores",
              keenthemesIcon: "element-plus",
              bootstrapIcon: "bi-archive",
              sub: [
                {
                  heading: "provincia",
                  route: "/administracion/nomencladores/provincia",
                },
                {
                  heading: "localidad",
                  route: "/administracion/nomencladores/localidad",
                },
                {
                  heading: "categoría",
                  route: "/administracion/nomencladores/categoria",
                },
                {
                  heading: "municipio",
                  route: "/administracion/nomencladores/municipio",
                },
                {
                  heading: "tipo de transporte",
                  route: "/administracion/nomencladores/tipotransporte",
                },
                {
                  heading: "marca",
                  route: "/administracion/nomencladores/marca",
                },
                {
                  heading: "modelo",
                  route: "/administracion/nomencladores/modelo",
                },
              ],
            },
            {
              sectionTitle: "roles",
              route: "/roles",
              keenthemesIcon: "profile-circle",
              bootstrapIcon: "bi-person",
              sub: [
                {
                  heading: "admin",
                  route: "/administracion/roles/admin",
                },
                {
                  heading: "economico",
                  route: "/administracion/roles/economico",
                },
                {
                  heading: "comercio",
                  route: "/administracion/roles/comercio",
                },
                {
                  heading: "root",
                  route: "/administracion/roles/root",
                },
              ],
            },
            {
              heading: "usuarios",
              route: "/administracion/usuarios",
              keenthemesIcon: "fingerprint-scanning",
              bootstrapIcon: "bi-sticky",
            },
            {
              sectionTitle: "reservas",
              route: "/reservas",
              keenthemesIcon: "fingerprint-scanning",
              bootstrapIcon: "bi-sticky",
            },
            {
              sectionTitle: "ofertas",
              route: "/ofertas",
              keenthemesIcon: "design",
              bootstrapIcon: "bi-shield-check",
            },
            {
              sectionTitle: "perfil",
              route: "/profile",
              keenthemesIcon: "design",
              bootstrapIcon: "bi-shield-check",
              sub: [
                {
                  heading: "profileOverview",
                  route: "/crafted/pages/profile/overview",
                },
                {
                  heading: "projects",
                  route: "/crafted/pages/profile/projects",
                },
                {
                  heading: "campaigns",
                  route: "/crafted/pages/profile/campaigns",
                },
                {
                  heading: "documents",
                  route: "/crafted/pages/profile/documents",
                },
                {
                  heading: "connections",
                  route: "/crafted/pages/profile/connections",
                },
                {
                  heading: "activity",
                  route: "/crafted/pages/profile/activity",
                },
              ],
            },
            {
              sectionTitle: "cuenta",
              route: "/account",
              keenthemesIcon: "profile-circle",
              bootstrapIcon: "bi-person",
              sub: [
                {
                  heading: "accountOverview",
                  route: "/crafted/account/overview",
                },
                {
                  heading: "settings",
                  route: "/crafted/account/settings",
                },
              ],
            },
          ],
        },
        /*               Pages            */
        {
          heading: "Páginas",
          route: "/pages",
          pages: [
            {
              heading: "ecomerce",
              route: "/pages/ecomerce",
              keenthemesIcon: "fingerprint-scanning",
              bootstrapIcon: "bi-sticky",
            },
            {
              heading: "files",
              route: "/pages/files",
              keenthemesIcon: "fingerprint-scanning",
              bootstrapIcon: "bi-sticky",
            },
            {
              heading: "correo",
              route: "/pages/correo",
              keenthemesIcon: "fingerprint-scanning",
              bootstrapIcon: "bi-sticky",
            },
            {
              heading: "calendario",
              route: "/pages/calendario",
              keenthemesIcon: "fingerprint-scanning",
              bootstrapIcon: "bi-sticky",
            },
            {
              heading: "contactos",
              route: "/pages/contactos",
              keenthemesIcon: "fingerprint-scanning",
              bootstrapIcon: "bi-sticky",
            },
            {
              heading: "customers",
              route: "/pages/customers",
              keenthemesIcon: "fingerprint-scanning",
              bootstrapIcon: "bi-sticky",
            },
            {
              heading: "facturas",
              route: "/pages/facturas",
              keenthemesIcon: "fingerprint-scanning",
              bootstrapIcon: "bi-sticky",
            },
            {
              sectionTitle: "Custom",
              route: "/custom",
              keenthemesIcon: "setting-2",
              bootstrapIcon: "bi bi-gear-fill",
              sub: [
                {
                  heading: "Editar Banners",
                  route: "/apps/custom/editar-banner",
                },
              ],
            },
          ],
        },
      ];
    }
    return [
      // Retorno por defecto
      {
        pages: [
          {
            heading: "dashboard",
            route: "/dashboard",
            keenthemesIcon: "element-11",
            bootstrapIcon: "bi-app-indicator",
          },
        ],
      },

      /*               Administración            */
      {
        heading: "Adminintración",
        route: "/adminintracion",
        pages: [
          {
            sectionTitle: "nomencladores",
            route: "/nomencladores",
            keenthemesIcon: "element-plus",
            bootstrapIcon: "bi-archive",
            sub: [
              {
                heading: "provincia",
                route: "/administracion/nomencladores/provincia",
              },
              {
                heading: "localidad",
                route: "/administracion/nomencladores/localidad",
              },
              {
                heading: "categoría",
                route: "/administracion/nomencladores/categoria",
              },
              {
                heading: "municipio",
                route: "/administracion/nomencladores/municipio",
              },
              {
                heading: "tipo de transporte",
                route: "/administracion/nomencladores/tipotransporte",
              },
              {
                heading: "marca",
                route: "/administracion/nomencladores/marca",
              },
              {
                heading: "modelo",
                route: "/administracion/nomencladores/modelo",
              },
            ],
          },
          {
            sectionTitle: "roles",
            route: "/roles",
            keenthemesIcon: "profile-circle",
            bootstrapIcon: "bi-person",
            sub: [
              {
                heading: "admin",
                route: "/administracion/roles/admin",
              },
              {
                heading: "economico",
                route: "/administracion/roles/economico",
              },
              {
                heading: "comercio",
                route: "/administracion/roles/comercio",
              },
              {
                heading: "root",
                route: "/administracion/roles/root",
              },
            ],
          },
          {
            heading: "usuarios",
            route: "/administracion/usuarios",
            keenthemesIcon: "fingerprint-scanning",
            bootstrapIcon: "bi-sticky",
          },
          {
            sectionTitle: "perfil",
            route: "/administracion/profile",
            keenthemesIcon: "design",
            bootstrapIcon: "bi-shield-check",
            sub: [
              {
                heading: "profileOverview",
                route: "/administracion/profile/overview",
              },
              {
                heading: "projects",
                route: "/administracion/profile/projects",
              },
              {
                heading: "campaigns",
                route: "/administracion/profile/campaigns",
              },
              {
                heading: "documents",
                route: "/administracion/profile/documents",
              },
              {
                heading: "connections",
                route: "/administracion/profile/connections",
              },
              {
                heading: "activity",
                route: "/administracion/profile/activity",
              },
            ],
          },
          {
            sectionTitle: "cuenta",
            route: "/account",
            keenthemesIcon: "profile-circle",
            bootstrapIcon: "bi-person",
            sub: [
              {
                heading: "accountOverview",
                route: "/crafted/account/overview",
              },
              {
                heading: "settings",
                route: "/crafted/account/settings",
              },
            ],
          },
        ],
      },
      /*               Comercialización            */
      {
        heading: "Comercialización",
        route: "/comercializacion",
        pages: [
          {
            heading: "reservas",
            route: "/comercializacion/reservas",
            keenthemesIcon: "fingerprint-scanning",
            bootstrapIcon: "bi-sticky",
          },
          {
            heading: "contratos",
            route: "/comercializacion/contratos",
            keenthemesIcon: "fingerprint-scanning",
            bootstrapIcon: "bi-sticky",
          },
          {
            heading: "ofertas",
            route: "/comercializacion/ofertas",
            keenthemesIcon: "fingerprint-scanning",
            bootstrapIcon: "bi-sticky",
          },
          {
            heading: "productos",
            route: "/comercializacion/productos",
            keenthemesIcon: "fingerprint-scanning",
            bootstrapIcon: "bi-sticky",
          },
          {
            heading: "calendarApp",
            route: "/comercializacion/calendar",
            keenthemesIcon: "calendar-8",
            bootstrapIcon: "bi-calendar3-event",
          },
        ],
      },
      /*               Pages            */
      {
        heading: "Páginas",
        route: "/pages",
        pages: [
          {
            sectionTitle: "ecomerce",
            route: "/ecomerce",
            keenthemesIcon: "fingerprint-scanning",
            bootstrapIcon: "bi-sticky",
            sub: [
              {
                sectionTitle: "Ventas",
                route: "/ventas",
                sub: [
                  {
                    heading: "Lista de órdenes",
                    route: "/apps/sales/orderlisting",
                  },
                ],
              },
              {
                sectionTitle: "Productos",
                route: "/productos",
                sub: [
                  {
                    heading: "Añadir producto",
                    route: "/apps/productos/addproduct",
                  },
                  {
                    heading: "Lista de productos",
                    route: "/apps/productos/productlisting",
                  },
                ],
              },
            ],
          },
          {
            heading: "files",
            route: "/pages/files",
            keenthemesIcon: "fingerprint-scanning",
            bootstrapIcon: "bi-sticky",
          },
          {
            heading: "correo",
            route: "/pages/correo",
            keenthemesIcon: "fingerprint-scanning",
            bootstrapIcon: "bi-sticky",
          },
          {
            heading: "calendario",
            route: "/pages/calendario",
            keenthemesIcon: "fingerprint-scanning",
            bootstrapIcon: "bi-sticky",
          },
          {
            heading: "contactos",
            route: "/pages/contactos",
            keenthemesIcon: "fingerprint-scanning",
            bootstrapIcon: "bi-sticky",
          },
          {
            heading: "customers",
            route: "/pages/customers",
            keenthemesIcon: "fingerprint-scanning",
            bootstrapIcon: "bi-sticky",
          },
          {
            heading: "facturas",
            route: "/pages/facturas",
            keenthemesIcon: "fingerprint-scanning",
            bootstrapIcon: "bi-sticky",
          },
          {
            sectionTitle: "Custom",
            route: "/custom",
            keenthemesIcon: "setting-2",
            bootstrapIcon: "bi bi-gear-fill",
            sub: [
              {
                heading: "Editar Banners",
                route: "/apps/custom/editar-banner",
              },
            ],
          },
        ],
      },
    ]; // Retorno por defecto
  });

  watch(
    computedMenuItems,
    (newValue) => {
      menuItems.value = newValue;
      console.log("El arreglo de menú ha cambiado:", newValue);
    },
    { immediate: true },
  );

  return {
    menuItems,
  };
}
