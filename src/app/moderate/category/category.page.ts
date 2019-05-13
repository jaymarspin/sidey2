import { Component, OnInit,Input } from '@angular/core';
import {GlobalService} from '../../global/global.service'
import {ModalController} from '@ionic/angular'
@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})
export class CategoryPage implements OnInit {
  category:any 
  selected:any
  l:any
  @Input('selected') cat
  constructor(private global: GlobalService,private modalCtrl: ModalController) {
    this.selected = new Array()
    
    this.category = new Array()
    this.category = ["meal","drinks","halo halo","beverage","ramen","noodles","dessert","others"]
   
   }

  ngOnInit() {
  }
  select(i){
    let pass = true;
    
    this.selected.forEach(element => {
      if(this.category[i] == element){
        pass = false
      }
    });
    if(this.selected.length <= 2){
      if(pass == true)this.selected.push(this.category[i])
    }
     
  }
  splice(i){
    this.selected.splice(i,1)
  }
  goback(){
    let data = {
      selected: this.selected
    }
    if(this.selected.length > 0)this.modalCtrl.dismiss(data)
    else this.modalCtrl.dismiss()
  }
  ionViewWillLeave(){
    this.global.leave()
   }
}
