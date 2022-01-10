import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Cliente',
    url: 'home',
    icon: 'icon-speedometer',
  },
  {
    name: 'Trabajadores',
    url: '/trabajadores',
    icon: 'icon-puzzle',
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
    url: '/clientes',
    icon: 'icon-puzzle',
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
];
