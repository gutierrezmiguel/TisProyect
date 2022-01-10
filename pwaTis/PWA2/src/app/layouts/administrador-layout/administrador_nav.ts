import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Administrador',
    url: 'home',
    icon: 'icon-settings',
  },
  {
    name: 'Trabajadores',
    icon: 'icon-briefcase',
    children: [
      {
        name: 'Listar Trabajadores',
        url: 'listarTrabajadores',
        icon: 'icon-list'
      },
      {
        name: 'Registrar Trabajador',
        url: 'registrarTrabajador',
        icon: 'icon-user-follow'
      },
    ]
  },
  {
    name: 'Clientes',
    icon: 'icon-people',
    children: [
      {
        name: 'Listar Clientes',
        url: 'listarClientes',
        icon: 'icon-list'
      },
      {
        name: 'Registrar Cliente',
        url: 'registrarCliente',
        icon: 'icon-user-follow'
      },
    ]
  },
  {
    name: 'Obras',
    icon: 'icon-flag',
    children: [
      {
        name: 'Listar Obras',
        url: 'listarObras',
        icon: 'icon-list'
      },
      {
        name: 'Registrar Obra',
        url: 'registrarObra',
        icon: 'icon-user-follow'
      },
    ]
  },
];
