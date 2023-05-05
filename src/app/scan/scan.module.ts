import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScanComponent } from './scan.component';
import { Routes,RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ScanComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  declarations: [ScanComponent]
})
export class ScanModule { }
