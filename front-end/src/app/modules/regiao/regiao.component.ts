import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

import { filter, map, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-regiao',
  templateUrl: './regiao.component.html',
  styleUrls: ['./regiao.component.scss']
})
export class RegiaoComponent implements OnInit {

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title
  ) { }

ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.activatedRoute),
      map(route => {
        while (route.firstChild) route = route.firstChild;
        return route;
      }),
      mergeMap(route => route.data)
    ).subscribe(event => {
      const title = event['title'] || 'Fretefy';
      this.titleService.setTitle(title); // Isso muda o texto da aba
    });
  }

}
