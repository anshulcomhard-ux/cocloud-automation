import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-select-search',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './select-search.component.html',
  styleUrl: './select-search.component.css'
})
export class SelectSearchComponent {


  @Input() field: any
  @Input() initialSelectedValue: any
  @Input() disabled: boolean = false;
  selectedOption: any
  searchData: any[] = []
  @Output() emitSelectedValue = new EventEmitter<any>()

  onSearch(event: any) {
    if (this.searchData.length == 0) {
      this.searchData = this.field.dropdownData
    }

    if (event.target.value == '') {
      this.field.dropdownData = this.searchData
    }
    else {
      this.field.dropdownData = this.searchData.filter((data: any) => data.value.toLowerCase().includes(event.target.value.toLowerCase()))
    }
  }
  selectedValue(field: any) {
    this.selectedOption = field.value
    if (this.searchData.length > 0) {
      this.field.dropdownData = this.searchData
    }
    this.emitSelectedValue.emit(field._id)

  }
}
