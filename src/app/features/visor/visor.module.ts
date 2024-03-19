import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
import { VisorSimpleTocComponent } from './components/visor-sidebar/visor-simple-toc/visor-simple-toc.component';
import { SimpleLayerItemComponent } from './components/visor-sidebar/visor-simple-toc/simple-layer-item/simple-layer-item.component';
import { VisorFiltersTreeComponent } from './components/visor-sidebar/visor-filters-tree/visor-filters-tree.component';
import { VisorFiltersAccordionReactiveFormComponent } from './components/visor-sidebar/visor-filters-accordion-reactive-form/visor-filters-accordion-reactive-form.component';
import { CheckboxAccordionComponent } from './components/visor-sidebar/visor-filters-accordion-reactive-form/components/checkbox-accordion/checkbox-accordion.component';

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
    VisorSimpleTocComponent,
    SimpleLayerItemComponent,
    VisorFiltersTreeComponent,
    VisorFiltersAccordionReactiveFormComponent,
    CheckboxAccordionComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    VisorRoutingModule,
    SharedModule,
  ],
})
export default class VisorModule {}
