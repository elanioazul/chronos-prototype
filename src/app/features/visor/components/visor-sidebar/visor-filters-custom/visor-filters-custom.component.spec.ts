import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisorFiltersCustomComponent } from './visor-filters-custom.component';

describe('VisorFiltersCustomComponent', () => {
  let component: VisorFiltersCustomComponent;
  let fixture: ComponentFixture<VisorFiltersCustomComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VisorFiltersCustomComponent]
    });
    fixture = TestBed.createComponent(VisorFiltersCustomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
