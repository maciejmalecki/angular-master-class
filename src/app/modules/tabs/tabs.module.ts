import { NgModule } from '@angular/core';
import { MatButtonModule, MatTabsModule } from '@angular/material';
import { CommonModule } from '@angular/common';
import { TabComponent, TabsComponent } from '.';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatTabsModule
  ],
  declarations: [TabComponent, TabsComponent],
  exports: [
    TabsComponent,
    TabComponent
  ]
})
export class TabsModule { }
