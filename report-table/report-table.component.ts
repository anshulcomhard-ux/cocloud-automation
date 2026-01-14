import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-report-table',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatTooltipModule, MatSortModule, RouterLink, FormsModule],
  templateUrl: './report-table.component.html',
  styleUrl: './report-table.component.css'
})
export class ReportTableComponent implements OnInit {
  userType = localStorage.getItem('isSalesman') == 'true' ? true : false
  @Input() tableColumns: any
  @Input() data: any
  @Input() columnsToDisplay: any
  @Input() tableUsedComponent: any
  @Input() tableGroupColumns: any
  @Input() stickyColumn: any
  @Output() showDetailsTable = new EventEmitter<any>()
  domainName: any
  ascending: boolean = false

  ngOnInit() {
    this.domainName = localStorage.getItem('domainName')
  }

  sortData(type: any) {
    const lastValue = this.data[this.data.length - 1];

    const parseCurrency = (value: any) => {
      if (value === undefined || value === null) return 0;
      if (typeof value === 'number') return value;
      if (typeof value === 'string') {
        const parsed = parseFloat(value.replace(/[₹,]/g, ''));
        return isNaN(parsed) ? 0 : parsed;
      }
      return 0;
    };

    const sortedData = this.data.slice(0, this.data.length - 1).sort((a: any, b: any) => {
      const aValue = parseCurrency(a[type]?.value);
      const bValue = parseCurrency(b[type]?.value);
      if (aValue < bValue) {
        return this.ascending ? -1 : 1;
      } else if (aValue > bValue) {
        return this.ascending ? 1 : -1;
      }
      return 0;
    });

    sortedData.forEach((item: any, index: number) => {
      if (item["S. No."]) {
        item["S. No."].value = index + 1;
      }
    });

    this.data = [...sortedData, lastValue];
    this.ascending = !this.ascending;
  }

  showMrrActivity(value: any, varA: any, varB: any) {
    if (varA && varB != " " && value != '-') {
      this.showDetailsTable.emit({ varA: varA, varB: varB })
    }
  }

  getQueryParams(cell: any): any {
    if (!cell?.param || !cell?.id) return {};
    return { [cell.param]: cell.id };
  }

  getInfoMsg(column: any){
    if((this.tableUsedComponent == 'mrr-activity-data' || this.tableUsedComponent == 'salesman-activity-data' || this.tableUsedComponent == 'rm-activity-data') && column == 'Sub Id'){
      return 'Click on Sub Id to view the Subscription Details.'
    }
    else if(this.tableUsedComponent == 'salesman-report' && column == 'Salesperson'){
      return "Click on Salesperson's name to view Salesperson's MRR Report"
    }
    else if(this.tableUsedComponent == 'rm-report' && column == 'Relationship Manager'){
      return "Click on Relationship Manager's name to view Relationship Manager's MRR Report"
    }
    return ''
  }

}
