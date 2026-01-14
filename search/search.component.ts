import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DropdownComponent } from '../dropdown/dropdown.component';
import { DatepickerComponent } from '../datepicker/datepicker.component';
import { ToggleService } from '../../core/services/toggle.service';
import { MonthYearPickerComponent } from '../month-year-picker/month-year-picker.component';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, DropdownComponent, DatepickerComponent, MonthYearPickerComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {
  @Input() searchFields: any
  form!: FormGroup
  @Output() searchQueries = new EventEmitter<any>()
  isOpenSearchArea = false
  @Output() searchDates = new EventEmitter<any>()
  @Output() searchMonths = new EventEmitter<any>()

  constructor(private toggleService: ToggleService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({});
    this.buildForm();
  }

  buildForm() {
    this.searchFields.forEach((field: any) => {
      if (field.fieldType != 'datePicker') {
        const control = this.fb.control(field.isMultiSelect ? field.initialSelectedValue : '');
        this.form.addControl(field.id, control);
      }
    });
  }

  openSearchBox() {
    this.isOpenSearchArea = !this.isOpenSearchArea
  }
  onSubmit() {
    if (this.form.valid) {
      const formData = this.form.value
      this.searchQueries.emit({ form: formData, type: 'search' })
    }
  }
  resetSearch() {
    const emptyValues: any = {};
    Object.keys(this.form.controls).forEach(key => {
      emptyValues[key] = '';
    });
    this.form.reset(emptyValues);
    this.toggleService.setResetToggle(true)
    this.searchQueries.emit({ form: this.form.value, type: 'reset' })
  }

  fetchDropdownData(e: any) {
    this.form.patchValue({ [e.type]: e.value });
  }

  userSelectedDates(e: any) {
    this.searchDates.emit({ ...e })
  }

  userSelectedMonth(e: any) {
    const convertedDate = this.convertDate(e.date._d);
    this.form.patchValue({ expiryDate: convertedDate });
    this.searchMonths.emit({ type: 'expiryDate', startDate: convertedDate });
  }

  convertDate(date: Date) {
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${year}-${month < 10 ? `0${month}` : month}`;
  }

}
