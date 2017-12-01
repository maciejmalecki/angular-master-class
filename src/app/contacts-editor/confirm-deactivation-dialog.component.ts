import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'trm-confirm-deactivation-dialog',
  template: `
    <h3 matDialogTitle>Are you sure?</h3>
    <div mat-dialog-content>All unsaved changes will be gone.</div>

    <mat-dialog-actions fxLayout fxLayoutAlign="center center">
      <button mat-button (click)="dialogRef.close(true)">Yes</button>
      <button mat-button matDialogClose>No</button>
    </mat-dialog-actions>
  `
})
export class ConfirmDeactivationDialogComponent {
  constructor(public dialogRef: MatDialogRef<ConfirmDeactivationDialogComponent>) {}
}
