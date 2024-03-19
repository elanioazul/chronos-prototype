import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckboxAccordionComponent } from './checkbox-accordion.component';

describe('CheckboxAccordionComponent', () => {
  let component: CheckboxAccordionComponent;
  let fixture: ComponentFixture<CheckboxAccordionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CheckboxAccordionComponent]
    });
    fixture = TestBed.createComponent(CheckboxAccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
