import { Component  } from '@angular/core';
import { FormGroup, FormControl }  from '@angular/forms';
@Component({
  selector: 'app-visor-filters-custom',
  templateUrl: './visor-filters-custom.component.html',
  styleUrls: ['./visor-filters-custom.component.scss']
})
export class VisorFiltersCustomComponent {

  constructor() {}

  onAccordionControlChange(val: any) {
    console.log('Accordion control changed:', val);
  }


}
