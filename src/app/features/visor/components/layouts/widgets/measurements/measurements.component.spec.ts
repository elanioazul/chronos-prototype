import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeasurementsComponent } from './measurements.component';

describe('MeasurementsComponent', () => {
  let component: MeasurementsComponent;
  let fixture: ComponentFixture<MeasurementsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MeasurementsComponent]
    });
    fixture = TestBed.createComponent(MeasurementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
