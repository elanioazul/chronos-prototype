import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisorFiltersAccordionReactiveFormComponent } from './visor-filters-accordion-reactive-form.component';

describe('VisorFiltersCustomComponent', () => {
  let component: VisorFiltersAccordionReactiveFormComponent;
  let fixture: ComponentFixture<VisorFiltersAccordionReactiveFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VisorFiltersAccordionReactiveFormComponent],
    });
    fixture = TestBed.createComponent(VisorFiltersAccordionReactiveFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
