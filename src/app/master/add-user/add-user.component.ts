import { ChangeDetectorRef, Component } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable, Observer } from 'rxjs';
import { AddUserService } from './add-user.service';
import { DatePipe } from '@angular/common';
import { NzFormLayoutType } from 'ng-zorro-antd/form';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css',
})
export class AddUserComponent {
  informationForm: FormGroup<{
    formLayout: FormControl<NzFormLayoutType>;
    firstName: FormControl<string>;
    lastName: FormControl<string>;
    userName: FormControl<string>;
    password: FormControl<string>;
    email: FormControl<string>;
    address: FormControl<string>;
    companyName: FormControl<string>;
  }>;
  businessForm: FormGroup<{
    formLayout: FormControl<NzFormLayoutType>;
    businessId: FormControl<string>;
    oneTimeCommission: FormControl<string>;
    residualPercent: FormControl<string>;
    shortCodeApp: FormControl<string>;
    shortCodeTerminal: FormControl<string>;
  }>;
  editForm: FormGroup<{
    formLayout: FormControl<NzFormLayoutType>;
    firstName: FormControl<string>;
    lastName: FormControl<string>;
    userName: FormControl<string>;
    password: FormControl<string>;
    email: FormControl<string>;
    address: FormControl<string>;
    companyName: FormControl<string>;
    businessId: FormControl<string>;
    oneTimeCommission: FormControl<string>;
    residualPercent: FormControl<string>;
    shortCodeApp: FormControl<string>;
    shortCodeTerminal: FormControl<string>;
  }>;
  spinner!: boolean;
  existingUserData!: any[];
  date!: string;
  businessList!: any[];
  activeEditItem!: boolean;
  updateObject!: any;
  editId!: number;
  activeAddItem!: boolean;
  searchKeyword: string = '';
  businessArray: any[] = [];
  businessNameArray: any[] = [];

  constructor(
    private fb: NonNullableFormBuilder,
    private router: Router,
    private message: NzMessageService,
    private service: AddUserService,
    private datePipe: DatePipe
  ) {
    this.informationForm = this.fb.group({
      formLayout: 'vertical' as NzFormLayoutType,
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      userName: ['', [Validators.required], [this.userNameAsyncValidator]],
      password: ['', [Validators.required]],
      email: [
        '',
        [Validators.email, Validators.required],
        [this.emailAsyncValidator],
      ],
      address: ['', [Validators.required]],
      companyName: ['', [Validators.required]],
    });
    this.businessForm = this.fb.group({
      formLayout: 'vertical' as NzFormLayoutType,
      businessId: ['', [Validators.required], [this.businessAsyncValidator]],
      oneTimeCommission: ['', [Validators.required]],
      residualPercent: ['', [Validators.required]],
      shortCodeApp: ['', [Validators.required]],
      shortCodeTerminal: ['', [Validators.required]],
    });
    this.editForm = this.fb.group({
      formLayout: 'vertical' as NzFormLayoutType,
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]],
      email: ['', [Validators.email, Validators.required]],
      address: ['', [Validators.required]],
      companyName: ['', [Validators.required]],
      businessId: ['', [Validators.required]],
      oneTimeCommission: ['', [Validators.required]],
      residualPercent: ['', [Validators.required]],
      shortCodeApp: ['', [Validators.required]],
      shortCodeTerminal: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getExistingUserData();
    this.getBusinessList();
  }

  activeUserSection(): void {
    this.activeAddItem = !this.activeAddItem;
    if (this.activeAddItem) {
      this.activeEditItem = false;
    }
    this.informationForm.reset();
  }

  // --------------------Fetch Record Code------------------------
  getExistingUserData() {
    this.service.getUser().subscribe({
      next: (res: any) => {
        // this.existingUserData = res;
        this.existingUserData = res.map((item: any) => ({
          id: item.id,
          firstName: item.firstName,
          lastName: item.lastName,
          userName: item.userName,
          email: item.email,
          address: item.address,
          companyName: item.companyName,
          userBizs: item.userBizs,
          expand: false,
        }));
      },
    });
  }
  getBusinessList(): void {
    this.service.getBusinessList().subscribe({
      next: (res) => {
        this.businessList = res;
      },
    });
  }

  // --------------------Duplication Code------------------------
  userNameAsyncValidator: AsyncValidatorFn = (control: AbstractControl) =>
    new Observable((observer: Observer<ValidationErrors | null>) => {
      setTimeout(() => {
        const userName = control.value.toLowerCase();
        const existingUserNames = this.existingUserData.map(
          (user) => user.userName
        );

        if (existingUserNames.includes(userName)) {
          observer.next({ error: true, duplicated: true });
        } else {
          observer.next(null);
        }
        observer.complete();
      }, 1000);
    });
  emailAsyncValidator: AsyncValidatorFn = (control: AbstractControl) =>
    new Observable((observer: Observer<ValidationErrors | null>) => {
      setTimeout(() => {
        const email = control.value.toLowerCase();
        const existingemails = this.existingUserData.map((user) => user.email);

        if (existingemails.includes(email)) {
          observer.next({ error: true, duplicated: true });
        } else {
          observer.next(null);
        }
        observer.complete();
      }, 1000);
    });

  businessAsyncValidator: AsyncValidatorFn = (control: AbstractControl) =>
    new Observable((observer: Observer<ValidationErrors | null>) => {
      setTimeout(() => {
        const business = control.value;
        const existingBusiness = this.businessArray.map(
          (user) => user.businessId
        );

        if (existingBusiness.includes(business)) {
          observer.next({ error: true, duplicated: true });
        } else {
          observer.next(null);
        }
        observer.complete();
      }, 1000);
    });

  // --------------------Submit Business Form Code------------------------
  submitBusinessForm(): void {
    if (this.businessForm.valid) {
      const obj = {
        id: 0,
        userLinkId: 0,
        businessId: this.businessForm.value.businessId,
        businessName: '',
        oneTimeCommission: this.businessForm.value.oneTimeCommission,
        residualPercent: this.businessForm.value.residualPercent,
        shortCodeApp: this.businessForm.value.shortCodeApp,
        shortCodeTerminal: this.businessForm.value.shortCodeTerminal,
      };
      this.businessArray.push(obj);
      if (this.businessArray) {
        const selectedBusinessId = this.businessForm.get('businessId')?.value;
        const selectedBusinessName = this.businessList.find(
          (business) => business.id === selectedBusinessId
        ).name;
        this.businessNameArray.push(selectedBusinessName);
        this.businessForm.reset();
      }
    } else {
      Object.values(this.businessForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
          this.spinner = false;
        }
      });
    }
  }

  // --------------------Submit Form Code------------------------
  formatDate(date: Date): string {
    return this.datePipe.transform(date, 'yyyy-MM-ddTHH:mm:ss.SSS')!;
  }
  submitForm(): void {
    this.spinner = true;

    if (this.informationForm.valid && this.businessArray.length > 0) {
      const originalDate = new Date();
      const formattedDate = this.formatDate(originalDate);
      const obj = {
        id: 0,
        createdBy: 0,
        createdAt: formattedDate,
        updatedBy: 0,
        updatedAt: formattedDate,
        userLinkId: 0,
        userId: 0,
        agentId: 0,
        firstName: this.informationForm.value.firstName,
        lastName: this.informationForm.value.lastName,
        userName: this.informationForm.value.userName?.toLowerCase(),
        password: this.informationForm.value.password,
        email: this.informationForm.value.email?.toLowerCase(),
        address: this.informationForm.value.address,
        companyName: this.informationForm.value.companyName,
        userBizs: this.businessArray,
      };
      this.service.postRegisterationForm(obj).subscribe({
        next: (res) => {
          this.informationForm.reset();
          this.businessForm.reset();
          this.businessArray = [];
          this.businessNameArray = [];
          this.message.create('success', `User register successfully.`);
          this.getExistingUserData();
          this.spinner = false;
        },
        error: (err) => {
          this.message.create('error', `User not register.`);
          this.spinner = false;
        },
      });
    } else {
      Object.values(this.informationForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
          this.spinner = false;
        }
      });
      Object.values(this.businessForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
          this.spinner = false;
        }
      });
    }
  }

  // --------------------Edit Form Code------------------------
  cancelEdit(): void {
    this.activeEditItem = false;
  }
  startEdit(data: any): void {
    this.updateObject = data;
    this.editForm.reset();
    this.activeEditItem = true;
    if (this.activeEditItem) {
      this.activeAddItem = false;
    }
    this.editForm = this.fb.group({
      formLayout: 'vertical' as NzFormLayoutType,
      firstName: [data?.firstName, [Validators.required]],
      lastName: [data?.lastName, [Validators.required]],
      userName: [data?.userName, [Validators.required]],
      password: [data?.password, [Validators.required]],
      email: [data?.email, [Validators.email, Validators.required]],
      address: [data?.address, [Validators.required]],
      companyName: [data?.companyName, [Validators.required]],
      businessId: [data?.businessId, [Validators.required]],
      oneTimeCommission: [data?.oneTimeCommission, [Validators.required]],
      residualPercent: [data?.residualPercent, [Validators.required]],
      shortCodeApp: [data?.shortCodeApp, [Validators.required]],
      shortCodeTerminal: [data?.shortCodeTerminal, [Validators.required]],
    });
  }
  updateForm(): void {
    this.spinner = true;
    const originalDate = new Date();
    const formattedDate = this.formatDate(originalDate);
    if (this.editForm.valid) {
      const obj = {
        id: this.updateObject.id,
        createdBy: this.updateObject?.createdBy,
        createdAt: this.updateObject?.createdAt,
        updatedBy: this.updateObject?.updatedBy,
        updatedAt: formattedDate,
        userLinkId: this.updateObject?.userLinkId,
        userId: this.updateObject?.userId,
        agentId: this.updateObject?.agentId,
        firstName: this.editForm.value.firstName,
        lastName: this.editForm.value.lastName,
        userName: this.editForm.value.userName?.toLowerCase(),
        password: this.editForm.value.password,
        email: this.editForm.value.email?.toLowerCase(),
        address: this.editForm.value.address,
        companyName: this.editForm.value.companyName,
        businessId: this.editForm.value.businessId,
        businessName: '',
        oneTimeCommission: this.editForm.value.oneTimeCommission,
        residualPercent: this.editForm.value.residualPercent,
        shortCodeApp: this.editForm.value.shortCodeApp,
        shortCodeTerminal: this.editForm.value.shortCodeTerminal,
      };
      this.service
        .updateRegisterationForm(this.updateObject.id, obj)
        .subscribe({
          next: (res) => {
            this.message.create('success', `User update successfully.`);
            // this.editForm.reset();
            this.spinner = false;
            setTimeout(() => {
              this.activeEditItem = false;
            }, 1000);
            this.getExistingUserData();
          },
        });
    } else {
      Object.values(this.editForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
          this.spinner = false;
        }
      });
    }
  }
}
