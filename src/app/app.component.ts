import { Component, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DatePipe],
  template: `
    <div>
      <p>Current Date and Time: {{ currentDate }}</p>
      <p>Current Toronto Temperature: {{ temperature }}</p>
    </div>
  `,
  providers: [DatePipe],
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  currentDate: string = '';
  temperature: string = 'Loading...';

  private datePipe = inject(DatePipe);
  private http = inject(HttpClient);

  private weatherApiKey = 'eb6ba48846916a1b144bb0b606e5e12b'; // Replace with OpenWeatherMap API key
  private weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Toronto,ca&units=metric&appid=${this.weatherApiKey}`;

  constructor() {
    this.updateTime();
    setInterval(() => this.updateTime(), 1000); // Update date and time every second
    this.fetchTemperature();
  }

  updateTime(): void {
    this.currentDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss') ?? '';
  }

  fetchTemperature(): void {
    this.http.get<any>(this.weatherApiUrl).subscribe({
      next: (data) => {
        this.temperature = `${data.main.temp}°C`;
      },
      error: (err) => {
        console.error('Error fetching weather data:', err);
        this.temperature = 'Error fetching temperature';
      },
    });
  }
}
