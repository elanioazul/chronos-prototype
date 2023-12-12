import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisorNavigatorByClicksComponent } from './visor-navigator-by-clicks.component';

describe('VisorNavigatorByClicksComponent', () => {
  let component: VisorNavigatorByClicksComponent;
  let fixture: ComponentFixture<VisorNavigatorByClicksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VisorNavigatorByClicksComponent]
    });
    fixture = TestBed.createComponent(VisorNavigatorByClicksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
