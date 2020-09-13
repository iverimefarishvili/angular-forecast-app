import {Injectable} from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {API, APIKey} from '../utils';

@Injectable()
export class WeatherService{
  constructor(private http: HttpClient) {}

  public getLocation(): Observable<any> {
    return this.http.get(`http://ip-api.com/json`);
  }

  public getCurrentWeather(lat: number, lon: number): Observable<any> {
    return this.http.get(`${API}weather?lat=${lat}&lon=${lon}&appid=${APIKey}`);
  }

  public getWeekForecast(lat: number, lon: number): Observable<any> {
    return this.http.get(`${API}onecall?lat=${lat}&lon=${lon}&exclude=hourly&appid=${APIKey}`);
  }
}
