import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiWeatherService } from '../api-weather.service';
import { ActivatedRoute } from '@angular/router';
import { Forecast } from '../forecast';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.css'
})
export class WeatherComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  weatherService: ApiWeatherService = inject(ApiWeatherService);
  forecast: Forecast | undefined;

  constructor() {
    const location = this.route.snapshot.params['id'];
    this.weatherService.getForecast(location).then(
      forecast => {
        this.forecast = forecast;
      }
    )
  }

}
