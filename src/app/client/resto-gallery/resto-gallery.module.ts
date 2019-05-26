import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RestoGalleryPage } from './resto-gallery.page';

const routes: Routes = [
  {
    path: '',
    component: RestoGalleryPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [RestoGalleryPage]
})
export class RestoGalleryPageModule {}
