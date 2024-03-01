import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetDialogFixedComponent } from './widget-dialog-fixed.component';

describe('WidgetDialogFixedComponent', () => {
  let component: WidgetDialogFixedComponent;
  let fixture: ComponentFixture<WidgetDialogFixedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WidgetDialogFixedComponent]
    });
    fixture = TestBed.createComponent(WidgetDialogFixedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
