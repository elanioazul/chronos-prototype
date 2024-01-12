import { Component, OnInit, computed, inject } from '@angular/core';
import { SidebarService } from '../core/services/sidebar.service';
import { MapService } from '../core/services/map.service';
import { VisorService } from '../core/services/visor.service';
import { VisorToMapMapperService } from '../core/services/visor-to-map-mapper.service';

@Component({
  selector: 'app-visor',
  templateUrl: './visor.component.html',
  styleUrls: ['./visor.component.scss'],
})
export class VisorComponent implements OnInit {
  // sidebar = inject(SidebarService);
  mapService = inject(MapService);
  visorService = inject(VisorService);
  visorToMapMapperService = inject(VisorToMapMapperService)

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
    console.log(this.mapService.services());
    console.log(this.mapService.map());
    
  }
  
  ngOnInit(): void {}
}
