import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisorSimpleTocComponent } from './visor-simple-toc.component';

describe('VisorSimpleTocComponent', () => {
  let component: VisorSimpleTocComponent;
  let fixture: ComponentFixture<VisorSimpleTocComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VisorSimpleTocComponent]
    });
    fixture = TestBed.createComponent(VisorSimpleTocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
