import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TabsModule } from './modules/tabs/tabs.module';


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    TabsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
