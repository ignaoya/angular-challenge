import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart } from 'chart.js/auto';
import { Forecast } from '../forecast';

@Component({
  selector: 'app-line-chart',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './line-chart.component.html',
  styleUrl: './line-chart.component.css'
})
export class LineChartComponent implements OnChanges{
  @Input() forecast!: Forecast;   
  chart: any = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (this.forecast && Object.keys(this.forecast.temperatures).length > 0) {
      const labels = Object.keys(this.forecast.temperatures);
      const values = Object.values(this.forecast.temperatures);
      
      this.chart = new Chart('canvas', {
        type: 'line',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Temperature in Fahrenheit',
              data: values,
              borderWidth: 1,
            },
          ],
        },
      })
    }
  }
}
