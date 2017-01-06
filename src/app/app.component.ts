import { Component, OnInit } from '@angular/core';
import { EventBusService } from './event-bus.service';

@Component({
  selector: 'trm-contacts-app',
  template: `
    <mat-toolbar color="primary">{{title}}</mat-toolbar>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./app.component.scss']
})
export class ContactsAppComponent implements OnInit {

  title: string;

  constructor(private eventBusService: EventBusService) {}

  ngOnInit () {
    this.eventBusService.observe('appTitleChange')
                        .subscribe(title => this.title = title);
  }
}
