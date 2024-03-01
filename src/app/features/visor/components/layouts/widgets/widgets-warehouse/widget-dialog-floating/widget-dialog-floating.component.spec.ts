import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetDialogFloatingComponent } from './widget-dialog-floating.component';

describe('WidgetDialogFloatingComponent', () => {
  let component: WidgetDialogFloatingComponent;
  let fixture: ComponentFixture<WidgetDialogFloatingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WidgetDialogFloatingComponent]
    });
    fixture = TestBed.createComponent(WidgetDialogFloatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
