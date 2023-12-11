import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { isTokenPresentGuard } from './guards/is-token-present.guard';

const routes: Routes = [
  {
		path: "",
		redirectTo: "/barrier",
		pathMatch: "full",
	},
  {
    path: "barrier",
    loadChildren: () =>
      import("./features/barrier/barrier.module")
  },
  {
		path: "visor",
    canActivate: [isTokenPresentGuard],
		loadChildren: () =>
			import("./features/visor/visor.module")
	},
  {
    path: "**",
    loadChildren: () =>
      import("./features/barrier/barrier.module")
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: true,
    anchorScrolling: 'enabled',
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
