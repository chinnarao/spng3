
// https://www.html5rocks.com/en/tutorials/cors/
import { Injectable } from '@angular/core';

@Injectable()
export class XhrService {

    constructor() {}

    // method: 'GET' / "POST"
    public makeCorsRequest(method: string, url: string) {
        
        // This is a sample server that supports CORS.
        if(!url)
            url = 'http://html5rocks-cors.s3-website-us-east-1.amazonaws.com/index.html';
      
        let xhr = new XMLHttpRequest();
        if ("withCredentials" in xhr) {
            xhr.open(method, url, true); // XHR for Chrome/Firefox/Opera/Safari/>IE10 
          } else {
            xhr = null; // CORS not supported.
          }
        if (!xhr) {
          alert('CORS not supported');
          return;
        }
        xhr.timeout = 1000;
        xhr.send();

        xhr.onload = function() {
            if (xhr.status != 200) { // if it's not 200, consider it an error
                alert(xhr.status + ': ' + xhr.statusText); // e.g. 404: Not Found
            } else {
                console.log(`Loaded: ${this.status} ${this.responseText}`);
                alert(`Loaded: ${this.status} ${this.responseText}`);
            }
        };
        xhr.onerror = () => alert('Error');
        xhr.ontimeout = () => alert('Timeout!');
    }

}
