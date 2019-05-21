import { Component, OnInit, Input } from '@angular/core';
import { TitleEditPage } from '../title-edit/title-edit.page'
import { AddFoodPage } from '../add-food/add-food.page'
import { EditSchedPage } from '../edit-sched/edit-sched.page'
import {AddPhotoPage} from '../add-photo/add-photo.page'
import {GlobalService } from '../../global/global.service'
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

}
