import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map, filter } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';

export interface EventBusArgs {
  type: string;
  data: any;
}

@Injectable()
export class EventBusService {
  private _messages$ = new Subject<EventBusArgs>();

  emit (eventType: string, data: any) {
    this._messages$.next({ type: eventType, data: data });
  }

  observe(eventType: string) {
    return this._messages$.pipe(
      filter(args => args.type === eventType),
      map(args => args.data)
    );
  }
}
