import { INavData } from '@coreui/angular';

export const navItemsOperario: INavData[] = [
  {
    name: 'Operario',
    url: 'home',
    icon: 'icon-briefcase',
  },
  {
    name: 'Obras',
    icon: 'icon-flag',
    children: [
      {
        name: 'Registrar Evidencia',
        url: 'registrarEvidencia',
        icon: 'icon-docs'
      }
    ]
  },
];

export const navItemsJefeObra: INavData[] = [
  {
    name: 'Jefe de Obra',
    url: 'home',
    icon: 'icon-organization',
  },
  {
    name: 'Supervisar Obras',
    icon: 'icon-eye',
    children: [
      {
        name: 'Listar Evidencias',
        url: 'listarEvidencias',
        icon: 'icon-list'
      },{
        name: 'Asignar Trabajadores',
        url: 'listarTrabajadores',
        icon: 'icon-user-follow'
      },
      {
        name: 'Solicitar material de obra',
        url: 'solicitarMaterial',
        icon: 'icon-notebook'
      },
    ]
  },
];

export const navItemsJefeAlmacen: INavData[] = [
  {
    name: 'Jefe de almacen',
    url: 'home',
    icon: 'icon-organization',
  },
  {
    name: 'Obras',
    icon: 'icon-flag',
    children: [
      {
        name: 'Autorización de solicitudes de materiales',
        url: 'listarSolicitudesMateriales',
        icon: 'icon-like'
      },
      {
        name: 'Ver inventario',
        url: 'listarMateriales',
        icon: 'icon-grid'
      },
    ]
  },
];


