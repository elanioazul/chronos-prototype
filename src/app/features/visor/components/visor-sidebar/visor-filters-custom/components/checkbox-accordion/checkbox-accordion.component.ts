import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';
interface AccordionTab {
  header: string;
  //content: string;
  formControl: FormControl;
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
      formControl: new FormControl(false)
    },
    {
      header: 'Tab 2',
      formControl: new FormControl(true)
    },
    {
      header: 'Tab 3',
      formControl: new FormControl(false)
    }
  ];
  @Input() tabs: AccordionTab[] = this.tabsMocked;
  @Output() checkboxChange = new EventEmitter<boolean>();

  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      parentNodeState: false
    });
  }
  ngOnInit(): void {
    this.form.valueChanges.subscribe(value => console.log(value));
  }

  onCheckboxChange(checked: boolean) {
    this.checkboxChange.emit(checked);
    this.tabs.forEach(tab => {
      tab.formControl.setValue(checked);
    });
  }
  onCheckboxChildChange(checked: boolean) {
    console.log('child checkbox clicked');
    
  }

}
