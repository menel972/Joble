import { ApplicationComponent } from './application/application.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './AuthComponent/auth.component';
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/compat/auth-guard';

const ToLogin = () => redirectUnauthorizedTo(['connexion']);

const routes: Routes = [
  {path: '', redirectTo: 'connexion', pathMatch: 'full'},
  {path: 'connexion', component: AuthComponent},
  {path: 'app',
  component: ApplicationComponent,
  canActivate: [AngularFireAuthGuard], data: { authGuardPipe: ToLogin },
  children : [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', loadChildren: () => import('./application/TableModule/table.module').then(m => m.TableModule) },
    { path: 'details/:name/:id', loadChildren: () => import('./application/DetailsModule/details.module').then(m => m.DetailsModule) },
    { path: 'settings', loadChildren: () => import('./application/SettingsModule/settings.module').then(m => m.SettingsModule)}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
