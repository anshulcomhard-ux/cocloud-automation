import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormComponent } from '../form/form.component';
import { FormGroup, FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CustomerServiceService } from '../../core/services/customer-service.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, FormComponent, RouterLink, FormsModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
  @Input() title!: any
  @Input() subTitle!: any
  @Input() message!: any
  @Input() confirmText!: any
  @Input() cancelText!: any
  @Input() isLabelModal: boolean = false
  @Input() formFields: any[] = []
  @Input() form!: FormGroup;
  @Input() isSubmitButton: any
  @Input() redirectUrl: any;
  @Input() formUsedComponent: any;
  @Input() isExtraFields: any
  @Input() extraFields: any
  @Input() extraAmount: any
  @Input() specialModal: any
  @Input() specialNotes: any
  @Input() note: any
  @Input() note_class: any
  @Input() isSubscriptionList: boolean = false
  @Input() subscriptionOptions: any[] = [];
  @Input() email: any;
  @Input() domainName: any;
  @Input() class: any;
  @Output() emitForm = new EventEmitter<any>()
  @Output() event = new EventEmitter<any>();

  constructor(public bsModalRef: BsModalRef, private customerService: CustomerServiceService) { }

  emitStatus() {
    this.event.emit('ok')
  }

  submitForm(form: any) {
    this.emitForm.emit(form)
  }

  resetModal() {
    if (this.formFields.length > 0) {
      this.formFields.forEach((field: any) => {
        this.form.patchValue({ [field.id]: field.initialValue ? field.initialValue : '' },{emitEvent:false})
      });
      this.form.markAsUntouched()
    }
    this.bsModalRef.hide()
  }

  loginWithPartner(subscriptionId:any) {
    const payload = {
        email: this.email,
        subscriptionId: subscriptionId,
        isSalesMan: localStorage.getItem('isSalesman') ? true : false
    };
    this.customerService.loginWithPartner(payload).subscribe((res: any) => {
      if (res.success) {
        const url = this.domainName
          ? `http://${this.domainName}/login?token=${res.user.token} `
          : `${environment.url}/login?token=${res.user.token}`;
        window.open(url, '_blank');
        this.bsModalRef.hide();
      }
    });
  }

}
