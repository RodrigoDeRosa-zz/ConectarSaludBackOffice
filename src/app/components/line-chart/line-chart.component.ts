import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit, OnChanges {

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

  }

  private renderChart(){
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
        data: []
      }],
      lang: {
        noData: "Consulta sin resultados"
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
    if(changes.data.currentValue){
      const self = this;
      setTimeout(function(){
        self.renderChart();
        self.chartOptions.series[0].data = changes.data.currentValue.map(point => point.average_score);
      }, 500);
    }
  }

}
