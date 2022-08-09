import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';

import { ResponseObject } from '../../../../core/model/response-object';
import { FormBase, FormType } from '../../../../core/form/form-base';
import { WorkGroupService } from '../../service/workgroup.service';
import { WorkGroup } from '../../model/workgroup.model';
import { WorkGroupMember } from '../../model/workgroup-member.model';
import { WorkGroupSchedule } from '../../model/workgroup-schedule.model';
import { ResponseList } from '../../../../core/model/response-list';
import { NzInputTextareaComponent } from 'src/app/shared/nz-input-textarea/nz-input-textarea.component';

@Component({
selector: 'app-work-schedule-form',
templateUrl: './work-schedule-form.component.html',
styleUrls: ['./work-schedule-form.component.css']
})
export class WorkScheduleFormComponent extends FormBase implements OnInit, AfterViewInit {

  workGroupList: any;
  startTime: any;

  @ViewChild('text') text?: NzInputTextareaComponent;

  constructor(private fb: FormBuilder,
              private workGroupService: WorkGroupService) {
    super();

    this.fg = this.fb.group({
      id              : new FormControl({value: null, disabled: true}),
      text            : [ null, [ Validators.required ] ],
      start           : [ null, [ Validators.required ] ],
      end             : [ null, [ Validators.required ] ],
      allDay          : [ null, [ Validators.required ] ],
      workGroupId     : [ 0, [ Validators.required ] ]
    });
  }

  ngOnInit(): void {
    this.getMyWorkGroupList();
    this.newForm(-1, new Date(), new Date());
  }

  ngAfterViewInit(): void {
    this.text?.focus();
  }

  newForm(workGroupId: number, start: Date, end: Date): void {
      this.formType = FormType.NEW;

      // 30분 단위로 입력받기 위해 초,밀리초 초기화
      start.setSeconds(0);
      start.setMilliseconds(0);
      end.setSeconds(0);
      end.setMilliseconds(0);

      this.fg.get('workGroupId')?.setValue(Number.parseInt(workGroupId.toString(),10));
      this.fg.get('start')?.setValue(start);
      this.fg.get('end')?.setValue(end);
  }

  modifyForm(formData: WorkGroupSchedule): void {
      this.formType = FormType.MODIFY;

      this.fg.patchValue(formData);
  }

  getWorkGroupSchedule(id: number): void {
      this.workGroupService.getWorkGroupSchedule(id)
      .subscribe(
          (model: ResponseObject<WorkGroupSchedule>) => {
            if (model.data) {
                this.modifyForm(model.data);
            } else {
              this.newForm(0, new Date(), new Date());
            }
          }
      );
  }

  saveWorkGroupSchedule(): void {
      this.workGroupService
      .saveWorkGroupSchedule(this.fg.getRawValue())
      .subscribe(
          (model: ResponseObject<WorkGroupSchedule>) => {
              this.formSaved.emit(this.fg.getRawValue());
          }
      );
  }

  deleteWorkGroupSchedule(id: number): void {
      this.workGroupService.deleteWorkGroupSchedule(id)
      .subscribe(
          (model: ResponseObject<WorkGroupSchedule>) => {
              this.formDeleted.emit(this.fg.getRawValue());
          }
      );
  }

  getMyWorkGroupList(): void {
    this.workGroupService
        .getMyWorkGroupList()
        .subscribe(
          (model: ResponseList<WorkGroup>) => {
            if (model.total > 0) {
                this.workGroupList = model.data;
            } else {
                this.workGroupList = [];
            }
            //this.appAlarmService.changeMessage(model.message);
          }
        );
  }

  closeForm(): void {
    this.formClosed.emit(this.fg.getRawValue());
  }
}
