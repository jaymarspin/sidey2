import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ModeraterestoPage } from './moderateresto.page';

const routes: Routes = [
  {
    path: '',
    component: ModeraterestoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),

  ],
  declarations: [ModeraterestoPage]
})
export class ModeraterestoPageModule {}
