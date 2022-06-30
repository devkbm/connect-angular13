import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';

import { MenuService } from './menu.service';
import { AppAlarmService } from '../../core/service/app-alarm.service';

import { ResponseObject } from '../../core/model/response-object';
import { MenuGroup } from './menu-group.model';
import { existingMenuGroupValidator } from './menu-group-duplication-validator.directive';
import { FormBase, FormType } from '../../core/form/form-base';

@Component({
  selector: 'app-menu-group-form',
  templateUrl: './menu-group-form.component.html',
  styleUrls: ['./menu-group-form.component.css']
})
export class MenuGroupFormComponent extends FormBase implements OnInit {

   ;

  /**
   * Xs < 576px span size
   * Sm >= 576px span size
   */
  formLabelXs = 24;
  formControlXs = 24;

  formLabelSm = 24;
  fromControlSm = 24;

  constructor(private fb: FormBuilder,
              private menuService: MenuService,
              private appAlarmService: AppAlarmService) { super(); }

  ngOnInit() {
    this.fg = this.fb.group({
      menuGroupId     : new FormControl(null, {
                                                validators: Validators.required,
                                                asyncValidators: [existingMenuGroupValidator(this.menuService)],
                                                updateOn: 'blur'
                                              }),
      menuGroupName   : [ null, [ Validators.required ] ],
      description     : [ null]
    });

    this.newForm();
  }

  newForm(): void {
    this.formType = FormType.NEW;

    this.fg.reset();
    this.fg.controls['menuGroupId'].enable();
  }

  modifyForm(formData: MenuGroup): void {
    this.formType = FormType.MODIFY;
    this.fg.controls['menuGroupId'].disable();

    this.fg.patchValue(formData);
  }

  getMenuGroup(menuGroupId: string) {
    this.menuService
      .getMenuGroup(menuGroupId)
      .subscribe(
        (model: ResponseObject<MenuGroup>) => {
          if ( model.total > 0 ) {
            this.modifyForm(model.data);
          } else {
            this.newForm();
          }
          this.appAlarmService.changeMessage(model.message);
        }
      );
  }

  submitMenuGroup() {
    if (this.validForm(this.fg) === false)
      return;

    this.menuService
      .registerMenuGroup(this.fg.getRawValue())
      .subscribe(
        (model: ResponseObject<MenuGroup>) => {
          this.formSaved.emit(this.fg.getRawValue());
          this.appAlarmService.changeMessage(model.message);
        }
      );
  }

  deleteMenuGroup() {
    this.menuService
      .deleteMenuGroup(this.fg.get('menuGroupId')?.value)
      .subscribe(
        (model: ResponseObject<MenuGroup>) => {
          this.formDeleted.emit(this.fg.getRawValue());
          this.appAlarmService.changeMessage(model.total + '건의 메뉴그룹이 삭제되었습니다.');
        }
      );
  }

  closeForm() {
    this.formClosed.emit(this.fg.getRawValue());
  }

}
