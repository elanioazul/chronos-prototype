import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, FormBuilder }  from '@angular/forms';
import { AccordionTabForm } from '@features/visor/core/interfaces/sidebar/accordion-filter-tab';

@Component({
  selector: 'app-checkbox-accordion',
  templateUrl: './checkbox-accordion.component.html',
  styleUrls: ['./checkbox-accordion.component.scss']
})
export class CheckboxAccordionComponent implements OnInit {
  @Input() accordionTabs!: AccordionTabForm[];
  @Input() accordionTitle: string = 'accordion title';
  @Output() accodionControlChange = new EventEmitter<FormGroup>();

  form!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
    this.form.valueChanges.subscribe(value => {
      this.accodionControlChange.emit(value);
    });
    this.form.get('accordionState')!.valueChanges.subscribe((checked: boolean) => {
      if (checked) {
        this.accordionTabs.forEach(tab => {
          this.form.get(tab.formControlName)!.setValue(true, { emitEvent: false });
        });
      } else {
        this.accordionTabs.forEach(tab => {
          this.form.get(tab.formControlName)!.setValue(false, { emitEvent: false });
        });
      }
    });
  }

  initForm(): void {
    const formGroupConfig = {
      accordionState: [false]
    };
    this.accordionTabs.forEach(tab => {
      formGroupConfig[tab.formControlName] = [false];
    });
    this.form = this.formBuilder.group(formGroupConfig);
  }

}
