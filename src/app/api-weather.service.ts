import { Injectable } from '@angular/core';
import { Forecast } from './forecast';

@Injectable({
  providedIn: 'root'
})
export class ApiWeatherService {

  url_start: string = 'https://api.weather.gov/gridpoints/'
  url_end: string = '/31,80/forecast'

  async getForecast(id: string): Promise<Forecast | undefined> {
    const data = await fetch(`${this.url_start}/${id}/${this.url_end}`);
    const jsonData = await data.json();

    if (!jsonData) return undefined;
    // process data to extract forecasted temperatures
    const temperatures: { [period: string]: number } = {};
    for (const period of jsonData.properties.periods) {
      temperatures[period.name] = period.temperature;
    }

    const forecast: Forecast = {
      temperatures: temperatures
    }

    return forecast ?? {};
  }
}
