import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultCursorComponent } from './default-cursor.component';

describe('DefaultCursorComponent', () => {
  let component: DefaultCursorComponent;
  let fixture: ComponentFixture<DefaultCursorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DefaultCursorComponent]
    });
    fixture = TestBed.createComponent(DefaultCursorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
