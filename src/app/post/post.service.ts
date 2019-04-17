import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http'
import 'rxjs/RX';


@Injectable({
  providedIn: 'root'
})
export class PostService {
  server: string = "http://192.168.1.16:8888/r_server/"
  constructor(public http: Http) { }
  


  postData(body, file){
    let type = "application/json; charset=UTF-8"
    let headers = new Headers({'Content-Type': type})
    let options = new RequestOptions({headers: headers})

    return this.http.post(this.server + file, JSON.stringify(body), options).map(res => res.json())
  }
}
