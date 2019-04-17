import { Component, OnInit,Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-title-edit',
  templateUrl: './title-edit.page.html',
  styleUrls: ['./title-edit.page.scss'],
})
export class TitleEditPage implements OnInit {
  @Input('title') title
  former: FormGroup
  constructor(private validators: Validators,private formBuilder: FormBuilder) { 
    this.former = this.formBuilder.group({
      name: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(50),
        
      ]))
      
     
    });

  }
  
  ngOnInit() {
  }

}
