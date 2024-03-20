import { Injectable, computed, inject, signal } from '@angular/core';
import { MapService } from '@features/visor/core/services/map.service';
import VectorSource from 'ol/source/Vector';
import { Feature } from 'ol';
import { Geometry } from 'ol/geom';
import {
  resourceStyle,
  resourceInvisibleStyle,
} from '../../core/utils/ol-styles';
import { AccordionTabForm } from '@features/visor/core/interfaces/sidebar/accordion-filter-tab';
interface Tabvisibility {
  name: string,
  isVisible: boolean
}
@Injectable({
  providedIn: 'root'
})
export class FeaturesVisibilityService {
  mapService = inject(MapService);

  recursosLyr = computed(() => this.mapService.recursosLyr());
  recursosSource!: VectorSource;
  recursosFeatures!: Feature<Geometry>[];

  recursosTabs: Array<AccordionTabForm> = [];
  recursosFeaturesAccordionName!: string;
  recursosFeatureTabsNames: Set<string> = new Set<string>();

  //state
  recursosFeatureTabsVisibility: Map<string, boolean> = new Map();

  constructor() {
    if (this.recursosLyr()[0].ol.getSource()?.getState() === 'ready' && this.recursosLyr()[0].ol.getSource() instanceof VectorSource) {
      const recursosSource = this.recursosLyr()[0].ol.getSource();
      if (recursosSource && recursosSource instanceof VectorSource) {
        this.manageResourcesFeatures(recursosSource);
        this.recursosFeatureTabsNames.forEach(item => {
          const accordionTab: AccordionTabForm = {
            formControlName: item 
          };
          this.recursosTabs.push(accordionTab)
         })
      }
    }
  }

  manageResourcesFeatures(source: VectorSource): void {
    this.recursosSource = source;
    this.recursosFeatures = source.getFeatures();
    this.recursosFeatures.forEach((feature) => {
      const tipoRecurso: string = feature.get('TIPORECURSO');
      this.recursosFeaturesAccordionName = 'TIPORECURSO';
      this.recursosFeatureTabsNames.add(tipoRecurso);
      this.recursosFeatureTabsVisibility.set(tipoRecurso, true)
    });
  }

  toggleResourcesFeaturesVisibility(val: boolean): void {
    this.recursosFeatures.forEach((feature) => {
      const tipoRecurso = feature.get('TIPORECURSO');
      this.recursosFeatureTabsVisibility.set(tipoRecurso, val);
      const isVisible = this.recursosFeatureTabsVisibility.get(tipoRecurso);
      feature.setStyle(isVisible ? resourceStyle : resourceInvisibleStyle);
    });
  }

  updateFeatureVisibility(tipo: string): void {
    this.recursosFeatures.forEach((feat) => {
      const tipoRecurso = feat.get('TIPORECURSO');
      const isVisible = this.recursosFeatureTabsVisibility.get(tipoRecurso);
      if (tipo === tipoRecurso) {
        feat.setStyle(isVisible ? resourceStyle : resourceInvisibleStyle);
      }
    });
  }
}
