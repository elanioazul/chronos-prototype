import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisorHeaderComponent } from './visor-header.component';

describe('VisorHeaderComponent', () => {
  let component: VisorHeaderComponent;
  let fixture: ComponentFixture<VisorHeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VisorHeaderComponent]
    });
    fixture = TestBed.createComponent(VisorHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
