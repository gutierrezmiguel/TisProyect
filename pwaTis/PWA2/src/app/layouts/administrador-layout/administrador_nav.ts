import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Ovas',
    icon: 'icon-briefcase',
    children: [
      {
        name: 'Descargar Ovas',
        url: 'ovas/descargar',
        icon: 'icon-list'
      },
      {
        name: 'Colecciones de Ovas',
        url: 'ovas/colecciones',
        icon: 'icon-user-follow'
      },
    ]
  }
];
