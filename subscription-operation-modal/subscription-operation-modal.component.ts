import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { CustomerServiceService } from '../../core/services/customer-service.service';
import { environment } from '../../../environments/environment';
import { CommonModule } from '@angular/common';
import { SelectSearchComponent } from '../select-search/select-search.component';

@Component({
  selector: 'app-subscription-operation-modal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SelectSearchComponent
  ],
  templateUrl: './subscription-operation-modal.component.html',
  styleUrls: ['./subscription-operation-modal.component.css']
})
export class SubscriptionOperationModalComponent {
  @Input() title!: string;
  @Input() subTitle!: string;
  @Input() message!: string;
  @Input() confirmText: string = 'Confirm';
  @Input() cancelText: string = 'Cancel';
  @Input() formFields: any[] = [];
  @Input() form!: FormGroup;
  @Input() formUsedComponent: string = 'modal';
  @Input() specialNotes: any[] = [];
  @Input() specialNotes2: any[] = [];
  @Input() topSpecialNotes: any[] = [];
  @Input() note: string = '';
  @Input() notePosition: 'top' | 'bottom' = 'bottom';
  @Input() note_class: string = '';
  @Input() isSubscriptionList: boolean = false;
  @Input() subscriptionOptions: any[] = [];
  @Input() email!: string;
  @Input() domainName!: string;
  @Input() endDate!: string
  @Input() nextRenewalDate!: Date
  @Input() payableAmount!: number

  @Output() emitForm = new EventEmitter<any>();
  @Output() event = new EventEmitter<string>();

  constructor(
    public bsModalRef: BsModalRef,
    private customerService: CustomerServiceService
  ) { }

  ngOnInit(): void {
    this.initializeFormValues();
  }

  private initializeFormValues(): void {
    if (this.form && this.formFields?.length > 0) {
      const initialValues: { [key: string]: any } = {};

      this.formFields.forEach(field => {
        if (field.initialValue !== undefined && field.initialValue !== null) {
          initialValues[field.id] = field.initialValue;
        }
      });

      if (Object.keys(initialValues).length > 0) {
        this.form.patchValue(initialValues, { emitEvent: false });
      }
    }
  }

  handleSubmit(): void {
    try {
      if (this.form && this.formFields?.length > 0) {
        if (this.form.valid) {
          this.emitForm.emit(this.form.value);
          this.event.emit('ok');
        } else {
          this.markFormGroupTouched(this.form);
          console.warn('Form is invalid:', this.getFormErrors());
        }
      } else {
        this.event.emit('ok');
      }
    } catch (error) {
      console.error('Error in handleSubmit:', error);
    }
  }

  resetModal(): void {
    try {
      if (this.form && this.formFields?.length > 0) {
        const resetValues: { [key: string]: any } = {};

        this.formFields.forEach(field => {
          resetValues[field.id] = field.initialValue ?? '';
        });

        this.form.patchValue(resetValues, { emitEvent: false });
        this.form.markAsUntouched();
        this.form.markAsPristine();

        Object.keys(this.form.controls).forEach(key => {
          this.form.get(key)?.setErrors(null);
        });
      }

      this.bsModalRef.hide();
    } catch (error) {
      console.error('Error in resetModal:', error);
      this.bsModalRef.hide();
    }
  }

  loginWithPartner(subscriptionId: any): void {
    try {
      if (!subscriptionId || !this.email) {
        console.error('Missing required parameters for loginWithPartner');
        return;
      }

      const payload = {
        email: this.email,
        subscriptionId,
        isSalesMan: !!localStorage.getItem('isSalesman')
      };

      this.customerService.loginWithPartner(payload).subscribe({
        next: (res: any) => {
          if (res?.success && res?.user?.token) {
            const url = this.domainName
              ? `http://${this.domainName}/login?token=${res.user.token}`
              : `${environment.url}/login?token=${res.user.token}`;

            window.open(url, '_blank');
            this.bsModalRef.hide();
          } else {
            console.error('Invalid response from loginWithPartner:', res);
          }
        },
        error: (error) => {
          console.error('Error in loginWithPartner:', error);
        }
      });
    } catch (error) {
      console.error('Error in loginWithPartner:', error);
    }
  }

  patchSelectedValue(value: any, field: any): void {
    try {
      if (this.form && field?.id) {
        this.form.patchValue({ [field.id]: value });
      }
    } catch (error) {
      console.error('Error in patchSelectedValue:', error);
    }
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();
      control?.markAsDirty();
    });
  }

  private getFormErrors(): { [key: string]: any } {
    const formErrors: { [key: string]: any } = {};

    if (this.form) {
      Object.keys(this.form.controls).forEach(key => {
        const control = this.form.get(key);
        if (control && !control.valid) {
          formErrors[key] = control.errors;
        }
      });
    }

    return formErrors;
  }

  get isFormValid(): boolean {
    return !this.form || this.form.valid;
  }

  get hasFormErrors(): boolean {
    if (!this.form) return false;

    return Object.keys(this.form.controls).some(key => {
      const control = this.form.get(key);
      return control && control.invalid && (control.touched || control.dirty);
    });
  }
}