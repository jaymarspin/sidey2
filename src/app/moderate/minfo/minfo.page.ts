import { Component, OnInit,Input } from '@angular/core';
import {ModalController} from '@ionic/angular'
import {GlobalService} from '../../global/global.service'
@Component({
  selector: 'app-minfo',
  templateUrl: './minfo.page.html',
  styleUrls: ['./minfo.page.scss'],
})
export class MinfoPage implements OnInit {
  @Input("minfo") minfo:any
  constructor(private global:GlobalService, private modalCtrl:ModalController) { }

  ngOnInit() {
  }
  goback(){
    this.modalCtrl.dismiss()
  }
  ionViewWillLeave(){
    this.global.leave()
   }

}
