import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ad-update',
  templateUrl: './ad-update.component.html',
  styleUrls: ['./ad-update.component.scss']
})
export class AdUpdateComponent implements OnInit {

  adId: string;
  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.adId = this.activatedRoute.snapshot.params['id'];
  }

}
