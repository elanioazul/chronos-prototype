import { Component  } from '@angular/core';
import { FormGroup, FormControl }  from '@angular/forms';
@Component({
  selector: 'app-visor-filters-accordion-reactive-form',
  templateUrl: './visor-filters-accordion-reactive-form.component.html',
  styleUrls: ['./visor-filters-accordion-reactive-form.component.scss']
})
export class VisorFiltersAccordionReactiveFormComponent {

  constructor() {}

  onAccordionControlChange(val: any) {
    console.log('Accordion control changed:', val);
  }


}
