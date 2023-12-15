import { ElementRef, Inject, Injectable, inject } from '@angular/core';
import { CustomSidebar } from '@features/visor/core/models/sidebar.model';
import { SidebarRepository } from '@features/visor/core/repositories/sidebar.repository';
import { SidebarService } from '@features/visor/core/services/sidebar.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SidebarRepositoryImpl implements SidebarRepository {
  sideBarService = inject(SidebarService);

  getSidebarDiv(): Observable<ElementRef<HTMLDivElement> | undefined> {
    return this.sideBarService.sidebarDiv$;
  }

  getSidebarInstance(): Observable<CustomSidebar> {
    return this.sideBarService.sidebarInstance$;
  }
}
