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
  @Input() location!: string; 
  chart: any = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (this.forecast && Object.keys(this.forecast.temperatures).length > 0) {

      const values = Object.values(this.forecast.temperatures);

      const {
        labels, 
        dayTemperatures, 
        nightTemperatures
      } = this.getTemperaturesAndLabels(this.forecast);

      this.chart = new Chart('canvas', {
        type: 'line',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Daytime',
              data: dayTemperatures,
              fill: false,
              borderColor: 'rgba(255, 215, 0, 0.8)',
              borderWidth: 5,
              pointBackgroundColor: 'transparent',
              pointBorderColor: '#FFFFFF',
              pointBorderWidth: 4,
              pointHoverBorderColor: 'rgba(255, 255, 255, 0.6)',
              pointHoverBorderWidth: 10,  
              pointRadius: 7,
            },
            {
              label: 'Nighttime',
              data: nightTemperatures,
              fill: false,
              borderColor: 'rgba(72, 61, 139, 0.8)',
              borderWidth: 5,
              pointBackgroundColor: 'transparent',
              pointBorderColor: '#FFFFFF',
              pointBorderWidth: 4,
              pointHoverBorderColor: 'rgba(255, 255, 255, 0.6)',
              pointHoverBorderWidth: 10,  
              pointRadius: 7,
            },
          ],
        },
        options: {
          plugins: {
            legend: {
              display: true,
              labels: {
                font: {
                  size: 20,
                  family: 'Helvetica Neue',
                  style: 'normal',
                  weight: 'bold',
                },
                usePointStyle: false,
                boxWidth: 40,
                boxHeight: 1,
              }
            },
            tooltip: {
              enabled: true,
              position: 'average',
              mode: 'nearest',
              intersect: false,
              backgroundColor: 'rgba(173, 120, 220, 0.8)',
              titleFont: {
                weight: 'bold',
                size: 16,
              },
              bodyFont: {
                size: 14,
              },
              displayColors: false,
            }
          },
          aspectRatio: this.calculateAspectRatio(),
          scales: {
            x: {
              grid: {
                display: false,
              },
              ticks: {
                font: {
                  size: 20,
                  family: 'Helvetica Neue',
                  style: 'normal',
                  weight: 'bold',
                }
              }
            },
            y: {
              ticks: {
                font: {
                  size: 20,
                  family: 'Helvetica Neue',
                  style: 'normal',
                  weight: 'bold',
                }
              } 
            }
          },
        },
      })
    }
  }

  getTemperaturesAndLabels(forecast: Forecast): {labels: string[], dayTemperatures: number[], nightTemperatures: number[]} {
    const labels: string[] = [];
    const nightTemperatures: number[] = [];
    const dayTemperatures: number[] = [];

    for (const key in forecast.temperatures) {
      if (key.toLowerCase().includes('night')) {
        nightTemperatures.push(forecast.temperatures[key]);
      } else {
        dayTemperatures.push(forecast.temperatures[key]);
        labels.push(key);
      }
    }
    labels[0] = 'Today';

    return {labels, dayTemperatures, nightTemperatures};
  }

  calculateAspectRatio() {
    const screenWidth = window.innerWidth;

    if (screenWidth > 650) {
      return 2.5;
    }
    
    return 0.8;
  }
}
