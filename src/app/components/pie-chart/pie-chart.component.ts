import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import * as Highcharts from 'highcharts';

import noData from "highcharts/modules/no-data-to-display";
noData(Highcharts);
window['Highcharts'] = Highcharts;

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit, OnChanges{
  @Input() data;
  @Input() title;
  @Input() seriesName;
  highcharts;
  chartOptions;
  chartConfig: any;
  private chart: any;

  constructor(){
  }

  ngOnInit(){
    this.highcharts = Highcharts;
  }

  private renderChart() {
    this.chartOptions = {
      chart: {
        plotBorderWidth: null,
        plotShadow: false
      },
      title: {
        text: this.title
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      plotOptions: {
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
      series: [{
        type: 'pie',
        name: this.seriesName,
        data: []
      }],
      lang: {
        noData: "No hay información disponible"
      },
      noData: {
        style: {
          fontWeight: 'bold',
          fontSize: '15px',
          color: '#303030'
        }
      }
    };
  }

  ngOnChanges(changes: SimpleChanges) {
    this.renderChart();
    if(changes.data.currentValue && changes.data.currentValue.by_specialty){
      const self = this;
      setTimeout(function(){
        self.renderChart();
        self.chart? self.chart.showNoData():null;
        self.chartOptions.series[0].data = changes.data.currentValue.by_specialty.length>0?
          changes.data.currentValue.by_specialty.map(speciality => [speciality.specialty, speciality.count])
          :
          [];
      }, 500);
    }
  }

}
