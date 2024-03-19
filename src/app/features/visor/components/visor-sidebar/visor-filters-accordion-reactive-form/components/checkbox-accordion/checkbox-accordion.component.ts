import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, FormBuilder }  from '@angular/forms';
interface AccordionTab {
  title: string;
  formControlName: string
}

@Component({
  selector: 'app-checkbox-accordion',
  templateUrl: './checkbox-accordion.component.html',
  styleUrls: ['./checkbox-accordion.component.scss']
})
export class CheckboxAccordionComponent implements OnInit {

  tabsMocked: AccordionTab[] = [
    {
      title: 'Tab 1 title',
      formControlName: 'tab1State'
    },
    {
      title: 'Tab 2 title',
      formControlName: 'tab2State'
    },
    {
      title: 'Tab 3 title',
      formControlName: 'tab3State'
    }
  ];
  @Input() accordionTabs: AccordionTab[] = this.tabsMocked;
  @Input() accordionTitle: string = 'accordion title';
  @Output() accodionControlChange = new EventEmitter<FormGroup>();

  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    const formGroupConfig = {
      accordionState: [false]
    };
    this.tabsMocked.forEach(tab => {
      formGroupConfig[tab.formControlName] = [false];
    });
    this.form = this.formBuilder.group(formGroupConfig);
  }

  ngOnInit(): void {
    this.form.valueChanges.subscribe(value => {
      this.accodionControlChange.emit(value);
      console.log(value);
    });
    this.form.get('accordionState')!.valueChanges.subscribe((checked: boolean) => {
      if (checked) {
        this.tabsMocked.forEach(tab => {
          this.form.get(tab.formControlName)!.setValue(true, { emitEvent: false });
        });
      } else {
        this.tabsMocked.forEach(tab => {
          this.form.get(tab.formControlName)!.setValue(false, { emitEvent: false });
        });
      }
    });
  }

}
