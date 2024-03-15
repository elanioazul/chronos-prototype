import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';
interface AccordionTab {
  header: string;
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
      header: 'Tab 1',
      formControlName: 'tab1'
    },
    {
      header: 'Tab 2',
      formControlName: 'tab2'
    },
    {
      header: 'Tab 3',
      formControlName: 'tab3'
    }
  ];
  @Input() tabs: AccordionTab[] = this.tabsMocked;
  @Output() accodionControlChange = new EventEmitter<FormGroup>();

  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    const formGroupConfig = {
      parentNodeState: [false]
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
    this.form.get('parentNodeState')!.valueChanges.subscribe((checked: boolean) => {
      if (checked) {
        this.tabsMocked.forEach(tab => {
          this.form.get(tab.formControlName)!.setValue(true);
        });
      } else {
        this.tabsMocked.forEach(tab => {
          this.form.get(tab.formControlName)!.setValue(false);
        });
      }
    });
  }

}
