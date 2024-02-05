import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetButtonComponent } from './widget-button.component';

describe('WidgetButtonComponent', () => {
  let component: WidgetButtonComponent;
  let fixture: ComponentFixture<WidgetButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WidgetButtonComponent]
    });
    fixture = TestBed.createComponent(WidgetButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
