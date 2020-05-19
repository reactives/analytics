import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {StatsService} from "@app/_services";

@Component({
  selector: 'app-user-devices',
  templateUrl: './user-devices.component.html',
})
export class UserDevicesComponent implements OnInit {
  loading = false;
  siteId: string;

  constructor(
    private route: ActivatedRoute,
    private statsService: StatsService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.siteId = params['id'];
    });
  }
}
