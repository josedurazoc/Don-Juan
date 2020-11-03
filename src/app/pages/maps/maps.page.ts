import { Component } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';

declare var google: any;

@Component({
  selector: 'app-home',
  templateUrl: 'maps.page.html',
  styleUrls: ['maps.page.scss'],
})
export class MapsPage {

  map: any;

  @ViewChild('map', {read: ElementRef, static: false}) mapRef: ElementRef;

  infoWindows: any = [];
  markers: any = [
    {
      title: 'Don Juan Distribuidora de Belleza - Suc. Palo Verde',
      latitude: '29.056446',
      longitude: '-110.965158'
    },
    {
      title: 'Don Juan Distribuidora de Belleza - Suc. Viñedos',
      latitude: '29.118316',
      longitude: '-110.992692'
    },
    {
      title: 'Don Juan Distribuidora de Belleza - Suc. JUÁREZ',
      latitude: '29.110574',
      longitude: '-110.953137'
    },
    {
      title: 'Don Juan Distribuidora',
      latitude: '29.088356',
      longitude: '-110.949167'
    },
    {
      title: 'Don Juan Distribuidora de Belleza - Suc. Colosio',
      latitude: '29.082196',
      longitude: '-111.018569'
    }
  ];
  constructor() {}
  ionViewDidEnter() {
    this.showMap();
  }
  addMarkersToMap(markers) {
    // tslint:disable-next-line:prefer-const
    for (let marker of markers) {
      // tslint:disable-next-line:prefer-const
      let position = new google.maps.LatLng(marker.latitude, marker.longitude);
      // tslint:disable-next-line:prefer-const
      let mapMarker = new google.maps.Marker({
        // tslint:disable-next-line:object-literal-shorthand
        position: position,
        title: marker.title,
        latitude: marker.latitude,
        longitude: marker.longitude
      });

      mapMarker.setMap(this.map);
      this.addInfoWindowToMarker(mapMarker);
    }
  }
  addInfoWindowToMarker(marker) {
    // tslint:disable-next-line:prefer-const
    let infoWindowContent = '<div id="content">' +
                              '<h2 id="firstHeading" class"firstHeading">' + marker.title + '</h2>' +
                              '<p>Latitude: ' + marker.latitude + '</p>' +
                              '<p>Longitude: ' + marker.longitude + '</p>' +
                            '</div>';

    // tslint:disable-next-line:prefer-const
    let infoWindow = new google.maps.InfoWindow({
      content: infoWindowContent
    });

    marker.addListener('click', () => {
      this.closeAllInfoWindows();
      infoWindow.open(this.map, marker);
    });
    this.infoWindows.push(infoWindow);
  }
  closeAllInfoWindows() {
    // tslint:disable-next-line:prefer-const
    for (let window of this.infoWindows) {
      window.close();
    }
  }

  showMap() {
    const location = new google.maps.LatLng(29.095839, -111.022281);
    const options = {
      center: location,
      zoom: 11,
      disableDefaultUI: true
    };
    this.map = new google.maps.Map(this.mapRef.nativeElement, options);
    this.addMarkersToMap(this.markers);
  }

}
