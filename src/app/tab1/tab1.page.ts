import { Component, ViewChild, ElementRef } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';

declare var google;

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  map: any;

  constructor(private geolocation: Geolocation) { }

  ngOnInit() {
    this.geolocation.getCurrentPosition()
      .then((resp) => {
        const position = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);

        const mapOptions = {
          zoom: 18,
          center: position
        }

        this.map = new google.maps.Map(document.getElementById('map'), mapOptions);

        const marker = new google.maps.Marker({
          position: position,
          map: this.map
        });

      }).catch((error) => {
        console.log('Erro ao recuperar sua posição', error);
      });
  }

}



// export class Tab1Page {
//   latitude: any;
//   longitude: any;
//   @ViewChild('mapElement', {static:false}) mapNativeElement: ElementRef;
//   constructor(private geolocation: Geolocation) { }

//   ngOnInit() {
//   }

//   ngAfterViewInit(): void {
//     this.geolocation.getCurrentPosition().then((resp) => {
//       this.latitude = resp.coords.latitude;
//       this.longitude = resp.coords.longitude;
//       const map = new google.maps.Map(this.mapNativeElement.nativeElement, {
//         center: {lat: -34.397, lng: 150.644},
//         zoom: 6
//       });
//       const infoWindow = new google.maps.InfoWindow;
//       const pos = {
//         lat: this.latitude,
//         lng: this.longitude
//       };
//       infoWindow.setPosition(pos);
//       infoWindow.setContent('Location found.');
//       infoWindow.open(map);
//       map.setCenter(pos);
//     }).catch((error) => {
//       console.log('Error getting location', error);
//     });
//   }

// }