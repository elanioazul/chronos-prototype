import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { Layout1Component } from './components/layouts/layout1/layout1.component';

const routes: Routes = [
  {
    path: '',
    component: Layout1Component,
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VisorRoutingModule {}
