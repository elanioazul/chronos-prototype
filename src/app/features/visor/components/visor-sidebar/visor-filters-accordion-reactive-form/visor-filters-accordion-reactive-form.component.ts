import { Component, OnInit, computed, inject  } from '@angular/core';
import { FormGroup, FormControl }  from '@angular/forms';
import { MapService } from '@features/visor/core/services/map.service';
import VectorSource from 'ol/source/Vector';
import { FeaturesVisibilityService } from '@features/visor/core/services/features-visibility.service';
import { AccordionTabForm } from '@features/visor/core/interfaces/sidebar/accordion-filter-tab';
import {AccordionOutput} from '@features/visor/core/types/accordion-output.type';

@Component({
  selector: 'app-visor-filters-accordion-reactive-form',
  templateUrl: './visor-filters-accordion-reactive-form.component.html',
  styleUrls: ['./visor-filters-accordion-reactive-form.component.scss']
})
export class VisorFiltersAccordionReactiveFormComponent implements OnInit {
  mapService = inject(MapService);
  featVisibilityService = inject(FeaturesVisibilityService);

  //aqui todas las capas del state que queramos gestionar en la leyenda-toc
  recursosLyr = computed(() => this.mapService.recursosLyr());

  //aqui todas las tabs de todos los accordions de la leyenda-toc
  recursosTabs: Array<AccordionTabForm> = [];


  constructor() { }

  ngOnInit(): void {
    if (this.recursosLyr()[0].ol.getSource()?.getState() === 'ready' && this.recursosLyr()[0].ol.getSource() instanceof VectorSource) {
      const recursosSource = this.recursosLyr()[0].ol.getSource();
      if (recursosSource && recursosSource instanceof VectorSource) {
        this.featVisibilityService.manageResourcesFeatures(recursosSource);
         this.featVisibilityService.recursosFeatureTabsNames.forEach(item => {
          const accordionTab: AccordionTabForm = {
            formControlName: item 
          };
          this.recursosTabs.push(accordionTab)
         })
      }
    }
  }


  onAccordionControlChange(val: AccordionOutput) {
    //console.log('Accordion control changed:', val);
    const allTrue = (obj: AccordionOutput) => Object.values(obj).every(value => value === true);
    const allFalse = (obj: AccordionOutput) => Object.values(obj).every(value => value === false);
    const falseKeys = (obj: AccordionOutput) =>  Object.keys(obj).filter(key => !obj[key]);
    const trueKeys = (obj: AccordionOutput) =>  Object.keys(obj).filter(key => obj[key]);
    //casos
    //1 val.accordionState == true y resto de tabs = true => toggle all features visibility
    if (allTrue(val)) {
      this.recursosLyr()[0].ol.setVisible(true);
      this.featVisibilityService.toggleResourcesFeaturesVisibility(val.accordionState);
      
    }
    //2 val.accordionState == false y resto de tabs = false => toggle all features visibility
    if (allFalse(val)) {
      this.recursosLyr()[0].ol.setVisible(false);
      this.featVisibilityService.toggleResourcesFeaturesVisibility(val.accordionState)
      
    }
    //3 val.accordionState == true y alguna tab = false => toggle ese tipo de features visibility y minus symbol en accordionState
    if (val.accordionState == true && !allTrue(val)) {
      falseKeys(val).forEach((tab: string) => this.featVisibilityService.recursosFeatureTabsVisibility.set(tab, false));
      falseKeys(val).forEach((tab: string) => this.featVisibilityService.updateFeatureVisibility(tab))
      trueKeys(val).forEach((tab: string) => this.featVisibilityService.recursosFeatureTabsVisibility.set(tab, true));
      trueKeys(val).forEach((tab: string) => this.featVisibilityService.updateFeatureVisibility(tab));
      if (this.recursosLyr()[0].ol.isVisible() == false) {
        this.recursosLyr()[0].ol.setVisible(true);
      }
    }
    //4 val.accordionState == false y alguna tab = true => toggle ese tipo de features visibility y minus symbol en accordionState
    if (val.accordionState == false && !allFalse(val)) {
      trueKeys(val).forEach((tab: string) => this.featVisibilityService.recursosFeatureTabsVisibility.set(tab, true));
      trueKeys(val).forEach((tab: string) => this.featVisibilityService.updateFeatureVisibility(tab));
      falseKeys(val).forEach((tab: string) => this.featVisibilityService.recursosFeatureTabsVisibility.set(tab, false));
      falseKeys(val).forEach((tab: string) => this.featVisibilityService.updateFeatureVisibility(tab))
      if (this.recursosLyr()[0].ol.isVisible() == false) {
        this.recursosLyr()[0].ol.setVisible(true);
      }
    }
  }


}
