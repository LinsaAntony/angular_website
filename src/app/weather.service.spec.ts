import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { WeatherService } from './weather.service';

describe('WeatherService', () => {
  let service: WeatherService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [WeatherService]
    });
    service = TestBed.inject(WeatherService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should retrieve weather data', () => {
    const mockData = {
      main: { temp: 15 }
    };

    service.getWeather().subscribe((data) => {
      expect(data.main.temp).toEqual(15);
    });

    const req = httpMock.expectOne(
      'https://api.openweathermap.org/data/2.5/weather?q=Toronto&units=metric&appid=YOUR_API_KEY'
    );
    req.flush(mockData);
  });

  afterEach(() => {
    httpMock.verify();
  });
});
