import { Component, OnInit } from '@angular/core';
import {ModalController, Events} from '@ionic/angular'

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.page.html',
  styleUrls: ['./reviews.page.scss'],
})
export class ReviewsPage implements OnInit {
  rate:any
  constructor(private modalCtrl:ModalController,public events: Events) { 
    this.rate = (4.5)
  }

  ngOnInit() {
  }
  goback(){
    this.modalCtrl.dismiss()
  }
  onRateChange(event){
    alert(event)
  }
}
