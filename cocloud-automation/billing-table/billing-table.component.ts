import { SelectionModel } from '@angular/cdk/collections';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { IndexedDbService } from '../../core/services/indexed-db.service';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-billing-table',
  standalone: true,
  imports: [CommonModule, FormsModule, MatPaginator, MatTooltipModule],
  templateUrl: './billing-table.component.html',
  styleUrl: './billing-table.component.css'
})
export class BillingTableComponent {
  constructor(private indexedDB: IndexedDbService) { }

  @Input() tableColumns: any;
  @Input() data: any[] = [];
  @Input() isExcel: any;
  @Input() columnsToDisplay: any;
  @Input() tableUsedComponent = '';
  @Input() clearSelection = false;
  @Input() dataConfig: any = {};
  @Input() billingDataConfig: any = {};
  @Input() billingData: any[] = [];
  @Input() billingColumnsToDisplay: any;
  @Input() billingTableColumns: any;
  @Output() updateConfig = new EventEmitter<any>();
  @Output() showDetailsTable = new EventEmitter<any>();

  errorMsg: boolean = true
  activeDate: any = '';
  isCollapse: boolean = true
  visibleColumns: { [key: string]: boolean } = {};

  get currentPageSize() {
    return this.isCollapse ?
      (this.dataConfig?.itemsPerPage || 20) :
      (this.billingDataConfig?.itemsPerPage || 15);
  }

  get currentPageIndex() {
    return this.isCollapse ?
      ((this.dataConfig?.currentPage || 1) - 1) :
      ((this.billingDataConfig?.currentPage || 1) - 1);
  }

  get currentLength() {
    if (this.isCollapse) {
      return this.dataConfig?.totalItems || this.data?.length || 0;
    } else {
      return this.billingDataConfig?.totalItems || this.billingData?.length || 0;
    }
  }

  pageSizeOptions = [15, 20, 50, 100, 200, 500];
  selection = new SelectionModel<any>(true, []);

  async ngOnInit() {
    await this.getColumns();
    this.updateVisible();
  }

  ngOnChanges(): void {
    this.getColumns();
    this.updateVisible();
  }

  handlePageEvent(e: PageEvent) {
    const configUpdate = {
      itemsPerPage: e.pageSize,
      currentPage: e.pageIndex + 1,
      isCollapse: this.isCollapse,
      ...(this.activeDate && !this.isCollapse ? { date: this.activeDate } : {})
    };

    this.updateConfig.emit(configUpdate);
  }

  toggleCursor(element: any) {
    this.data.forEach(el => {
      if (el !== element) el.isCollapse = true;
    });
    element.isCollapse = !element.isCollapse;
    this.isCollapse = element.isCollapse;
    this.getColumns();
    if (!this.isCollapse) {
      this.activeDate = element['Date & Time'];
      this.showDetailsTable.emit(this.activeDate);
    } else {
      this.activeDate = '';
    }
  }

  async handleChange() {
    await this.indexedDB.setItem(this.storageKey, this.visibleColumns);
    this.updateVisible();
  }

  async updateVisible() {
    const activeColumns = this.isCollapse ? this.tableColumns : this.billingTableColumns;

    if (!activeColumns || activeColumns.length === 0) {
      this.errorMsg = false;
      if (this.isCollapse) {
        this.columnsToDisplay = [];
      } else {
        this.billingColumnsToDisplay = [];
      }
      return;
    }
    this.errorMsg = true;

    const storedColumns = await this.indexedDB.getItem<any>(this.storageKey);
    const hasStoredData = storedColumns && Object.keys(storedColumns).length > 0;

    activeColumns.forEach((column: any) => {
      if (this.visibleColumns[column] === undefined) {
        this.visibleColumns[column] = true;
      }
    });

    if (hasStoredData) {
      const hasNewColumns = activeColumns.some((col: any) => !(col in storedColumns));
      if (hasNewColumns) {
        await this.indexedDB.setItem(this.storageKey, this.visibleColumns);
      }
    }

    const filteredColumns = activeColumns.filter((col: any) => this.visibleColumns[col] !== false);

    if (this.isCollapse) {
      this.columnsToDisplay = filteredColumns;
    } else {
      this.billingColumnsToDisplay = filteredColumns;
    }
  }

  async getColumns() {
    const activeColumns = this.isCollapse ? this.tableColumns : this.billingTableColumns;

    const storedColumns = await this.indexedDB.getItem<any>(this.storageKey);

    if (storedColumns && Object.keys(storedColumns).length > 0) {
      this.visibleColumns = storedColumns;
    } else if (activeColumns?.length > 0) {
      this.visibleColumns = activeColumns.reduce((acc: any, col: any) => {
        acc[col] = true;
        return acc;
      }, {});

      await this.indexedDB.setItem(this.storageKey, this.visibleColumns);
    }

    this.updateVisible();
  }

  get storageKey() {
    return this.isCollapse
      ? this.tableUsedComponent + '_main'
      : this.tableUsedComponent + '_billing';
  }
}