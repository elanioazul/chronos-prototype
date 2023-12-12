import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisorNavigatorComponent } from './visor-navigator.component';

describe('VisorNavigatorComponent', () => {
  let component: VisorNavigatorComponent;
  let fixture: ComponentFixture<VisorNavigatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VisorNavigatorComponent]
    });
    fixture = TestBed.createComponent(VisorNavigatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
