import {Component, Input, OnInit} from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {

  @Input() data;
  @Input() title;
  @Input() seriesName;
  @Input() xAxisTitle;
  highcharts;
  chartOptions;

  constructor(){
  }

  ngOnInit() {
    this.highcharts = Highcharts;
    this.chartOptions = {
      chart: {
        type: "spline"
      },
      title: {
        text: this.title
      },
      xAxis: {
        title: {
          text: this.xAxisTitle
        },
        categories: this.data.map(point => point.date)
      },
      yAxis: {
        title: {
          text: this.seriesName
        }
      },
      series: [{
        name: this.seriesName,
        data: this.data.map(point => point.average_score)
      }]
    };
  }

}
