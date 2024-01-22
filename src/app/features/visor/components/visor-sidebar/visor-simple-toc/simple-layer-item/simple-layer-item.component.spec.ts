import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleLayerItemComponent } from './simple-layer-item.component';

describe('SimpleLayerItemComponent', () => {
  let component: SimpleLayerItemComponent;
  let fixture: ComponentFixture<SimpleLayerItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SimpleLayerItemComponent]
    });
    fixture = TestBed.createComponent(SimpleLayerItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
