import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { AppAlarmService } from '../../core/service/app-alarm.service';

import { ResponseObject } from '../../core/model/response-object';
import { Authority } from './authority.model';
import { FormBase, FormType } from '../../core/form/form-base';
import { existingAuthorityValidator } from './authority-duplication-validator.directive';
import { AuthorityService } from './authority.service';

@Component({
  selector: 'app-authority-form',
  templateUrl: './authority-form.component.html',
  styleUrls: ['./authority-form.component.css']
})
export class AuthorityFormComponent extends FormBase implements OnInit {

  constructor(private fb: FormBuilder,
              private service: AuthorityService,
              private appAlarmService: AppAlarmService) { super(); }

  ngOnInit() {
    this.fg = this.fb.group({
      authority     : new FormControl(null, {
                                              validators: Validators.required,
                                              asyncValidators: [existingAuthorityValidator(this.service)],
                                              updateOn: 'blur'
                                            }),
      description   : [ null ],
      appUrl        : [ null ]
    });

    this.newForm();
  }

  newForm(): void {
    this.formType = FormType.NEW;

    this.fg.reset();
    this.fg.get('authority')?.enable();
    this.fg.get('appUrl')?.setValue(this.appUrl);
  }

  modifyForm(formData: Authority): void {
    this.formType = FormType.MODIFY;

    this.fg.get('authority')?.disable();
    this.fg.patchValue(formData);
    this.fg.get('appUrl')?.setValue(this.appUrl);
  }

  getAuthority(id: string): void {
    this.service
      .getAuthority(id)
      .subscribe(
        (model: ResponseObject<Authority>) => {
          if (model.total > 0) {
            this.modifyForm(model.data);
          } else {
            this.newForm();
          }
          this.appAlarmService.changeMessage(model.message);
        }
      );
  }

  saveAuthority(): void {
    console.log(this.fg.getRawValue());
    this.service
      .registerAuthority(this.fg.getRawValue())
      .subscribe(
        (model: ResponseObject<Authority>) => {
          this.appAlarmService.changeMessage(model.message);
          this.formSaved.emit(this.fg.getRawValue());
        }
      );
  }

  deleteAuthority(id: string): void {
    this.service
      .deleteAuthority(id)
      .subscribe(
        (model: ResponseObject<Authority>) => {
          this.appAlarmService.changeMessage(model.message);
          this.formDeleted.emit(this.fg.getRawValue());
        }
      );
  }

  patchValues(values: any): void {
    this.fg.patchValue(values);
  }

  closeForm(): void {
    this.formClosed.emit(this.fg.getRawValue());
  }

}
