import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

// https://blog.hackages.io/our-solution-to-get-a-previous-route-with-angular-5-601c16621cf0
@Injectable()
export class MenuService {
  private history = [];

  constructor(private router: Router) {}

  public loadRouting(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(({urlAfterRedirects}: NavigationEnd) => {
        this.history = [...this.history, urlAfterRedirects];
      });
  }

  public getHistory(): string[] {
    return this.history;
  }

  public getRouteHistoryUrls_1(): string {
    return this.history[this.history.length - 1] || '/';
  }

  public getRouteHistoryUrls_2(): string {
    return this.history[this.history.length - 2] || '/';
  }
}
