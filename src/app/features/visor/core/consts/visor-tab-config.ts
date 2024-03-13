
import { ISidebarTab } from '@core/interfaces/sidebar/sidebar-tab.interfaz';
export const visorTabsConfig: ISidebarTab[] = [
  {
    id: 'filters',
    title: 'Filtros de capas funcionales',
    widget: () => import('@features/visor/components/visor-sidebar/visor-filters/visor-filters.component').then(m => m.VisorFiltersComponent),
    openableSidebarNeeded: true,
    largeSidebarNeeded: false,
    icon: 'fg-layer-alt-edit fg-4x',
    iconStyle: 'font-size: 1.5rem; line-height: 1;'
  },
  {
    id: 'layers',
    title: 'Commutador de capes',
    widget: () => import('@features/visor/components/visor-sidebar/visor-simple-toc/visor-simple-toc.component').then(m => m.VisorSimpleTocComponent),
    openableSidebarNeeded: true,
    largeSidebarNeeded: false,
    icon: 'fg-layers-o fg-4x',
    iconStyle: 'font-size: 1.5rem; line-height: 1;'
  },
  {
    id: 'searchbycoord',
    title: 'Search by coordinates',
    widget: () => import('@features/visor/components/visor-sidebar/visor-search-by-coord/visor-search-by-coord.component').then(m => m.VisorSearchByCoordComponent),
    openableSidebarNeeded: true,
    largeSidebarNeeded: true,
    icon: 'fg-search-map fg-4x',
    iconStyle: 'font-size: 1.5rem; line-height: 1;'
  },
  {
    id: 'routes',
    title: 'Recursos',
    widget: () => import('@features/visor/components/visor-sidebar/visor-navigator/visor-navigator.component').then(m => m.VisorNavigatorComponent),
    openableSidebarNeeded: true,
    largeSidebarNeeded: true,
    icon: 'fg-car fg-4x',
    iconStyle: 'font-size: 1.5rem; line-height: 1;'
  },
  {
    id: 'routebyclicks',
    title: 'Navegació by clicks',
    widget: () => import('@features/visor/components/visor-sidebar/visor-navigator-by-clicks/visor-navigator-by-clicks.component').then(m => m.VisorNavigatorByClicksComponent),
    toasterMessage: 'Consulta la ruta con dos clicks en el mapa',
    openableSidebarNeeded: false,
    largeSidebarNeeded: false,
    icon: 'fg-route fg-4x',
    iconStyle: 'font-size: 1.5rem; line-height: 1;'
  },
  {
    id: 'info',
    title: 'Detalls del punt',
    widget: () => import('@features/visor/components/visor-sidebar/visor-info/visor-info.component').then(m => m.VisorInfoComponent),
    openableSidebarNeeded: true,
    largeSidebarNeeded: false,
    icon: 'pi pi-info-circle',
    iconStyle: 'font-size: 1.5rem'
  }
];
