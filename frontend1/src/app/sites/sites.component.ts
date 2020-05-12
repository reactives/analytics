import { Component } from '@angular/core';
import { first } from 'rxjs/operators';

import { Site } from '@app/_models';
import { SiteService } from '@app/_services';

@Component({
  selector: 'app-sites',
  templateUrl: 'sites.component.html' })
export class SitesComponent {
    loading = false;
    sites: Site[];

    constructor(private siteService: SiteService) { }

    ngOnInit() {
       this.loadSites();
    }

    loadSites(): void {
      this.loading = true;
      this.siteService.getAll().pipe(first()).subscribe(sites => {
        this.loading = false;
        this.sites = sites;
      });
    }

    deleteSite(id: string) {
        this.loading = true;
        this.siteService.deleteSite(id).subscribe(res => {
          this.loading = false;
        });
      this.loadSites();
  }
}
