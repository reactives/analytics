import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SiteService } from '@app/_services';
import { Site } from '@app/_models';

@Component({ templateUrl: 'site.show.component.html' })
export class ShowSiteComponent implements OnInit {
  site: Site;
  loading = false;
  private error: '';
  constructor(
    private route: ActivatedRoute,
    private siteService: SiteService
  ) {

  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.getData(id);
    });
  }

  private getData(id: string): void {
    this.loading = true;
    this.siteService.getId(id)
      .subscribe(
        (site: Site) => {
          this.site = site;
          this.loading = false;
        },
        error => {
          this.error = error;
          this.loading = false;
        });
  }
}
