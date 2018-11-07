import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-article-update',
  templateUrl: './article-update.component.html',
  styleUrls: ['./article-update.component.scss']
})
export class ArticleUpdateComponent implements OnInit {

  articleId: string;
  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.articleId = this.activatedRoute.snapshot.params['id'];
  }

}
