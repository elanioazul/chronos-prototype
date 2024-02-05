import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisorRoutingModule } from './visor-routing.module';
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
import { VisorSimpleTocComponent } from './components/visor-sidebar/visor-simple-toc/visor-simple-toc.component';
import { SimpleLayerItemComponent } from './components/visor-sidebar/visor-simple-toc/simple-layer-item/simple-layer-item.component';
import { Layout1Component } from './components/layouts/layout1/layout1.component';
import { WidgetContainerComponent } from './components/layouts/widgets/widgets-warehouse/widget-container/widget-container.component';
import { WidgetButtonComponent } from './components/layouts/widgets/widgets-warehouse/widget-button/widget-button.component';
import { WidgetDialogComponent } from './components/layouts/widgets/widgets-warehouse/widget-dialog/widget-dialog.component';
import { ZoomInComponent } from './components/layouts/widgets/zoom-in/zoom-in.component';
import { ZoomOutComponent } from './components/layouts/widgets/zoom-out/zoom-out.component';
import { DragZoomComponent } from './components/layouts/widgets/drag-zoom/drag-zoom.component';
import { OverviewMapComponent } from './components/layouts/widgets/overview-map/overview-map.component';
import { HomeExtentComponent } from './components/layouts/widgets/home-extent/home-extent.component';

@NgModule({
  declarations: [
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
    VisorSimpleTocComponent,
    SimpleLayerItemComponent,
    Layout1Component,
    WidgetContainerComponent,
    WidgetButtonComponent,
    WidgetDialogComponent,
    ZoomInComponent,
    ZoomOutComponent,
    DragZoomComponent,
    OverviewMapComponent,
    HomeExtentComponent,
  ],
  imports: [CommonModule, VisorRoutingModule, SharedModule],
})
export default class VisorModule {}
