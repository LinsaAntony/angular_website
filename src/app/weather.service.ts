import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiKey = 'eb6ba48846916a1b144bb0b606e5e12b';  // Replace with your API key from OpenWeatherMap
  private apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Toronto&units=metric&appid=${this.apiKey}`;

  constructor(private http: HttpClient) {}

  getWeather(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
