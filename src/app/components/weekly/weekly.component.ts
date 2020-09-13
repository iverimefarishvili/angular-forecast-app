import { Component, OnInit, OnDestroy } from '@angular/core';
import {WeatherService} from "../../services/weather.service";
import {WeeklyWeatherModel} from "../../models/weeklyWeather";
import {Subscription} from "rxjs";
import {NotificationService} from "../../services/notification.service";

@Component({
  selector: 'app-weekly',
  templateUrl: './weekly.component.html',
  styleUrls: ['./weekly.component.scss']
})
export class WeeklyComponent implements OnInit, OnDestroy {

  public getLocationSubscription: Subscription;
  public getWeeklyWeatherSubscription: Subscription;

  public lat: number;
  public lon: number;

  public object: WeeklyWeatherModel = {};

  public weatherList = [];

  public fullWeekDays: any = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  public activeDay: number = null;

  constructor(public weatherService: WeatherService, public notificationService: NotificationService) { }

  public ngOnInit(): void {
    this.notificationService.changeLoadingState(true);
    this.getLocationSubscription = this.weatherService.getLocation().subscribe((response) => {
      this.lat = response.lat;
      this.lon = response.lon;
      this.getFullWeekForecast();
    });
  }

  public kelvinToCelsius(param: number): number {
    return Math.round(param - 273.15);
  }

  public getFullWeekForecast(): void {
    this.getWeeklyWeatherSubscription = this.weatherService.getWeekForecast(this.lat, this.lon).subscribe((response) => {
      response.daily.map((param) => {
        this.object.dayTemperature = this.kelvinToCelsius(param.temp.day);
        this.object.nightTemperature = this.kelvinToCelsius(param.temp.night);
        this.object.morningTemperature = this.kelvinToCelsius(param.temp.morn);
        this.object.eveningTemperature = this.kelvinToCelsius(param.temp.eve);
        this.object.description = param.weather[0].main;
        this.weatherList.push(this.object);
        this.object = {};
      });
      this.changeExposedDay(null);
      this.notificationService.changeLoadingState(false);
    });
  }

  public changeExposedDay(param: number): void {
      if(param === null) {
        this.object = this.weatherList[0];
        this.activeDay = 0;
      } else {
        this.object = this.weatherList[param];
        this.activeDay = param;
      }
  }

  public ngOnDestroy(): void {
    if(this.getLocationSubscription){
      this.getLocationSubscription.unsubscribe();
    }
    if(this.getWeeklyWeatherSubscription) {
      this.getWeeklyWeatherSubscription.unsubscribe();
    }
  }
}
