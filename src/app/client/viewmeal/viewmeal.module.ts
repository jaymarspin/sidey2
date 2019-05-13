import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ViewmealPage } from './viewmeal.page';
const routes: Routes = [
  {
    path: '',
    component: ViewmealPage
  }
];


@NgModule({
  declarations: [ViewmealPage],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ] 
})
export class ViewmealPageModule {}
