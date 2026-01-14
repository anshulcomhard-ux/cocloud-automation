import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { interval, startWith, Subscription } from 'rxjs';

@Component({
  selector: 'app-auth-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './auth-form.component.html',
  styleUrl: './auth-form.component.css'
})
export class AuthFormComponent implements OnInit, OnDestroy {
  authForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    reEnterPassword: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d\s\W_]+$/)]),
    otp: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(6)])
  });

  @Input() formType: any;
  @Input() isForgotPassword = false;
  @Output() form_data = new EventEmitter<any>();

  showPassword = false;
  showConfirmPassword = false;
  remainingTime: number = 60;

  private timerSub?: Subscription;

  ngOnInit(): void {
    const passwordControl = this.authForm.get('password');
    const reEnterControl = this.authForm.get('reEnterPassword');

    if (this.formType === 'login') {
      passwordControl?.setValidators([Validators.required, Validators.minLength(6)]);
    } else {
      passwordControl?.setValidators([Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d\s\W_]+$/)]);
      reEnterControl?.setValidators([Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d\s\W_]+$/)]);
    }
    passwordControl?.updateValueAndValidity();
    reEnterControl?.updateValueAndValidity();
  }

  resendOTP() {
    this.clearTimer();
    this.remainingTime = 60;
    this.isForgotPassword = false;
    this.onSubmit();
    this.startCountdown();
  }

  onSubmit() {
    if (this.formType === 'login') {
      this.authForm.markAllAsTouched();
      if (this.email?.invalid || this.password?.invalid) return;
      this.form_data.emit(this.authForm.value);
    }

    if (this.formType === 'forgot-password' && this.isForgotPassword) {
      this.authForm.markAllAsTouched();
      if (this.password?.invalid || this.reEnterPassword?.invalid || this.otp?.invalid) return;
      const form = { ...this.authForm.value, type: 'reset' };
      this.form_data.emit(form);
    }

    if (this.formType === 'forgot-password' && !this.isForgotPassword) {
      this.authForm.controls.email.markAllAsTouched();
      this.startCountdown();
      if (this.email?.invalid) return;
      const form = { ...this.authForm.value, type: 'resend' };
      this.isForgotPassword = true;
      this.form_data.emit(form);
    }
  }

  togglePasswordVisibility(type: string): void {
    if (type === 'password') {
      this.showPassword = !this.showPassword;
      (document.getElementById(type) as HTMLInputElement).type = this.showPassword ? 'text' : 'password';
    } else if (type === 'confirmPassword') {
      this.showConfirmPassword = !this.showConfirmPassword;
      (document.getElementById(type) as HTMLInputElement).type = this.showConfirmPassword ? 'text' : 'password';
    }
  }

  startCountdown(): void {
    this.clearTimer();
    this.timerSub = interval(1000).pipe(startWith(0)).subscribe(() => {
      if (this.remainingTime > 0) {
        this.remainingTime--;
      } else {
        this.clearTimer();
      }
    });
  }

  clearTimer(): void {
    if (this.timerSub) {
      this.timerSub.unsubscribe();
      this.timerSub = undefined;
    }
  }

  ngOnDestroy(): void {
    this.clearTimer();
  }

  get email() { return this.authForm.get('email'); }
  get password() { return this.authForm.get('password'); }
  get reEnterPassword() { return this.authForm.get('reEnterPassword'); }
  get otp() { return this.authForm.get('otp'); }
}
