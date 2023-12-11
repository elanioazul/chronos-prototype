import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisorRoutingModule } from './visor-routing.module';
import { VisorComponent } from './visor.component';



@NgModule({
  declarations: [
    VisorComponent
  ],
  imports: [
    CommonModule,
    VisorRoutingModule
  ]
})
export default class VisorModule { }
