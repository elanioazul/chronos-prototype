import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarrierComponent } from './barrier.component';
import { BarrierRoutingModule } from './barrier-routing.module'



@NgModule({
  declarations: [
    BarrierComponent
  ],
  imports: [
    CommonModule,
    BarrierRoutingModule
  ]
})
export default class BarrierModule { }
