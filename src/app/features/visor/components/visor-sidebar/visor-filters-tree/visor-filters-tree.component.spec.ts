import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisorFiltersComponent } from './visor-filters-tree.component';

describe('VisorFiltersComponent', () => {
  let component: VisorFiltersComponent;
  let fixture: ComponentFixture<VisorFiltersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VisorFiltersComponent],
    });
    fixture = TestBed.createComponent(VisorFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
