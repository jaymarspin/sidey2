import { Component, OnInit, Input } from '@angular/core';
import { TitleEditPage } from '../title-edit/title-edit.page'
import { AddFoodPage } from '../add-food/add-food.page'
import { EditSchedPage } from '../edit-sched/edit-sched.page'
import {AddPhotoPage} from '../add-photo/add-photo.page'
import {AlbumsPage} from '../albums/albums.page'
import {MenuPage} from '../menu/menu.page'
import {MinfoPage} from '../minfo/minfo.page'
import {GlobalService } from '../../global/global.service'
import { ModalmapPage } from '../../modalmap/modalmap.page'
import { min } from 'rxjs-compat/operator/min';
 
@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
})
export class EditorComponent implements OnInit {
  @Input('id') id
  @Input('title') title
  public items: Array<{ title: string; note: string; icon: string }> = [];
  constructor(private global: GlobalService) { 
     

  }

  ngOnInit() {}
  addPhoto(){
    let data = {
      id: this.id
    }
    this.global.presentModal(AddPhotoPage,data,"")
    
  }
  editTile(){
    let data = {
      title: this.title
    }
    this.global.presentModal(TitleEditPage,data,"")
    
  }

  addFood(){
    let data = {
      role: "meal",
      id: this.id,
      title: this.title
    }
    this.global.presentModal(AddFoodPage,data,"")
    
  }
  editSched(){
    let data = {
      id: this.id
    }
    this.global.presentModal(EditSchedPage,data,"")
    
  }
  editAddress(){
    let data = {
      lat: 6.123961,
         long: 125.168949,
         role: "admin"
    }
    this.global.presentModal(ModalmapPage,data,"")
  }
  menu(){
    let data = {
      id: this.id
    }
    this.global.presentModal(MenuPage,data,"")
  }
  album(){
    let data = {
      id: this.id
    }
    this.global.presentModal(AlbumsPage,data,"")
  }
  minfo(){
    let data = {
      id: this.id
    }
    this.global.presentModal(MinfoPage,data,"")
  }

  

}
