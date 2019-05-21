import { Component, OnInit,Input } from '@angular/core';
import {ModalController} from '@ionic/angular'
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-title-edit',
  templateUrl: './title-edit.page.html',
  styleUrls: ['./title-edit.page.scss'],
})
export class TitleEditPage implements OnInit {
  @Input('title') title
  former: FormGroup
  constructor(private validators: Validators,private formBuilder: FormBuilder,private modalCtrl: ModalController) { 
    this.former = this.formBuilder.group({
      name: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(50),
        
      ]))
      
     
    });

  }
  dismiss(){
    this.modalCtrl.dismiss()
  }
  goback(){
    this.modalCtrl.dismiss()
  }
  
  ngOnInit() {
  }

}
