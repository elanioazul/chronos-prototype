import { Component, inject  } from '@angular/core';
import { FeaturesVisibilityService } from '@features/visor/core/services/features-visibility.service';
import {AccordionOutput} from '@features/visor/core/types/accordion-output.type';

@Component({
  selector: 'app-visor-filters-accordion-reactive-form',
  templateUrl: './visor-filters-accordion-reactive-form.component.html',
  styleUrls: ['./visor-filters-accordion-reactive-form.component.scss']
})
export class VisorFiltersAccordionReactiveFormComponent {
  featVisibilityService = inject(FeaturesVisibilityService);

  onAccordionControlChange(val: AccordionOutput) {
    //console.log('Accordion control changed:', val);
    const allTrue = (obj: AccordionOutput) => Object.values(obj).every(value => value === true);
    const allFalse = (obj: AccordionOutput) => Object.values(obj).every(value => value === false);
    const falseKeys = (obj: AccordionOutput) =>  Object.keys(obj).filter(key => !obj[key]);
    const trueKeys = (obj: AccordionOutput) =>  Object.keys(obj).filter(key => obj[key]);
    //casos
    //1 val.accordionState == true y resto de tabs = true => toggle all features visibility
    if (allTrue(val)) {
      this.featVisibilityService.recursosLyr()[0].ol.setVisible(true);
      this.featVisibilityService.toggleResourcesFeaturesVisibility(val.accordionState);
      
    }
    //2 val.accordionState == false y resto de tabs = false => toggle all features visibility
    if (allFalse(val)) {
      this.featVisibilityService.recursosLyr()[0].ol.setVisible(false);
      this.featVisibilityService.toggleResourcesFeaturesVisibility(val.accordionState)
      
    }
    //3 val.accordionState == true y alguna tab = false => toggle ese tipo de features visibility y minus symbol en accordionState
    if (val.accordionState == true && !allTrue(val)) {
      falseKeys(val).forEach((tab: string) => this.featVisibilityService.recursosFeatureTabsVisibility.set(tab, false));
      falseKeys(val).forEach((tab: string) => this.featVisibilityService.updateFeatureVisibility(tab))
      trueKeys(val).forEach((tab: string) => this.featVisibilityService.recursosFeatureTabsVisibility.set(tab, true));
      trueKeys(val).forEach((tab: string) => this.featVisibilityService.updateFeatureVisibility(tab));
      if (this.featVisibilityService.recursosLyr()[0].ol.isVisible() == false) {
        this.featVisibilityService.recursosLyr()[0].ol.setVisible(true);
      }
    }
    //4 val.accordionState == false y alguna tab = true => toggle ese tipo de features visibility y minus symbol en accordionState
    if (val.accordionState == false && !allFalse(val)) {
      trueKeys(val).forEach((tab: string) => this.featVisibilityService.recursosFeatureTabsVisibility.set(tab, true));
      trueKeys(val).forEach((tab: string) => this.featVisibilityService.updateFeatureVisibility(tab));
      falseKeys(val).forEach((tab: string) => this.featVisibilityService.recursosFeatureTabsVisibility.set(tab, false));
      falseKeys(val).forEach((tab: string) => this.featVisibilityService.updateFeatureVisibility(tab))
      if (this.featVisibilityService.recursosLyr()[0].ol.isVisible() == false) {
        this.featVisibilityService.recursosLyr()[0].ol.setVisible(true);
      }
    }
  }


}
