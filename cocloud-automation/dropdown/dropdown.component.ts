import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DashboardService } from '../../core/services/dashboard.service';
import { ToggleService } from '../../core/services/toggle.service';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule, MatInputModule, FormsModule, ReactiveFormsModule, CommonModule, MatTooltipModule],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.css'
})
export class DropdownComponent implements OnInit, OnChanges {
  multipleSelectData = new FormControl();
  singleSelectedData: any
  isSelectAll: boolean = false
  searchText = new FormControl('')
  dropdownList: any[] = []
  @Input() data: any
  @Input() type: any
  @Input() initialValues: any
  @Input() isOkButton: any
  @Output() searchData = new EventEmitter<any>

  constructor(private dashboardService: DashboardService, private toggleService: ToggleService) {
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['initialValues']) {
      this.multipleSelectData.setValue(this.initialValues);
      if (this.data.isMultiSelect && this.initialValues && this.data.dropdownData) {
        const allItemIds = this.data.dropdownData
          .filter((item: any) => item._id !== 'Select All')
          .map((item: any) => item._id);

        const allSelected = allItemIds.length > 0 &&
          allItemIds.every((id: string) => this.initialValues.includes(id));

        if (allSelected) {
          this.isSelectAll = true;
          this.multipleSelectData.setValue(this.data.dropdownData.map((item: any) => item._id));
        }
      }

      if (!this.isOkButton && this.data.isMultiSelect && this.multipleSelectData.value) {
        this.emitDropdownData();
      }
    }
  }

  ngOnInit(): void {
    this.toggleService.reset$.subscribe((isReset) => {
      if (isReset) {
        this.resetDropdown()
      }
    })
    if (this.data.title == "Timeline Filter") {
      this.singleSelectedData = "this-month"
    } else {
      this.singleSelectedData = ""
    }

    this.searchText.valueChanges.subscribe(value => {
      if (this.dropdownList.length == 0) {
        this.dropdownList = [...this.data.dropdownData]
      }

      if (value != '') {
        const searchList = this.dropdownList.filter((item: any) => {
          const itemName = item.Name || item.name || '';
          return item._id !== 'Select All' && itemName.toLowerCase().includes(value?.toLowerCase());
        });

        this.data.dropdownData = searchList;
        if (this.isSelectAll) {
          this.isSelectAll = false;
          const currentValues = this.multipleSelectData.value || [];
          const filteredValues = currentValues.filter((v: string) => v !== 'Select All');
          this.multipleSelectData.setValue(filteredValues);
        }
      }
      else {
        this.data.dropdownData = this.dropdownList;
        const currentValues = this.multipleSelectData.value || [];
        const allItemIds = this.dropdownList
          .filter((item: any) => item._id !== 'Select All')
          .map((item: any) => item._id);

        const allSelected = allItemIds.length > 0 &&
          allItemIds.every((id: string) => currentValues.includes(id));

        if (allSelected && !this.isSelectAll) {
          this.isSelectAll = true;
          this.multipleSelectData.setValue(this.dropdownList.map((item: any) => item._id));
        }
      }
    });
  }

  getSelectedNames(): string[] {
    if (!this.multipleSelectData.value) return [];
    return this.data.dropdownData
      .filter((item: any) =>
        this.multipleSelectData.value.includes(item._id) && item._id !== 'Select All'
      )
      .map((item: any) => item.name || item.Name);
  }

  emitDropdownData() {
    let selectedValues = this.multipleSelectData.value || [];

    if (selectedValues.includes("Select All")) {
      selectedValues = selectedValues.filter((v: string) => v !== "Select All");
    }

    this.searchData.emit({ type: this.data.id, value: selectedValues });

    if (this.dropdownList.length > 0) {
      this.data.dropdownData = this.dropdownList;
    }
  }


  dateRange(selectedType: string) {
    let startDate: Date;
    let endDate: Date;

    const today = new Date(); // Save the current date

    switch (selectedType) {
      case "this-week":
        startDate = new Date(today);
        startDate.setDate(today.getDate() - today.getDay() + 1);
        endDate = new Date(today);
        endDate.setDate(today.getDate() - today.getDay() + 7);
        break;

      case "last-week":
        startDate = new Date(today);
        startDate.setDate(today.getDate() - today.getDay() - 6);
        endDate = new Date(today);
        endDate.setDate(today.getDate() - today.getDay());
        break;

      case "next-week":
        startDate = new Date(today);
        startDate.setDate(today.getDate() - today.getDay() + 8);
        endDate = new Date(today);
        endDate.setDate(today.getDate() - today.getDay() + 14);
        break;

      case "this-month":
        startDate = new Date(today.getFullYear(), today.getMonth(), 1);
        endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        break;

      case "last-month":
        startDate = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        endDate = new Date(today.getFullYear(), today.getMonth(), 0);
        break;

      case "next-month":
        startDate = new Date(today.getFullYear(), today.getMonth() + 1, 1);
        endDate = new Date(today.getFullYear(), today.getMonth() + 2, 0);
        break;

      case "this-year":
        startDate = new Date(today.getFullYear(), 0, 1);
        endDate = new Date(today.getFullYear(), 11, 31);
        break;

      case "last-year":
        startDate = new Date(today.getFullYear() - 1, 0, 1);
        endDate = new Date(today.getFullYear() - 1, 11, 31);
        break;

      case "next-year":
        startDate = new Date(today.getFullYear() + 1, 0, 1);
        endDate = new Date(today.getFullYear() + 1, 11, 31);
        break;

      default:
        throw new Error('Invalid selectedType');
    }
    this.dashboardService.setDateRange({ startDate: startDate, endDate: endDate })

  }

  onSelectionChange(event: any): void {
    if (this.data.isMultiSelect) {
      if (event.value.includes('Select All')) {
        if (this.isSelectAll) {
          this.isSelectAll = false
          const values = this.multipleSelectData.value.slice(1)
          this.multipleSelectData.setValue(values)
        } else {
          this.isSelectAll = true
          this.multipleSelectData.setValue(this.data.dropdownData.map((item: any) => item._id));
        }
      } else {
        if (this.isSelectAll) {
          this.multipleSelectData.setValue([]);
          this.isSelectAll = false
        }
        else if (this.multipleSelectData.value.length == this.data.dropdownData.length - 1) {
          this.isSelectAll = true
          this.multipleSelectData.setValue(this.data.dropdownData.map((item: any) => item._id));
        }
      }

      if (!this.isOkButton) {
        this.emitDropdownData()
      }
    }
    else {
      if (this.type != 'searchForm') {
        this.dateRange(this.singleSelectedData)
      }
      else {
        this.data.dropdownData.map((item: any) => {
          if (item._id == this.singleSelectedData) {
            this.searchData.emit({ type: this.data.id, value: item._id })
          }
        })
      }
    }
  }

  resetDropdown() {
    this.multipleSelectData.setValue([])
    this.singleSelectedData = ''
    this.toggleService.setResetToggle(false)
  }
  getContrastColor(hexColor: string): string {
    if (!hexColor) return '#000';
    const color = hexColor.replace('#', '');
    const r = parseInt(color.substr(0, 2), 16);
    const g = parseInt(color.substr(2, 2), 16);
    const b = parseInt(color.substr(4, 2), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.5 ? '#000000' : '#FFFFFF';
  }
}
