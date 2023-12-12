import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisorSidebarTabComponent } from './visor-sidebar-tab.component';

describe('VisorSidebarTabComponent', () => {
  let component: VisorSidebarTabComponent;
  let fixture: ComponentFixture<VisorSidebarTabComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VisorSidebarTabComponent]
    });
    fixture = TestBed.createComponent(VisorSidebarTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
