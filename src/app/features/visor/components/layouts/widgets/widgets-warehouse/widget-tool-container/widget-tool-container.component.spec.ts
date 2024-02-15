import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetToolContainerComponent } from './widget-tool-container.component';

describe('WidgetToolContainerComponent', () => {
  let component: WidgetToolContainerComponent;
  let fixture: ComponentFixture<WidgetToolContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WidgetToolContainerComponent]
    });
    fixture = TestBed.createComponent(WidgetToolContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
