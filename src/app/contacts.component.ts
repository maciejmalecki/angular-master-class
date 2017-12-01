import { Component, OnInit } from '@angular/core';
import { EventBusService } from './event-bus.service';


@Component({
  selector: 'trm-contacts-app',
  template: `
    <mat-toolbar color="primary">
      <div fxLayout fxLayoutAlign="space-between center" fxFlex>
        {{title}}
        <a mat-button title="Go to about page" routerLink="/about" class="right">About</a>
      </div>
    </mat-toolbar>
    <router-outlet></router-outlet>
    <a mat-fab routerLink="/contact/new" title="Add a new contact" class="trm-floating-button">
      <mat-icon class="md-24">add</mat-icon>
    </a>
  `,
  styleUrls: ['./contacts.component.scss']
})
export class ContactsAppComponent implements OnInit {

  title: string;

  constructor(private eventBusService: EventBusService) {}

  ngOnInit () {
    this.eventBusService.observe('appTitleChange')
                        .subscribe(title => this.title = title);
  }
}
