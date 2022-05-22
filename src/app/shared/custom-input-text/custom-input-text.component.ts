import { ChangeDetectionStrategy, Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-custom-input-text',
  templateUrl: './custom-input-text.component.html',
  styleUrls: ['./custom-input-text.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(
        () => CustomInputTextComponent
      ) ,
      multi: true
    }
  ]
})
export class CustomInputTextComponent implements OnInit, ControlValueAccessor {

  @Input() label!: string;
  @Input() required: boolean = false;
  @Input() disabled: boolean = false;
  value!: string;

  onChange!: (value: string) => void;
  onTouched!: () => void;

  constructor() { }

  ngOnInit() {
  }

  writeValue(obj: any): void {
    this.value = obj;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
