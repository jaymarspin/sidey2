import { Component, OnInit } from '@angular/core';
import {ModalController} from '@ionic/angular'
@Component({
  selector: 'app-edit-sched',
  templateUrl: './edit-sched.page.html',
  styleUrls: ['./edit-sched.page.scss'],
})
export class EditSchedPage implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }
  done(){
    
  }
   
  goback(){
    this.modalCtrl.dismiss()
  }
}
