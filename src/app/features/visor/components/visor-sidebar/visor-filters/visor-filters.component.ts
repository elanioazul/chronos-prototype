import { Component, computed, inject } from '@angular/core';
import { MapService } from '@features/visor/core/services/map.service';

@Component({
  selector: 'app-visor-filters',
  templateUrl: './visor-filters.component.html',
  styleUrls: ['./visor-filters.component.scss']
})
export class VisorFiltersComponent {

  mapService = inject(MapService);

  recursosLyr = computed(() => this.mapService.recursosLyr());

  constructor() {
    console.log('recursos en filtrosssss')
    console.log(this.recursosLyr())
  }

}
