import {Component, OnDestroy, OnInit} from '@angular/core';
import {NotificationService} from "../../services/notification.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit, OnDestroy {
  public isLoaderActive: boolean = false;

  public notificationServiceSubscription: Subscription;

  constructor(private notificationService: NotificationService) {
  }

  public ngOnInit(): void {
    this.notificationServiceSubscription = this.notificationService.loading$.subscribe((changeLoaderState) => {
      this.isLoaderActive = changeLoaderState;
    });
  }

  public ngOnDestroy() {
    if(this.notificationServiceSubscription) {
      this.notificationServiceSubscription.unsubscribe();
    }
  }

}
