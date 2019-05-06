import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ViewmealPage } from './viewmeal.page';
import {MakereviewPageModule} from '../makereview/makereview.module'
const routes: Routes = [
  {
    path: '',
    component: ViewmealPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MakereviewPageModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ViewmealPage]
})
export class ViewmealPageModule {}