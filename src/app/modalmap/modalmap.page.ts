import { Component, ViewChild, ElementRef, Input } from '@angular/core';
import {NavController, ModalController} from '@ionic/angular'
import leaflet from 'leaflet'
import { AlertController,NavParams } from '@ionic/angular';
 
import { Geolocation } from '@ionic-native/geolocation/ngx';
import {GlobalService } from '../global/global.service'
 
@Component({
  selector: 'app-modalmap',
  templateUrl: './modalmap.page.html',
  styleUrls: ['./modalmap.page.scss'],
})




export class ModalmapPage {
  lat: any;
  long: any;
  @ViewChild('map') mapContainer: ElementRef
  

  public loading: any;
  map:any = null
  r_lat: any
  r_long:any
  role:any
  change:any
  custom:any
  constructor(public navParams:NavParams,private global:GlobalService,public navController: NavController,public geo: Geolocation,public alertController: AlertController,public modalCtrl: ModalController){
    this.r_lat = this.navParams.get('lat');
    this.r_long = this.navParams.get('long');
    this.role = this.navParams.get('role');
    this.change = this.navParams.get('change');

  }
  


  ionViewDidEnter(){
    console.log(this.r_long)
    
    this.loadmap();
    
    
  }
  ionViewWillLeave() {
    this.global.leave()
   }
  // async presentAlertConfirm() {
  //   const alert = await this.alertController.create({
  //     header: 'Confirm!',
  //     message: 'Message <strong>text</strong>!!!',
  //     buttons: [
  //       {
  //         text: 'Cancel',
  //         role: 'cancel',
  //         cssClass: 'secondary',
  //         handler: (blah) => {
  //           console.log('Confirm Cancel: blah');
  //         }
  //       }, {
  //         text: 'Okay',
  //         handler: () => {
  //           console.log('Confirm Okay');
  //         }
  //       }
  //     ]
  //   });

  //   await alert.present();
  // }




 

  loadmap(){
    
    var customIcon = leaflet.icon({
      iconUrl: 'https://img.icons8.com/dusk/64/000000/marker.png',
      
      iconSize: [38, 40],
      iconAnchor: [18, 37],
      popupAnchor: [0, -32]
      });
    this.map = leaflet.map('map').setView([this.lat, this.long], 16);
    leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Restaurant Mapping'
    }).addTo(this.map);

    var marker: any



      
     
          if(this.role == "client"){
            marker = leaflet.marker([this.lat,this.long],{icon: customIcon,autoPan: true});
            marker.addTo(this.map).bindPopup("Restaurant Location").openPopup()
            
          }else if(this.change){
            marker = leaflet.marker([this.lat,this.long],{icon: customIcon,draggable: true,autoPan: true});
            marker.addTo(this.map).bindPopup("Your Place Location, drag to desired location").openPopup()
          }
          
          else{
            this.global.presentLoading("please Wait We're locating you").then(() => {
              this.map.locate({
                setView: true
              }).on('locationfound', e =>{
               // var radius = e.accuracy / 2;
                  this.global.loading.dismiss()
                  if(this.role == "admin" && !this.change){
                    marker = leaflet.marker(e.latlng,{icon: customIcon,draggable: true,autoPan: true});
                    marker.addTo(this.map).bindPopup("Your Place Location, drag to desired location").openPopup() 
                  }
                  this.map.addControl(new customControl());
                  
                 
                  // marker.on("dragend",function(e){
                   
                  // })
                
              })
            })
          }
            
      
      
    
    
    
    // this.map.on('click', e =>{
    //   var marker = new leaflet.marker(e.latlng,{
    //   icon: customIcon,    
    //   draggable: true,
    //   autoPan: true
    // }).addTo(this.map);

    //     marker.on('dragend', function (e) {
            
    //       });
    //     })



        
        
        var checkButton = document.createElement("ion-button")
        checkButton.innerHTML = "<ion-icon name='checkmark-circle-outline'></ion-icon>"
        var att2 = document.createAttribute("color"); 
        att2.value = "warning"
        checkButton.setAttributeNode(att2)
        var cancelButton = document.createElement("ion-button")
        cancelButton.innerHTML = "<ion-icon name='close-circle-outline'></ion-icon>"
        var att = document.createAttribute("color");       // Create a "class" attribute
        att.value = "danger"; 


        var self = this
        checkButton.onclick = function(e){
            
          var latter = marker.getLatLng()
            self.modalCtrl.dismiss(latter)
        }
        cancelButton.onclick = function(e){
         
            self.modalCtrl.dismiss()
        }



        



      var customControl:any =  leaflet.Control.extend({
      options: {
        position: 'bottomright'
      },
      onAdd: function (map) {
        var container = leaflet.DomUtil.create('div', );
        cancelButton.setAttributeNode(att)
        checkButton.style.height = "black";
       
          container.appendChild(checkButton)
      
        
      
        container.style.width = '30px';
        container.style.marginRight = '40px';
        return container;
      }
    });
    
    this.onMapReady(this.map,new customControl())

  } 
  
 




  onMapReady(map: leaflet.Map,customer) {
    setTimeout(() => {
      if(this.role == "client" || this.change){
        this.map.addControl(customer);
      }
      
      map.invalidateSize();
    }, 150);
 }



}
