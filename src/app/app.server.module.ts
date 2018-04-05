import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';
import { FlexLayoutServerModule } from '@angular/flex-layout/server';

import { ContactsModule } from './app.module';
import { ContactsAppComponent } from './app.component';

@NgModule({
  imports: [ContactsModule, ServerModule, ModuleMapLoaderModule, FlexLayoutServerModule],
  bootstrap: [ContactsAppComponent]
})
export class AppServerModule {}
