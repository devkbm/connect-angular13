import { ChangeDetectionStrategy, Component, ElementRef, forwardRef, Input, TemplateRef, ViewChild } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormControl, FormGroup, NgModel, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

// https://ckeditor.com/docs/ckeditor5/latest/installation/getting-started/frameworks/angular.html

@Component({
  selector: 'app-nz-input-ckeditor',
  template: `
   <nz-form-item>
      <nz-form-label [nzFor]="itemId" [nzRequired]="required">
        {{label}}
      </nz-form-label>
      <nz-form-control nzHasFeedback [nzErrorTip]="nzErrorTip" [nzValidateStatus]="formField" #control>
        <ckeditor #ckEditor
          [editor]="Editor"
          [config]="editorConfig"
          [disabled]="disabled"
          tagName="textarea"
          data=""
          (change)="textChange($event)"
          (blur)="onTouched()">
        </ckeditor>
        <!--
        <input #inputControl nz-input
                [required]="required"
                [disabled]="disabled"
                [id]="itemId"
                [placeholder]="placeholder"
                [ngModel]="value"
                [readonly]="readonly"
                (ngModelChange)="onChange($event)"
                (ngModelChange)="valueChange($event)"
                (blur)="onTouched()"/>
        -->
      </nz-form-control>
    </nz-form-item>
  `,
  changeDetection: ChangeDetectionStrategy.Default,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(
        () => NzInputCkeditorComponent
      ),
      multi: true
    }
  ],
  styles: []
})
export class NzInputCkeditorComponent implements ControlValueAccessor {

  @ViewChild('input') element?: ElementRef<HTMLInputElement>;
  @Input() parentFormGroup?: FormGroup;
  @Input() fieldName!: string;
  @Input() itemId: string = '';
  @Input() label!: string;
  @Input() required: boolean = false;
  @Input() disabled: boolean = false;
  @Input() placeholder: string = '';

  @Input() nzErrorTip?: string | TemplateRef<{$implicit: AbstractControl | NgModel;}>;

  value!: string;

  onChange!: (value: string) => void;
  onTouched!: () => void;

  public Editor = ClassicEditor;
  editorConfig = {
    //plugins: [ Font ],
    toolbar: [ 'fontSize', 'fontFamily', 'fontColor', 'fontBackgroundColor','heading', '|', 'bold', 'italic' ]
  };

  constructor() { }

  get formField(): FormControl {
    return this.parentFormGroup?.get(this.fieldName) as FormControl;
  }

  logging(args: any) {
    console.log(args);
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

  focus(): void {
    this.element?.nativeElement.focus();
  }

  textChange({ editor }: ChangeEvent): void {
    const data = editor.getData();
    this.value = data;
    this.onChange(this.value);
  }
}
