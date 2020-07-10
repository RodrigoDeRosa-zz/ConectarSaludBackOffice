import {Component, Input, OnInit} from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})

export class PieChartComponent implements OnInit{
  @Input() data;
  @Input() title;
  @Input() seriesName;
  highcharts;
  chartOptions;

  constructor(){
  }

  ngOnInit(){
    this.highcharts = Highcharts;
    this.chartOptions = {
      chart : {
        plotBorderWidth: null,
        plotShadow: false
      },
      title : {
        text: this.title
      },
      tooltip : {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      plotOptions : {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',

          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f}%'
          },

          showInLegend: true
        }
      },
      series : [{
        type: 'pie',
        name: this.seriesName,
        data: this.data.by_specialty.map(speciality => [speciality.specialty, speciality.count])
      }]
    };
  }

}
