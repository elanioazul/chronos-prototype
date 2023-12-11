import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarrierComponent } from './barrier.component';
import { BarrierRoutingModule } from './barrier-routing.module';
import { ExternalIntegrationComponent } from './external-integration/external-integration.component'
import { SharedModule } from '@shared/shared.module';


@NgModule({
  declarations: [
    BarrierComponent,
    ExternalIntegrationComponent
  ],
  imports: [
    CommonModule,
    BarrierRoutingModule,
    SharedModule.forRoot()
  ]
})
export default class BarrierModule { }
