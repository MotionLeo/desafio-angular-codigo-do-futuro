import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-google-maps',
  templateUrl: './google-maps.component.html',
  styleUrls: ['./google-maps.component.css']
})
export class GoogleMapsComponent implements OnInit {

  constructor() { }

   ngOnInit(): void {
  }
  options: google.maps.MapOptions = {
    center: {lat: 41.40338, lng: - 2.17403},
    zoom: 2
  };
}