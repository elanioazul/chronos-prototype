import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisorRoutingModule } from './visor-routing.module';
import { VisorComponent } from './components/visor.component';
import { VisorHeaderComponent } from './components/visor-header/visor-header.component';
import { VisorMapComponent } from './components/visor-map/visor-map.component';
import { VisorNotificationsBarComponent } from './components/visor-notifications-bar/visor-notifications-bar.component';
import { VisorSidebarComponent } from './components/visor-sidebar/visor-sidebar.component';
import { VisorSidebarTabComponent } from './components/visor-sidebar-tab/visor-sidebar-tab.component';
import { VisorSidebarTabNoTemplateComponent } from './components/visor-sidebar-tab-no-template/visor-sidebar-tab-no-template.component';
import { VisorSearchByCoordComponent } from './components/visor-sidebar/visor-search-by-coord/visor-search-by-coord.component';
import { VisorNavigatorComponent } from './components/visor-sidebar/visor-navigator/visor-navigator.component';
import { VisorNavigatorByClicksComponent } from './components/visor-sidebar/visor-navigator-by-clicks/visor-navigator-by-clicks.component';
import { VisorInfoComponent } from './components/visor-sidebar/visor-info/visor-info.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [
    VisorComponent,
    VisorHeaderComponent,
    VisorMapComponent,
    VisorNotificationsBarComponent,
    VisorSidebarComponent,
    VisorSidebarTabComponent,
    VisorSidebarTabNoTemplateComponent,
    VisorSearchByCoordComponent,
    VisorNavigatorComponent,
    VisorNavigatorByClicksComponent,
    VisorInfoComponent,
  ],
  imports: [CommonModule, VisorRoutingModule, SharedModule],
})
export default class VisorModule {}
