import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { SelectSearchComponent } from '../select-search/select-search.component';


@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, SelectSearchComponent],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent implements OnInit {
  @Input() formFields!: any[]
  @Input() title: any
  @Input() form!: FormGroup
  @Input() pinCodeDetails: any
  @Input() validPinCode: any
  @Input() redirecturl: any
  @Input() isBackIcon: any
  @Input() formUsedComponent: any
  @Input() isSubmitButton: boolean = true
  @Input() fromModal: boolean = false
  @Input() specialNotes: any
  @Input() class: string = ''
  showPassword: boolean = false
  showConfirmPassword: boolean = false
  choosenColor: any
  @Output() sendForm = new EventEmitter<any>()
  @Output() changeValuesForm = new EventEmitter<any>()
  @Output() sendPinCode = new EventEmitter<any>()

  constructor(private router: Router, public bsModalRef: BsModalRef) { }

  ngOnInit(): void {
    this.form.valueChanges.subscribe((value: any) => {
      this.changeValuesForm.emit(value)
    })
  }
  ngOnChanges() {
    if (!this.form) {
      this.form = new FormGroup({});
    }
  }

  handleButton(button: string) {
    if (button === 'Cancel' || button === 'Close') {
      this.cancel();
    } else if (button === 'Reset') {
      this.resetForm();
    }
  }
  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched()
    }
    else {
      this.sendForm.emit(this.form.value)
    }
  }

  resetForm() {
    if (this.redirecturl) {
      this.router.navigateByUrl(this.redirecturl)
    }
    this.formFields.forEach((field: any) => {
      this.form.patchValue({ [field.id]: field.initialValue ? field.initialValue : '' })
    });
    this.form.markAsUntouched()
    this.bsModalRef.hide()
  }

  getPinCodeDetails(event: any) {
    const pincode = event.target.value;
    if (pincode.length == 6 && this.form.get('country')?.value == 'India') {
      this.sendPinCode.emit(pincode)
    }
  }

  togglePasswordVisibility(fieldId: string): void {
    if (fieldId === 'password') {
      this.showPassword = !this.showPassword;
      (document.getElementById(fieldId) as HTMLInputElement).type = this.showPassword ? 'text' : 'password';
    } else if (fieldId === 'confirmPassword') {
      this.showConfirmPassword = !this.showConfirmPassword;
      (document.getElementById(fieldId) as HTMLInputElement).type = this.showConfirmPassword ? 'text' : 'password';
    }
  }

  changeCustomColor(e: any) {
    this.form.patchValue({ color: e.target.value }, { emitEvent: false })
  }

  patchSelectedValue(e: any, field: any) {
    this.form.patchValue({ [field.id]: e })
  }
  cancel() {
    if (this.fromModal) {
      this.formFields.forEach((field: any) => {
        this.form.patchValue({ [field.id]: field.initialValue ? field.initialValue : '' })
      });
      this.form.markAsUntouched()
      this.form.markAsPristine();
      this.bsModalRef.hide()
    } else {
      window.history.back();
    }
  }
}
