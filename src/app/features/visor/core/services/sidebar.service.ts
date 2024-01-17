import { Injectable, ElementRef} from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import Sidebar from '@core/js/ol5-sidebar.js';
@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  
  private sidebarDiv = new Subject<ElementRef<HTMLDivElement> | undefined>();
  sidebarDiv$ = this.sidebarDiv.asObservable();

  public sidebarInstance = new BehaviorSubject<Sidebar>({});
  sidebarInstance$ = this.sidebarInstance.asObservable();

  constructor() {
  }

  updateSidebarNode(template?: ElementRef<HTMLDivElement>) {
    this.sidebarDiv.next(template);
  }

  updateSidebarInstance(sidebar: Sidebar): void {
    this.sidebarInstance.next(sidebar);
  }

  getSidebarInstance(): Sidebar {
    return this.sidebarInstance.getValue();
  }

}
