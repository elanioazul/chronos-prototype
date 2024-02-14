import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
export interface CursorStyleState {
  style: string;
}
@Injectable({
  providedIn: 'root',
})
export class CursorStyleService {

  private cursorStyle = new BehaviorSubject<string>('default');
  cursorStyle$ = this.cursorStyle.asObservable();

  constructor() { }

  getCursorStyleValue() {
    return this.cursorStyle.value;
  }

  setCursorStyle(style: string) {
    this.cursorStyle.next(style);
  }

}
