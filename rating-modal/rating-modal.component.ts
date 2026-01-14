import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RaiseRequestService } from '../../core/services/raise-request.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-rating-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './rating-modal.component.html',
  styleUrl: './rating-modal.component.css'
})
export class RatingModalComponent {
  constructor(private RaiseRequestService: RaiseRequestService, private toasterService: ToastrService) { }
  ratings = [
    { value: 1, label: 'Poor', emoji: '😞' },
    { value: 2, label: 'Average', emoji: '😐' },
    { value: 3, label: 'Good', emoji: '😊' },
    { value: 4, label: 'Very Good', emoji: '😃' },
    { value: 5, label: 'Excellent', emoji: '😍' }
  ];
  selectedRating: any
  @Input() ticketId: any
  @Output() event = new EventEmitter<any>()
  ratingForm = new FormGroup({
    rating: new FormControl(0, Validators.required),
    feedback: new FormControl('')
  })


  onRatingChange() {
    this.selectedRating = this.ratings.find(r => r.value === this.ratingForm.value.rating) || null;
    this.ratingForm.controls.feedback.markAsUntouched()
    if (this.selectedRating?.value < 4) {
      this.ratingForm.controls.feedback.setValidators([Validators.required])
      this.ratingForm.controls.feedback.updateValueAndValidity()
    } else {
      this.ratingForm.controls.feedback.clearValidators()
      this.ratingForm.controls.feedback.updateValueAndValidity()
    }
  }

  submit() {
    if (this.ratingForm.invalid) {
      this.ratingForm.markAllAsTouched()
    }
    else {
      this.event.emit('ok')
      const payload = {
        ticketId: this.ticketId,
        ...this.ratingForm.value
      }
      this.RaiseRequestService.updateTicket(payload).subscribe((res: any) => {
        if (res.success) {
          this.toasterService.success(res.message)
        }
      }, (err: any) => {
        this.toasterService.error(err.message)
      })
    }
  }
}
