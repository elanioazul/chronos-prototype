import { Injectable, ElementRef, signal, computed } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import Sidebar from '@core/js/ol5-sidebar.js';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
export interface SidebarState {
  sidebarInstance: Sidebar | null;
  sidebarDiv: ElementRef<HTMLDivElement> | undefined;
  created: boolean;
}
@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  
  //state 
  private state = signal<SidebarState>({
    sidebarInstance: null,
    sidebarDiv: undefined,
    created: false
  });

  //selectors
  sidebarInstance = computed(() => this.state().sidebarInstance);
  sidebarDiv = computed(() => this.state().sidebarDiv);

  //sources
  updateSidebarInstance$ = new Subject<Sidebar>()
  updateSidebarNode$ = new Subject<ElementRef<HTMLDivElement>>();

  constructor() {
    this.updateSidebarInstance$.pipe(takeUntilDestroyed()).subscribe((sidebar: Sidebar) => 
      this.state.update((state) => ({
        ...state,
        sidebarInstance: sidebar
      }))
    )
    this.updateSidebarNode$.pipe(takeUntilDestroyed()).subscribe((sidebarDomNode: ElementRef<HTMLDivElement>) => 
      this.state.update((state) => ({
        ...state,
        sidebarInstance: sidebarDomNode
      }))
    );

  }

}
