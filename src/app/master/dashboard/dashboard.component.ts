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
import { AddUserService } from '../add-user/add-user.service';

interface ItemData {
  id: string;
  name: string;
  age: number;
  address: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  validateForm: FormGroup<{
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
  formData!: FormGroup;

  listOfOption: string[] = [];
  spinner!: boolean;
  existingUserData!: any[];
  constructor(
    private cdr: ChangeDetectorRef,
    private fb: NonNullableFormBuilder,
    private router: Router,
    private message: NzMessageService,
    private service: AddUserService
  ) {
    this.validateForm = this.fb.group({
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
      businessId: ['', [Validators.required]],
      oneTimeCommission: ['', [Validators.required]],
      residualPercent: ['', [Validators.required]],
      shortCodeApp: ['', [Validators.required]],
      shortCodeTerminal: ['', [Validators.required]],
    });
  }

  editCache: { [key: string]: { edit: boolean; data: ItemData } } = {};
  listOfData: ItemData[] = [];

  ngOnInit(): void {
    const data = [];
    for (let i = 0; i < 100; i++) {
      data.push({
        id: `${i}`,
        name: `Edrward ${i}`,
        age: 32,
        address: `London Park no. ${i}`,
      });
    }
    this.listOfData = data;

    // /////
    this.formData = this.fb.group({
      name: [null, Validators.required],
      price: [null, Validators.required],
      quantity: [null, Validators.required],
      code: [null, Validators.required],
      material: [null, Validators.required],
      weight: [null, Validators.required],
      width: [null, Validators.required],
      height: [null, Validators.required],
      description: [null, Validators.required],
      img: [null, Validators.required],
    });
  }
  // ----------
  activeAddItem!: boolean;
  addItemSection(): void {
    this.activeAddItem = !this.activeAddItem;
    this.formData.reset();
  }
  addItem(): void {
    console.log(this.formData.value);
  }
  cancelAddItem(): void {
    this.activeAddItem = false;
  }

  // --------------------Fetch Record Code------------------------
  getExistingUserData(): void {
    this.service.getUser().subscribe({
      next: (res) => {
        this.existingUserData = res;
      },
    });
  }

  // --------------------Duplication Code------------------------
  userNameAsyncValidator: AsyncValidatorFn = (control: AbstractControl) =>
    new Observable((observer: Observer<ValidationErrors | null>) => {
      setTimeout(() => {
        const userName = control.value;
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
        const email = control.value;
        const existingemails = this.existingUserData.map((user) => user.email);

        if (existingemails.includes(email)) {
          observer.next({ error: true, duplicated: true });
        } else {
          observer.next(null);
        }
        observer.complete();
      }, 1000);
    });
  // --------------------Submit Form Code------------------------
  submitForm(): void {
    this.spinner = true;

    if (this.validateForm.valid) {
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
          this.spinner = false;
        }
      });
    }
  }
}
