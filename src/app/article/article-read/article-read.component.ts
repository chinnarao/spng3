import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-article-read',
  templateUrl: './article-read.component.html',
  styleUrls: ['./article-read.component.scss']
})
export class ArticleReadComponent implements OnInit {

  articleId: string;
  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.articleId = this.activatedRoute.snapshot.params['id'];
  }

}
