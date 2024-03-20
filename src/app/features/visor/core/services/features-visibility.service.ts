import { Injectable, computed, inject, signal } from '@angular/core';
import { MapService } from '@features/visor/core/services/map.service';
import VectorSource from 'ol/source/Vector';
import { Feature } from 'ol';
import { Geometry } from 'ol/geom';

interface Tabvisibility {
  name: string,
  isVisible: boolean
}
@Injectable({
  providedIn: 'root'
})
export class FeaturesVisibilityService {
  /*
  este servicio va a coger todas las sources de las capas vectoriales en la leyenda-toc 
  y va a hacer 
  - una signal con el Set de valores unicos y
  - un Map con la visibilidad en la toc por cada valor único
  lo va a hacer tras recibir la source por cada capa vectorial que vaya a la leyenda-toc
  */


  recursosSource!: VectorSource;
  recursosFeatures!: Feature<Geometry>[];
  recursosFeaturesAccordionName!: string;

  recursosFeatureTabsNames: Set<string> = new Set<string>();
  //recursosFeatureTabsNamesSignal = signal<string[]>([]);

  //state
  recursosFeatureTabsVisibility: Map<string, boolean> = new Map();
  //recursosFeatureTabsVisibilitySignal = signal<Tabvisibility[]>([]);
  //recursosFeatureTabsVisibility: Array<Tabvisibility> = [];

  constructor() { }

  manageResourcesFeatures(source: VectorSource): void {
    this.recursosSource = source;
    this.recursosFeatures = source.getFeatures();
    this.recursosFeatures.forEach((feature) => {
      const tipoRecurso: string = feature.get('TIPORECURSO');
      this.recursosFeaturesAccordionName = 'TIPORECURSO';
      this.recursosFeatureTabsNames.add(tipoRecurso);
      // const visibilityObj: Tabvisibility = {
      //   name: tipoRecurso,
      //   isVisible: false
      // };
      // this.changeVisibilityToTab(visibilityObj);
      this.recursosFeatureTabsVisibility.set(tipoRecurso, true)
    });
    console.log(this.recursosFeatureTabsVisibility);
    
  }

  // changeVisibilityToTab(tab: Tabvisibility): void {
  //   this.recursosFeatureTabsVisibilitySignal.update(tabs => [...tabs, tab])
  // }
}
