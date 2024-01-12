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

//Primeng customized components
import { TableComponent } from './primeng/table/table.component';
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
    TreeModule
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
    TreeModule
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