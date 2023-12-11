import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BarrierComponent } from './barrier.component';
import { ExternalIntegrationComponent } from './external-integration/external-integration.component';

const routes: Routes = [
  {
    path: '',
    component: BarrierComponent,
    children: [
      { path: 'externalIntegration/:token', component: ExternalIntegrationComponent}
    ]
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BarrierRoutingModule {}
