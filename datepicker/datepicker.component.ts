import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardService } from '../../core/services/dashboard.service';
import { ToggleService } from '../../core/services/toggle.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-datepicker',
  standalone: true,
  providers: [
    provideNativeDateAdapter(),
  ],
  imports: [MatFormFieldModule, MatInputModule, MatDatepickerModule, FormsModule, ReactiveFormsModule, CommonModule, MatNativeDateModule, MatButtonModule],
  templateUrl: './datepicker.component.html',
  styleUrl: './datepicker.component.css',

})
export class DatepickerComponent implements OnInit {

  constructor(private dashboardService: DashboardService, private toggleService: ToggleService, private toastr: ToastrService) { }
  startAt: any
  @Input() data: any
  @Input() type: any
  @Output() dates = new EventEmitter<any>

  dateRange = new FormGroup({
    startDate: new FormControl(),
    endDate: new FormControl(),
  });

  ngOnInit(): void {
    this.toggleService.reset$.subscribe((isReset) => {
      if (isReset) {
        this.resetDates()
      }
    })
    this.dashboardService.dateRange$.subscribe((date_range) => {
      if (this.data == null) {
        this.dateRange.setValue({
          startDate: date_range.startDate,
          endDate: date_range.endDate
        })
        this.emitDates()
      }
    })
  }

  emitDates() {
    const startDate = this.dateRange?.value?.startDate;
    const endDate = this.dateRange?.value?.endDate;

    if (!this.data && startDate && endDate && startDate > endDate) {
      this.toastr.warning('Start date cannot be greater than end date');
      return;
    }

    this.dates.emit({
      type: this.data?.id,
      startDate: startDate ? this.formatDate(startDate) : null,
      endDate: endDate ? this.formatDate(endDate) : null,
    });
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}T00:00:00.000Z`;
  }
  resetDates() {
    this.dateRange.setValue({
      startDate: '',
      endDate: ''
    })
  }

}


