import { Component, OnInit } from '@angular/core';
import XYZ from 'ol/source/XYZ';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';

@Component({
  selector: 'app-ad-create-map',
  templateUrl: './ad-create-map.component.html',
  styleUrls: ['./ad-create-map.component.scss','./ol.scss']
})
export class AdCreateMapComponent implements OnInit {

  //map;
  constructor() { }

  ngOnInit() {
    this.initilizeMap();
  }

  initilizeMap() {
    new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new XYZ({
            url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          })
        })
      ],
      view: new View({
        center: [0, 0],
        zoom: 2
      })
    });
    // this.map = new Map({
    //   target: 'map',
    //   layers: [
    //     new Tile({
    //       source: new OSM()
    //     })
    //   ],
    //   view: new View({
    //     center: [37.41, 8.82],
    //     zoom: 4
    //   })
    // });
  }
}
