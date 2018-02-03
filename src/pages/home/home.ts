import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { GeocoderProvider } from '../../providers/geocoder/geocoder';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public geocoded: boolean;
  public results: string;
  constructor(public navCtrl: NavController, private localNotifications: LocalNotifications, public _GEOCODE: GeocoderProvider, ) {
    // Schedule a single notification
    this.localNotifications.schedule({
      id: 1,
      text: 'Single ILocalNotification'
    });


    // Schedule multiple notifications
    this.localNotifications.schedule([{
      id: 1,
      text: 'Multi ILocalNotification 1'
    }, {
      id: 2,
      title: 'Local ILocalNotification Example',
      text: 'Multi ILocalNotification 2',
      icon: 'http://example.com/icon.png'
    }]);


    // Schedule delayed notification
    this.localNotifications.schedule({
      text: 'Delayed ILocalNotification',
      at: new Date(new Date().getTime() + 3600),
      led: 'FF0000',
      sound: null
    });

    let latitude: any = parseFloat("19.033048"),
      longitude: any = parseFloat("73.029662");

    this._GEOCODE.reverseGeocode(latitude, longitude)
      .then((data: any) => {
        this.geocoded = true;
        this.results = data;
        alert(this.results);
      })
      .catch((error: any) => {
        this.geocoded = true;
        this.results = error.message;
      });
  }
}
