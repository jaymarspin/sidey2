import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-title-edit',
  templateUrl: './title-edit.page.html',
  styleUrls: ['./title-edit.page.scss'],
})
export class TitleEditPage implements OnInit {
  @Input('title') title
  constructor() { }
  
  ngOnInit() {
  }

}
