import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { StorageService } from './services/storage.service';


// @NgModule({
//   declarations: [],
//   imports: [
//     CommonModule
//   ],
//   providers: [AuthService]
// })
@NgModule()
export class SharedModule {
  static forRoot():ModuleWithProviders<any> {
      return {
          ngModule: SharedModule,
          providers: [AuthService, StorageService]
      };
  }
}