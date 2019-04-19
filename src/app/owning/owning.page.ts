import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';
import { Observable } from 'rxjs/observable'
@Component({
  selector: 'app-owning',
  templateUrl: './owning.page.html',
  styleUrls: ['./owning.page.scss'],
})
export class OwningPage implements OnInit {

  constructor(private http: HttpClient, private router: Router) { }
  user_id:any = 1
  result = []
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
