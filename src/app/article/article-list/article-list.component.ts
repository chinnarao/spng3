import { Component, OnInit } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from 'src/app/_core/shared.service';

@Component({
    selector: 'app-article-list',
    templateUrl: './article-list.component.html',
    styleUrls: ['./article-list.component.scss'],
})
export class ArticleListComponent implements OnInit {
    constructor(private logger: NGXLogger, private toastrService: ToastrService, private sharedService: SharedService) {}

    ngOnInit() {}

    createError() {}
}
