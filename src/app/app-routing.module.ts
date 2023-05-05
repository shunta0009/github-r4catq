import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { ScanComponent } from './scan/scan.component';

const routes: Routes = [
  {path:"scan",loadChildren:() => import('./scan/scan.module').then(m=>m.ScanModule)},
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  }
];
// AppModuleからItemsModuleを必ず削除します

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
