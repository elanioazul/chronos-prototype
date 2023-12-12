import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisorSidebarComponent } from './visor-sidebar.component';

describe('VisorSidebarComponent', () => {
  let component: VisorSidebarComponent;
  let fixture: ComponentFixture<VisorSidebarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VisorSidebarComponent]
    });
    fixture = TestBed.createComponent(VisorSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
