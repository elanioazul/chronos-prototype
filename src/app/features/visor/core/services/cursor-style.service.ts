import { Injectable, computed, signal } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
export interface CursorStyleState {
  style: string;
}
@Injectable({
  providedIn: 'root',
})
export class CursorStyleService {

  //state
  private state = signal<CursorStyleState>({
    style: 'default',
  });

  //selectors
  style = computed(() => this.state().style);

  //sources
  updateStyle$ = new Subject<string>();

  constructor() {
    this.updateStyle$.pipe(takeUntilDestroyed()).subscribe((style: string) =>
      this.state.update((state) => ({
        ...state,
        style: style
      }))
    )
  }

}
