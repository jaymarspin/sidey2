import { Component, OnInit } from '@angular/core';
import {ModalController, Events} from '@ionic/angular'
import {GlobalService } from '../../global/global.service'
@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.page.html',
  styleUrls: ['./reviews.page.scss'],
})
export class ReviewsPage implements OnInit {
  rate:any
  constructor(private modalCtrl:ModalController,public events: Events,private global: GlobalService) { 
    this.rate = (4.5)
  }

  ngOnInit() {
  }
  ionViewWillLeave() {
    this.global.leave()
   }
  goback(){
    this.modalCtrl.dismiss()
  }
  onRateChange(event){
    alert(event)
  }
}
