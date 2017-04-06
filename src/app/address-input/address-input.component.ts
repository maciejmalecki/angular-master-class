import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormGroup, FormBuilder, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Address } from '../models/contact';
import { COUNTRIES_DATA } from '../data/countries-data';

@Component({
  selector: 'trm-address-input',
  templateUrl: './address-input.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AddressInputComponent),
      multi: true
    }
  ]
})
export class AddressInputComponent implements OnInit, ControlValueAccessor {

  countries = COUNTRIES_DATA;
  form: FormGroup;
  propagateChange = (_: Address) => {};
  propagateTouch = (_: any) => {};

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      street: '',
      zip: '',
      city: '',
      country: ''
    });

    this.form.valueChanges.subscribe(address => this.propagateChange(address));
  }

  writeValue(address: Address) {
    this.form.setValue(address, {emitEvent: false});
  }

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched(fn) {
    this.propagateTouch = fn;
  }
}
