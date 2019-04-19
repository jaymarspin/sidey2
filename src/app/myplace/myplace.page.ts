import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/observable'
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';
@Component({
  selector: 'app-myplace',
  templateUrl: './myplace.page.html',
  styleUrls: ['./myplace.page.scss'],
})
export class MyplacePage implements OnInit {
  user_id:any = 1
  constructor(private http: HttpClient, private router: Router) { }
  result = []

  doSomething(id:any,title:any,address:any){
    console.log(address)
    
  }
  ngOnInit() {

    let url = "http://192.168.1.16:8888/r_server/my_places.php"
    let postdata = new FormData();
    

    postdata.append('id',this.user_id);
    let data:Observable<any> = this.http.post(url,postdata)
    data.subscribe((res) =>{
       for(var i = 0;i < res.length;i++){
        this.result[i] = res[i];
        console.log(this.result[i])
       }
    })
    
  }

}
