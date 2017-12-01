import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { MatDialogRef, MatDialog } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { ContactsEditorComponent } from './contacts-editor.component';
import { ConfirmDeactivationDialogComponent } from './confirm-deactivation-dialog.component';

import 'rxjs/add/observable/of';

@Injectable()
export class CanDeactivateContactsEditorGuard implements CanDeactivate<ContactsEditorComponent> {

  dialogRef: MatDialogRef<ConfirmDeactivationDialogComponent>;

  constructor(public dialog: MatDialog) {}

  canDeactivate(component: ContactsEditorComponent) {
    if (component.warnOnClosing && component.modelHasChanged) {
      this.dialogRef = this.dialog.open(ConfirmDeactivationDialogComponent, {
        disableClose: false
      });

      return this.dialogRef.afterClosed();
    }
    return Observable.of(true);
  }
}
