import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ContactsMaterialModule } from '../contacts-material.module';

import { AboutComponent } from './about.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: AboutComponent }
    ]),
    FlexLayoutModule,
    ContactsMaterialModule
  ],
  declarations: [AboutComponent]
})
export class AboutModule { }
