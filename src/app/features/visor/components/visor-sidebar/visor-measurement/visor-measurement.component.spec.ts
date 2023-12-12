import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisorMeasurementComponent } from './visor-measurement.component';

describe('VisorMeasurementComponent', () => {
  let component: VisorMeasurementComponent;
  let fixture: ComponentFixture<VisorMeasurementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VisorMeasurementComponent]
    });
    fixture = TestBed.createComponent(VisorMeasurementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
