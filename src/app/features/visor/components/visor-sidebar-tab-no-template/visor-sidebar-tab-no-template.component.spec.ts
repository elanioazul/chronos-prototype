import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisorSidebarTabNoTemplateComponent } from './visor-sidebar-tab-no-template.component';

describe('VisorSidebarTabNoTemplateComponent', () => {
  let component: VisorSidebarTabNoTemplateComponent;
  let fixture: ComponentFixture<VisorSidebarTabNoTemplateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VisorSidebarTabNoTemplateComponent]
    });
    fixture = TestBed.createComponent(VisorSidebarTabNoTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
