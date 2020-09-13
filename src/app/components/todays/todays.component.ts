import {Component, OnDestroy, OnInit} from '@angular/core';
import {WeatherService} from "../../services/weather.service";
import {WeatherModel} from "../../models/weather";
import {Subscription} from "rxjs";
import {NotificationService} from "../../services/notification.service";

@Component({
  selector: 'app-todays',
  templateUrl: './todays.component.html',
  styleUrls: ['./todays.component.scss']
})
export class TodaysComponent implements OnInit, OnDestroy {

  private getLocationSubscription: Subscription;
  private getCurrentWeatherSubscription: Subscription;

  public lat: number;
  public lon: number;

  public object: WeatherModel = {
  }

  public d = new Date();

  public weekDays: any = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  constructor(public weatherService: WeatherService, public notificationService: NotificationService) { }

  public ngOnInit(): void {
    this.notificationService.changeLoadingState(true);
    this.getLocationSubscription = this.weatherService.getLocation().subscribe((response) => {
      this.lat = response.lat;
      this.lon = response.lon;
      this.getWeather();
    });
  }

  public getWeather(): void {
    this.getCurrentWeatherSubscription = this.weatherService.getCurrentWeather(this.lat, this.lon).subscribe((response) => {
      this.object.temperature = Math.round(response.main.temp - 273.15);
      this.object.wind = response.wind.speed;
      this.object.humidity = response.main.humidity;
      this.object.country = response.name;
      this.object.clouds = response.clouds.all;
      this.object.windDegree = response.wind.deg;
      this.object.description = response.weather[0].main;
      this.notificationService.changeLoadingState(false);
    });
  }

  public ngOnDestroy(): void {
    if(this.getLocationSubscription) {
      this.getLocationSubscription.unsubscribe();
    }
    if(this.getCurrentWeatherSubscription) {
      this.getCurrentWeatherSubscription.unsubscribe();
    }
  }
}
