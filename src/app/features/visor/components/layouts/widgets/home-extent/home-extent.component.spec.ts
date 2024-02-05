import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeExtentComponent } from './home-extent.component';

describe('HomeExtentComponent', () => {
  let component: HomeExtentComponent;
  let fixture: ComponentFixture<HomeExtentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeExtentComponent]
    });
    fixture = TestBed.createComponent(HomeExtentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
