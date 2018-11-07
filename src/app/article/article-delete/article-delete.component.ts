import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-article-delete',
  templateUrl: './article-delete.component.html',
  styleUrls: ['./article-delete.component.scss']
})
export class ArticleDeleteComponent implements OnInit {

  articleId: string;
  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.articleId = this.activatedRoute.snapshot.params['id'];
  }

}
