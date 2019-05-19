import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import {EditorComponent} from "../moderate/editor/editor.component"
import { ModeraterestoPage } from './moderateresto.page';
 
import { Ionic2RatingModule } from 'ionic2-rating';
const routes: Routes = [
  {
    path: '',
    component: ModeraterestoPage
  }
];

@NgModule({
  entryComponents: [ModeraterestoPage,EditorComponent],
  imports: [
    
    CommonModule,
    FormsModule,
    IonicModule,
     
    Ionic2RatingModule,
    RouterModule.forChild(routes),

  ],
  declarations: [ModeraterestoPage,EditorComponent]
})
export class ModeraterestoPageModule {}
