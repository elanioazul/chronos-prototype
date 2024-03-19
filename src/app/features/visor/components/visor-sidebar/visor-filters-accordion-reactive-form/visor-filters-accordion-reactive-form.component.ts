import { Component, computed, inject  } from '@angular/core';
import { FormGroup, FormControl }  from '@angular/forms';
import { MapService } from '@features/visor/core/services/map.service';
import VectorSource from 'ol/source/Vector';
import { FeaturesVisibilityService } from '@features/visor/core/services/features-visibility.service';
import { AccordionTabForm } from '@features/visor/core/interfaces/sidebar/accordion-filter-tab';
@Component({
  selector: 'app-visor-filters-accordion-reactive-form',
  templateUrl: './visor-filters-accordion-reactive-form.component.html',
  styleUrls: ['./visor-filters-accordion-reactive-form.component.scss']
})
export class VisorFiltersAccordionReactiveFormComponent {
  mapService = inject(MapService);
  featuresVisibilityService = inject(FeaturesVisibilityService);

  //aqui todas las capas del state que queramos gestionar en la leyenda-toc
  recursosLyr = computed(() => this.mapService.recursosLyr());

  //aqui todas las tabs de todos los accordions de la leyenda-toc
  recursosTabs: Array<AccordionTabForm> = [];


  constructor() {
    if (this.recursosLyr()[0].ol.getSource()?.getState() === 'ready' && this.recursosLyr()[0].ol.getSource() instanceof VectorSource) {
      const recursosSource = this.recursosLyr()[0].ol.getSource();
      if (recursosSource && recursosSource instanceof VectorSource) {
        this.featuresVisibilityService.manageResourcesFeatures(recursosSource);
         this.featuresVisibilityService.recursosFeatureTabsNames.forEach(item => {
          const accordionTab: AccordionTabForm = {
            formControlName: item 
          };
          this.recursosTabs.push(accordionTab)
         })
      }

    }
  }


  onAccordionControlChange(val: any) {
    console.log('Accordion control changed:', val);
  }


}
