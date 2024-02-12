import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiWeatherService } from '../api-weather.service';
import { ActivatedRoute } from '@angular/router';
import { Forecast } from '../forecast';
import { LineChartComponent } from '../line-chart/line-chart.component';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [
    CommonModule,
    LineChartComponent,
  ],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.css'
})
export class WeatherComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  weatherService: ApiWeatherService = inject(ApiWeatherService);
  forecast: Forecast = { temperatures: {} };
  location: string = "";

  constructor() {
    const location_id = this.route.snapshot.params['id'];
    if (location_id == "TOP"){
      this.location = "Kansas";
    } else {
      this.location = "Columbia";
    }
    this.weatherService.getForecast(location_id).then(
      forecast => {
        this.forecast = forecast;
      }
    )
  }
}
