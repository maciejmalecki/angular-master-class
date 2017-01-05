import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'trm-confirm-deactivation-dialog',
  template: `
    <h3 mat-dialog-title>Are you sure?</h3>
    <div mat-dialog-content>All unsaved changes will be gone.</div>

    <mat-dialog-actions fxLayout fxLayoutAlign="center center">
      <button mat-button (click)="dialogRef.close(true)">Yes</button>
      <button mat-button mat-dialog-close>No</button>
    </mat-dialog-actions>
  `
})
export class ConfirmDeactivationDialogComponent {
  constructor(public dialogRef: MatDialogRef<ConfirmDeactivationDialogComponent>) {}
}
