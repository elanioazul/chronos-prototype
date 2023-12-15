import Sidebar from '@core/js/ol5-sidebar.js';

export class CustomSidebar {
    constructor(
      public sidebarDiv: HTMLDivElement | undefined,
      public sidebarInstance: Sidebar
    ) {}
   }