import { Observable } from 'rxjs';

import { CustomSidebar } from '../models/sidebar.model';
import { ElementRef } from '@angular/core';

export abstract class SidebarRepository {
 abstract getSidebarDiv(): Observable<ElementRef<HTMLDivElement> | undefined>;
 abstract getSidebarInstance(): Observable<CustomSidebar>;
}