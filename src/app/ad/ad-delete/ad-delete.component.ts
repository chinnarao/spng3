import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ad-delete',
  templateUrl: './ad-delete.component.html',
  styleUrls: ['./ad-delete.component.scss']
})
export class AdDeleteComponent implements OnInit {

  adId: string;
  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.adId = this.activatedRoute.snapshot.params['id'];
  }

}
