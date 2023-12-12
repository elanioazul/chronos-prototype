import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisorNotificationsBarComponent } from './visor-notifications-bar.component';

describe('VisorNotificationsBarComponent', () => {
  let component: VisorNotificationsBarComponent;
  let fixture: ComponentFixture<VisorNotificationsBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VisorNotificationsBarComponent]
    });
    fixture = TestBed.createComponent(VisorNotificationsBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
