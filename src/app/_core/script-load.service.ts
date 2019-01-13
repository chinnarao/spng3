import { Injectable } from '@angular/core';

@Injectable()
export class ScriptLoadService {

  constructor() {}

  public loadScript(url, id, c): void {
    if (!document.getElementById(id)) {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = url;
      script.id = id;
      script.addEventListener('load', function (e) { c(null, e); }, false);
      document.head.appendChild(script);
    }
  }

}

// const url = 'https://openlayers.org/en/v4.6.4/build/ol.js';
// this.load.loadScript(url, 'omap', () => {

//     const ol = window['ol'];

//     this.osm = new ol.layer.Tile({
//       source: new ol.source.OSM()
//     });

//     this.stamen = new ol.layer.Tile({
//       source: new ol.source.Stamen({
//         layer: 'toner'
//       })
//     });