import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { ProgramService } from './program.service';
import { AppAlarmService } from '../../core/service/app-alarm.service';

import { ResponseObject } from '../../core/model/response-object';
import { WebResource } from './web-resource';
import { FormBase, FormType } from '../../core/form/form-base';
import { existingWebResourceValidator } from './web-resource-duplication-validator.directive';
import { ResponseList } from '../../core/model/response-list';
import { ResouceTypeEnum } from './resource-type-enum';

@Component({
  selector: 'app-program-form',
  templateUrl: './program-form.component.html',
  styleUrls: ['./program-form.component.css']
})
export class ProgramFormComponent extends FormBase implements OnInit {

  fg: FormGroup = new FormGroup({});

  /**
   * Xs < 576px span size
   * Sm >= 576px span size
   */
  formLabelXs = 24;
  formControlXs = 24;

  formLabelSm = 24;
  formControlSm = 24;

  resourceTypeList: ResouceTypeEnum[] = [];

  constructor(private fb: FormBuilder,
              private programService: ProgramService,
              private appAlarmService: AppAlarmService) { super(); }

  ngOnInit(): void {
    this.fg = this.fb.group({
      resourceCode  : new FormControl(null, {
                                              validators: Validators.required,
                                              asyncValidators: [existingWebResourceValidator(this.programService)],
                                              updateOn: 'blur'
                                            }),
      resourceName  : [ null, [ Validators.required ] ],
      resourceType  : [ null, [ Validators.required ] ],
      url           : [ null, [ Validators.required ] ],
      description   : [ null]
    });

    this.getCommonCodeList();
    this.newForm();
  }

  newForm(): void {
    this.formType = FormType.NEW;

    this.fg.reset();
    this.fg.get('resourceCode')?.enable();
  }

  modifyForm(formData: WebResource): void {
    this.formType = FormType.MODIFY;

    this.fg.get('resourceCode')?.disable();

    this.fg.patchValue(formData);
  }

  getProgram(id: string): void {
    this.programService
      .getProgram(id)
      .subscribe(
        (model: ResponseObject<WebResource>) => {
          if ( model.total > 0 ) {
            this.modifyForm(model.data);
          } else {
            this.newForm();
          }
          this.appAlarmService.changeMessage(model.message);
        }
      );
  }

  submitProgram(): void {
    if (this.validForm(this.fg) === false)
      return;

    this.programService
        .registerProgram(this.fg.getRawValue())
        .subscribe(
          (model: ResponseObject<WebResource>) => {
            this.appAlarmService.changeMessage(model.message);
            this.formSaved.emit(this.fg.getRawValue());
          }
        );
  }

  deleteProgram(id: string): void {
    this.programService
      .deleteProgram(id)
      .subscribe(
        (model: ResponseObject<WebResource>) => {
          this.appAlarmService.changeMessage(model.message);
          this.formDeleted.emit(this.fg.getRawValue());
        }
      );
  }

  closeForm(): void {
    this.formClosed.emit(this.fg.getRawValue());
  }

  private getCommonCodeList(): void {
    this.programService
        .getWebResourceTypeList()
        .subscribe(
        (model: ResponseList<ResouceTypeEnum>) => {
          if ( model.total > 0 ) {
            this.resourceTypeList = model.data;
          }
          this.appAlarmService.changeMessage(model.message);
        }
      );
  }

}
