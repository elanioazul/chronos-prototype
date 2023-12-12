import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisorZoomInComponent } from './visor-zoom-in.component';

describe('VisorZoomInComponent', () => {
  let component: VisorZoomInComponent;
  let fixture: ComponentFixture<VisorZoomInComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VisorZoomInComponent]
    });
    fixture = TestBed.createComponent(VisorZoomInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
