import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';

import { MenuService } from './menu.service';
import { ProgramService } from '../program/program.service';
import { AppAlarmService } from '../../core/service/app-alarm.service';

import { ResponseList } from '../../core/model/response-list';
import { ResponseObject } from '../../core/model/response-object';
import { Menu } from './menu.model';
import { WebResource } from '../program/web-resource';
import { MenuHierarchy } from './menu-hierarchy.model';
import { MenuGroup } from './menu-group.model';
import { FormBase, FormType } from '../../core/form/form-base';
import { existingMenuValidator } from './menu-duplication-validator.directive';

@Component({
  selector: 'app-menu-form',
  templateUrl: './menu-form.component.html',
  styleUrls: ['./menu-form.component.css']
})
export class MenuFormComponent extends FormBase implements OnInit {

  programList: any;
  menuGroupList: any;
  menuTypeList: any;

  /**
   * 상위 메뉴 트리
   */
  menuHiererachy: MenuHierarchy[];

  /**
   * Xs < 576px span size
   * Sm >= 576px span size
   */
  formLabelXs = 24;
  formControlXs = 24;

  formLabelSm = 24;
  formControlSm = 24;

  @Input()
  menuGroupCode: string = '';

  constructor(private fb: FormBuilder,
              private menuService: MenuService,
              private programService: ProgramService,
              private appAlarmService: AppAlarmService) {
    super();
    this.menuHiererachy = [];

    this.getMenuTypeList();
    this.getProgramList();
    this.getMenuGroupList();
  }

  ngOnInit() {
    this.fg = this.fb.group({
      menuGroupId       : [ null, [ Validators.required ] ],
      menuId            : new FormControl(null, {
                                                  validators: Validators.required,
                                                  asyncValidators: [existingMenuValidator(this.menuService)],
                                                  updateOn: 'blur'
                                                }),
      menuName          : [ null, [ Validators.required ] ],
      menuType          : [ null, [ Validators.required ] ],
      parentMenuId      : [ null ],
      sequence          : [ null ],
      resource          : [ null ]
    });

    this.newForm('');
  }

  public newForm(menuGroupId: string): void {
    this.formType = FormType.NEW;

    this.getMenuHierarchy(menuGroupId);

    this.fg.reset();
    this.fg.controls['menuGroupId'].setValue(menuGroupId);
    this.fg.controls['menuId'].enable();
  }

  public modifyForm(formData: Menu): void {
    this.formType = FormType.MODIFY;

    this.getMenuHierarchy(formData.menuGroupId);

    this.fg.controls['menuId'].disable();

    this.fg.patchValue(formData);
  }

  public getMenu(menuCode: string) {

    this.menuService
      .getMenu(menuCode)
      .subscribe(
        (model: ResponseObject<Menu>) => {
          if ( model.total > 0 ) {
            this.modifyForm(model.data);
          } else {
            this.newForm('');
          }
          this.appAlarmService.changeMessage(model.message);
        }
      );
  }

  submitMenu() {
    if (this.validForm(this.fg) === false)
      return;

    this.menuService
      .registerMenu(this.fg.getRawValue())
      .subscribe(
        (model: ResponseObject<Menu>) => {
          this.formSaved.emit(this.fg.getRawValue());
          this.appAlarmService.changeMessage(model.message);
        }
      );
  }

  deleteMenu(): void {
    this.menuService
      .deleteMenu(this.fg.getRawValue())
      .subscribe(
        (model: ResponseObject<Menu>) => {
          this.formDeleted.emit(this.fg.getRawValue());
          this.appAlarmService.changeMessage(model.message);
        }
      );
  }

  public closeForm() {
    this.formClosed.emit(this.fg.getRawValue());
  }

  getMenuHierarchy(menuGroupCode: string): void {

    this.menuService
      .getMenuHierarchy(menuGroupCode)
      .subscribe(
        (model: ResponseList<MenuHierarchy>) => {
          if ( model.total > 0 ) {
            this.menuHiererachy = model.data;
          } else {
            this.menuHiererachy = [];
          }
        }
      );
  }

  getProgramList(): void {
    this.programService
      .getProgramList()
      .subscribe(
        (model: ResponseList<WebResource>) => {
          if (model.total > 0) {
            this.programList = model.data;
          } else {
            this.programList = [];
          }
        }
      );
  }

  getMenuGroupList(): void {
    this.menuService
      .getMenuGroupList()
      .subscribe(
        (model: ResponseList<MenuGroup>) => {
          console.log(model.data);
          if (model.total > 0) {
            this.menuGroupList = model.data;
          } else {
            this.menuGroupList = [];
          }
        }
      );
  }

  getMenuTypeList(): void {
    this.menuService
      .getMenuTypeList()
      .subscribe(
        (model: ResponseList<any>) => {
          if (model.total > 0) {
            this.menuTypeList = model.data;
          } else {
            this.menuTypeList = [];
          }
        }
      );
  }

  selectMenuGroup(menuGroupId: any): void {
    this.getMenuHierarchy(menuGroupId);
  }

}
