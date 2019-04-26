import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/observable'
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';
import {PostService} from '../post/post.service'
@Component({
  selector: 'app-myplace',
  templateUrl: './myplace.page.html',
  styleUrls: ['./myplace.page.scss'],
})
export class MyplacePage implements OnInit {
  user_id:any = 1
  constructor(private post: PostService,private http: HttpClient, private router: Router) { }
  result = []
  role:any
  goToResto(id:any,title:any,address:any){
    this.router.navigate(["moderateresto",id,title,address,'admin']);
    
  }
  ngOnInit() {

    let url = this.post.server+"my_places.php"
    let postdata = new FormData();
    this.role = "admin"

    postdata.append('id',this.user_id);
    let data:Observable<any> = this.http.post(url,postdata)
    data.subscribe((res) =>{
       for(var i = 0;i < res.length;i++){
        this.result[i] = res[i];
       }
    })
    
  }
  goback(){
    this.router.navigate(['home']);
  }


}
