/// <reference types="@types/googlemaps" />
import {
  Directive,
  ElementRef,
  OnInit,
  Output,
  EventEmitter
} from "@angular/core";
// https://github.com/search?l=TypeScript&o=desc&q=types%2Fgooglemaps+extension%3Ats+language%3ATypeScript+language%3ATypeScript&s=indexed&type=Code
@Directive({
  selector: "[google-place]"
})
export class GooglePlacesDirective implements OnInit {
  @Output() onSelect: EventEmitter<any> = new EventEmitter();
  private element: HTMLInputElement;

  constructor(private elRef: ElementRef) {
    this.element = elRef.nativeElement;
  }

  ngOnInit() {
    const autocomplete = new google.maps.places.Autocomplete(this.element);
    //Event listener to monitor place changes in the input
    google.maps.event.addListener(autocomplete, 'place_changed', () => {

        console.log( autocomplete.getPlace());
        //Emit the new address object for the updated place
        //this.onSelect.emit(this.getFormattedAddress(autocomplete.getPlace()));
        //this.onSelect.emit(autocomplete.getPlace());
        this.onSelect.emit(this.element.value);
  
      });
  }
}
