import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DragZoomComponent } from './drag-zoom.component';

describe('DragZoomComponent', () => {
  let component: DragZoomComponent;
  let fixture: ComponentFixture<DragZoomComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DragZoomComponent]
    });
    fixture = TestBed.createComponent(DragZoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
