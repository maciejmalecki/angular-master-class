import { Component, ViewChild, ViewContainerRef, ComponentFactoryResolver, AfterViewInit } from '@angular/core';
import { TooltipComponent } from '@angular/material';

@Component({
  selector: 'trm-contacts-app',
  template: `
    <mat-toolbar color="primary">Contacts</mat-toolbar>
    <div #meh></div>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./app.component.scss']
})
export class ContactsAppComponent implements AfterViewInit {

  @ViewChild('meh', {read: ViewContainerRef}) container: ViewContainerRef;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  ngAfterViewInit() {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(TooltipComponent);
    this.container.createComponent(componentFactory);
  }
}
