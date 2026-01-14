import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, output, Output, ViewEncapsulation } from '@angular/core';
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import * as _moment from 'moment';
import { default as _rollupMoment, Moment } from 'moment';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';
import { CommonModule } from '@angular/common';
import { ToggleService } from '../../core/services/toggle.service';

const moment = _rollupMoment || _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'MMM YYYY',
  },
  display: {
    dateInput: 'MMM YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-month-year-picker',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatDatepickerModule, FormsModule, ReactiveFormsModule, CommonModule, MatNativeDateModule],
  templateUrl: './month-year-picker.component.html',
  styleUrl: './month-year-picker.component.css',
  providers: [
    provideMomentDateAdapter(MY_FORMATS),
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MonthYearPickerComponent implements OnInit {

  @Input() prevDate: any;
  @Input() componentUsed: any;
  @Output() searchDate = new EventEmitter<any>();

  date = new FormControl();

  constructor(private toggleService: ToggleService) { }

  ngOnInit(): void {
    if (this.prevDate) {
      this.date.patchValue(this.prevDate);
      this.searchDate.emit({ date: this.date.value });
    }
    this.toggleService.reset$.subscribe((isReset) => {
      if (isReset) {
        this.reset();
      }
    });
  }

  setMonthAndYear(normalizedMonthAndYear: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.date.value ?? moment();
    ctrlValue.month(normalizedMonthAndYear.month());
    ctrlValue.year(normalizedMonthAndYear.year());
    this.date.setValue(ctrlValue);
    this.searchDate.emit({ date: this.date.value });
    datepicker.close();
  }

  onManualChange() {
    const value = this.date.value;
    if (typeof value === 'string') {
      const parsed = moment(value, 'MM/YYYY', true);
      if (parsed.isValid()) {
        this.date.setValue(parsed);
        this.searchDate.emit({ date: parsed });
      }
    }
  }
  reset() {
    this.date.reset();
    this.searchDate.emit({ date: null });
  }
}

