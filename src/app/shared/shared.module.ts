import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AuthService } from './services/auth.service';
import { StorageService } from './services/storage.service';

//Primeng
import { MessageService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DropdownModule } from 'primeng/dropdown';
import { TooltipModule } from 'primeng/tooltip';
import { DialogModule } from 'primeng/dialog';
import { ListboxModule } from 'primeng/listbox';
import { PanelModule } from 'primeng/panel';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { MultiSelectModule} from 'primeng/multiselect';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { InputNumberModule } from 'primeng/inputnumber';
import { PaginatorModule } from 'primeng/paginator';
import { TreeModule } from 'primeng/tree';
import { CheckboxModule } from 'primeng/checkbox';
import { SliderModule } from 'primeng/slider';
import { AccordionModule } from 'primeng/accordion';
//Primeng customized components
import { TableComponent } from './primeng/table/table.component';

// drag material cdk
import { DragDropModule } from '@angular/cdk/drag-drop';
@NgModule({
  declarations: [
    TableComponent
  ],
  imports: [
    MessagesModule,
    ButtonModule,
    InputTextModule,
    RadioButtonModule,
    DropdownModule,
    TooltipModule,
    DialogModule,
    ListboxModule,
    PanelModule,
    SelectButtonModule,
    ToastModule,
    TableModule,
    MultiSelectModule,
    FormsModule,
    CommonModule,
    ProgressSpinnerModule,
    InputNumberModule,
    PaginatorModule,
    TreeModule,
    CheckboxModule,
    SliderModule,
    AccordionModule
  ],
  exports: [
    MessagesModule,
    ButtonModule,
    InputTextModule,
    RadioButtonModule,
    DropdownModule,
    TooltipModule,
    DialogModule,
    ListboxModule,
    PanelModule,
    SelectButtonModule,
    ToastModule,
    TableComponent,
    InputNumberModule,
    PaginatorModule,
    TreeModule,
    CheckboxModule,
    SliderModule,
    DragDropModule,
    AccordionModule
  ],
})
export class SharedModule {
  static forRoot():ModuleWithProviders<any> {
      return {
          ngModule: SharedModule,
          providers: [AuthService, StorageService, MessageService]
      };
  }
}