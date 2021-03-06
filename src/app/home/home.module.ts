import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { ListingComponent } from '../listing/listing.component';
import { EventsComponent } from '../events/events.component';
import { Ionic2RatingModule } from 'ionic2-rating';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Ionic2RatingModule,
    
    RouterModule.forChild([
      {
        path: '',
        component: HomePage,
        // children: [
        //   {
        //     path: '',
        //     redirectTo: 'listing',
        //     pathMatch: 'full'
        //   },
        //   {
        //     path: 'listing',
        //     component: ListingComponent,
        //   },
        //   {
        //     path: 'events',
        //     component: EventsComponent,
        //   }

        // ]
      }
    ])
  ],
  declarations: [HomePage,ListingComponent,EventsComponent]
})
export class HomePageModule {

  

}
