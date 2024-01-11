import { NgModule } from "@angular/core";
import { Routes, RouterModule, PreloadAllModules } from "@angular/router";

import { PagesComponent } from "./pages/pages.component";
import { NotFoundComponent } from "./pages/not-found/not-found.component";
import { AuthGuard } from "./auth.guard";

const routes: Routes = [
  {path: "",component: PagesComponent,
    children: [
      {path: "",loadChildren: () =>import("./pages/home/home.module").then((m) => m.HomeModule),},
      {path: "login",loadChildren: () =>import("./pages/login/login.module").then((m) => m.LoginModule),},

    ],
  },
  {path: "admin",canActivate:[AuthGuard], loadChildren: () =>import("./admin/admin.module").then((m) => m.AdminModule),},
  { path: "**", component: NotFoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      initialNavigation: "enabledBlocking",
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
