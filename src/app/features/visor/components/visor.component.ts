import { AfterViewInit, Component, ElementRef, OnInit, computed, inject } from '@angular/core';
import { SidebarService } from '../core/services/sidebar.service';
import { MapService } from '../core/services/map.service';
import { VisorService } from '../core/services/visor.service';
import { VisorToMapMapperService } from '../core/services/visor-to-map-mapper.service';
import Sidebar from '@core/js/ol5-sidebar.js';
import { visorTabsConfig } from '../core/consts/visor-tab-config';
import { ISidebarTab } from '../core/interfaces/sidebar/sidebar-tab.interfaz';

@Component({
  selector: 'app-visor',
  templateUrl: './visor.component.html',
  styleUrls: ['./visor.component.scss'],
})
export class VisorComponent implements OnInit, AfterViewInit {
  sidebarService = inject(SidebarService);
  mapService = inject(MapService);
  visorService = inject(VisorService);
  visorToMapMapperService = inject(VisorToMapMapperService);

  sidebar: Sidebar | null = null;
  sidebarDiv!: ElementRef<HTMLElement> | undefined;

  visorTabsConfig = visorTabsConfig;

  config = computed(() =>
    this.visorService.config()
  )
  map = computed(() =>
    this.mapService.map()
  )

  constructor(
  ) {
    this.mapService.createMap$.next(this.visorToMapMapperService.transform(this.config()!))
    this.mapService.populateMap(this.config()!);
    this.mapService.applyConfigData(this.config()!);
    // console.log(this.mapService.services());
    // console.log(this.mapService.map());
    
  }
  
  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.sidebarDiv = this.sidebarService.sidebarDiv();
    this.setSideBar();
  }

  refreshSidebar(): void {
    this.sidebar = new Sidebar({
      element: this.sidebarDiv,
      nonOpenableTabs: this.visorTabsConfig.filter((tab: ISidebarTab) => !tab.openableSidebarNeeded),
      largerTabs: this.visorTabsConfig.filter((tab: ISidebarTab) => tab.largeSidebarNeeded),
    });
    this.sidebarService.updateSidebarInstance$.next(this.sidebar)
    this.sidebar.setMap(this.map()!);
    this.map()!.addControl(this.sidebar);
  }

  setSideBar(): void {
    this.refreshSidebar();
  }
}
