import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs/index';

@Injectable()
export class NotificationService {

  public loading$: Observable<boolean>;

  private loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() {
    this.loading$ = this.loading.asObservable();
  }

  public changeLoadingState(loading: boolean): void {
    this.loading.next(loading);
  }

}
