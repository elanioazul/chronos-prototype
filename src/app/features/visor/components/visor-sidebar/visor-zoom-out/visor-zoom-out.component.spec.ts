import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisorZoomOutComponent } from './visor-zoom-out.component';

describe('VisorZoomOutComponent', () => {
  let component: VisorZoomOutComponent;
  let fixture: ComponentFixture<VisorZoomOutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VisorZoomOutComponent]
    });
    fixture = TestBed.createComponent(VisorZoomOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
