import { Component, OnInit } from '@angular/core';
import {PostService} from '../post/post.service'
import {GlobalService } from '../global/global.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  fname:any
  lname:any
  contact:any
  birthdate:any
  username:any
  password:any
  constructor(private router: Router,private global: GlobalService,private post: PostService) { }
  
  ngOnInit() {
  }
  done(){
    if(this.fname && this.lname && this.contact && this.birthdate && this.username && this.password){
      let data = {
        fname: this.fname,
        lname: this.lname,
        contact: this.contact,
        birthdate: this.birthdate,
        username: this.username,
        password: this.password
      }
      this.post.postData(data,"register.php").subscribe((res) =>{
        let Response = res.json()
        if(Response[0].message == "success"){
          this.global.presentAlert("Successfully registered! You can now log in")
      
          this.router.navigate(['login']);
        }else{
          this.global.presentToast(Response[0].message)
        }
      },(e)=>{
        this.global.presentToast("Server Error! pls try again later")
      })
    }else{
      this.global.presentToast("Please fill all the fields before proceeding")
    }
    
    
  }

}
