import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {StatsService} from "@app/_services";
import { ChartType, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-user-pie',
  templateUrl: './user-pie.component.html'
})
export class UserPieComponent implements OnInit {
  loading = false;
  siteId: string;
// Pie
  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    }
  };
  public pieChartLabels: Label[] = [
    'All users',
    'Returning users'
  ];
  public pieChartData: number[] = [0, 0];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;

  public pieChartColors = [
    {
      backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)'],
    },
  ];
  constructor(
    private route: ActivatedRoute,
    private statsService: StatsService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.siteId = params['id'];
    });
    this.statsService.getPieUsers(this.siteId).subscribe((stats:any) => {
      this.loading = true;
      const all = stats['all'][0]['count'] ? stats['all'][0]['count']: 0;
      const unique = stats['unique'][0]['count'] ?stats['unique'][0]['count']: 0;

      this.pieChartData = [
        all,
        (all - unique) ? (all - unique): 40
      ];
    });
  }

}
