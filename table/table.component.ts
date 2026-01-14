import { Component, EventEmitter, inject, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SelectionModel } from '@angular/cdk/collections';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Router, RouterLink } from '@angular/router';
import { DashboardService } from '../../core/services/dashboard.service';
import { IndexedDbService } from '../../core/services/indexed-db.service';
import { FormsModule } from '@angular/forms';
import { WalletService } from '../../core/services/wallet.service';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatTooltipModule, MatCheckboxModule, MatSortModule, RouterLink, FormsModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent implements OnChanges {
  userType = localStorage.getItem('isSalesman') == 'true' ? true : false
  constructor(private dashboardService: DashboardService, private router: Router, private indexedDB: IndexedDbService, private walletService: WalletService) { }
  private _liveAnnouncer = inject(LiveAnnouncer);
  @Input() tableColumns: any
  @Input() data: any[] = []
  @Input() isExcel: any
  @Input() columnsToDisplay: any
  @Input() tableUsedComponent = ''
  @Input() clearSelection: boolean = false
  @Input() dataConfig: any
  @Input() params: any
  @Input() partnerDetail: any
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort!: MatSort;
  @Output() updateConfig = new EventEmitter<any>()
  @Output() showDetailsTable = new EventEmitter<any>()
  @Output() export = new EventEmitter<any>()
  @Output() redirection = new EventEmitter<any>()
  @Input() extraBtnDetails: any[] = []
  selectedRowIds: any[] = []
  @Output() sendSelectedIds = new EventEmitter<any>()
  dataSource: MatTableDataSource<any> = new MatTableDataSource();

  @Output() sortChange = new EventEmitter<{ column: string }>();

  visibleColumns: { [key: string]: boolean } = {};
  length = 20;
  pageSize = 20;
  pageIndex = 0;
  pageSizeOptions = [20, 50, 100, 200, 500];

  ascending: boolean = true;

  pageEvent: PageEvent | undefined;
  selection = new SelectionModel<any>(true, []);

  async ngOnInit() {
    await this.getColumns()
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.dataSource.data = this.data?.map(item => ({
        ...item
      }));
    }

    if (changes['clearSelection'] && this.clearSelection == true) {
      this.selection.clear()
      this.selectedRowIds = []
    }

    if (changes['dataConfig'] && this.dataConfig) {
      if (this.paginator && this.dataConfig.currentPage) {
        this.pageIndex = this.dataConfig.currentPage - 1;
        this.paginator.pageIndex = this.pageIndex;
      }
      if (this.paginator && this.dataConfig.itemsPerPage) {
        this.pageSize = this.dataConfig.itemsPerPage;
        this.paginator.pageSize = this.pageSize;
      }
    }

    this.getColumns();
    this.updateVisible();
  }

  isString(value: any, column: any) {
    if (typeof value !== 'string' && column == 'amount') {
      return false
    }
    return true
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    if (this.paginator) {
      this.paginator.pageIndex = this.pageIndex;
      this.paginator.pageSize = this.pageSize;
    }
    this.updateConfig.emit({
      itemsPerPage: this.pageSize,
      currentPage: this.pageIndex + 1,
      totalItems: this.dataConfig.totalItems
    })
  }

  getDomainName() {
    return localStorage.getItem('domainName')
  }

  isAllSelected(): boolean {
    const numSelected = this.dataSource.data.filter(row =>
      this.selectedRowIds.includes(row._id)
    ).length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  toggleAllRows(): void {
    if (this.isAllSelected()) {
      this.dataSource.data.forEach(row => {
        this.selectedRowIds = this.selectedRowIds.filter(id => id !== row._id);
        this.selection.deselect(row);
        this.sendSelectedIds.emit({ type: 'remove', id: row._id });
      });
    } else {
      this.dataSource.data.forEach(row => {
        if (!this.selectedRowIds.includes(row._id)) {
          this.selectedRowIds.push(row._id);
          this.selection.select(row);
          this.sendSelectedIds.emit({ type: 'add', id: row._id });
        }
      });
    }
  }
  checkboxLabel(row: any): void {
    if (this.selection.isSelected(row)) {
      if (!this.selectedRowIds.includes(row._id)) {
        this.selectedRowIds.push(row._id);
      }
      this.sendSelectedIds.emit({ type: 'add', id: row._id });
    } else {
      this.selectedRowIds = this.selectedRowIds.filter(id => id !== row._id);
      this.sendSelectedIds.emit({ type: 'remove', id: row._id });
    }
  }

  exportExcel() {
    this.export.emit({ data: this.data })
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  onSort(column: string) {
    this.sortChange.emit({ column: column });
  }

  isDateColumn(column: string): boolean {
    return !['Message', 'index'].includes(column);
  }

  onDateClick(message: string, column: string) {
    this.showDetailsTable.emit({
      message,
      date: column
    });
  }

  sendSubIds(subIds: any) {
    if (subIds.length > 0) {
      this.dashboardService.setSubIds(subIds)
      this.router.navigate(['subscriptions']);
    }
  }

  triggerFunc(func: any, params: any) {
    if (func) {
      func(params)
    }
  }

  redirect(element: any, column: any) {
    if (this.tableUsedComponent == 'customer') {
      if (column == 'Company' || column == 'Email') {
        this.redirection.emit({ data: element, column: column })
      }
    }
  }

  async getColumns() {
    const storedColumns = await this.indexedDB.getItem<any>(this.tableUsedComponent);
    if (storedColumns && Object.keys(storedColumns).length > 0) {
      this.visibleColumns = storedColumns;
    } else if (this.tableColumns?.length > 0) {
      this.visibleColumns = this.tableColumns.reduce((acc: any, col: any) => {
        acc[col] = true;
        return acc;
      }, {} as { [key: string]: boolean });

      await this.indexedDB.setItem(this.tableUsedComponent, this.visibleColumns);
    }
    this.updateVisible();
  }

  async updateVisible() {
    if (!this.tableColumns || this.tableColumns.length === 0) {
      this.columnsToDisplay = [];
      return;
    }

    const storedColumns = await this.indexedDB.getItem<any>(this.tableUsedComponent);
    const hasStoredData = storedColumns && Object.keys(storedColumns).length > 0;

    this.tableColumns.forEach((column: any) => {
      if (this.visibleColumns[column] === undefined) {
        this.visibleColumns[column] = true;
      }
    });

    if (hasStoredData) {
      const hasNewColumns = this.tableColumns.some((col: any) => !(col in storedColumns));
      if (hasNewColumns) {
        await this.indexedDB.setItem(this.tableUsedComponent, this.visibleColumns);
      }
    }

    this.columnsToDisplay = this.tableColumns.filter((column: any) => {
      return this.visibleColumns[column] !== false;
    });
    if (['customer', 'subscription'].includes(this.tableUsedComponent)) this.columnsToDisplay = ['select', ...this.columnsToDisplay]
    if (['dashboard', 'cloud-user-details', 'google-drive'].includes(this.tableUsedComponent)) this.columnsToDisplay = ['index', ...this.columnsToDisplay]
  }

  async handleChange() {
    await this.indexedDB.setItem(this.tableUsedComponent, this.visibleColumns);
    this.updateVisible();
  }

  isHeadersSelected(): boolean {
    const bypassColumns = ['S. No.', 'Action', 'index', 'select', '#'];
    const dataColumns = this.columnsToDisplay.filter((col: any) => !bypassColumns.includes(col));
    return dataColumns.length === 0;
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

  getCellClass(column: string, value: any): string {
    if (column === 'Status' && this.tableUsedComponent != 'google-drive-schedulerLogs') return value ? 'active' : 'inactive';
    if (column === 'Set For') return value === 'Auto Expire' ? 'inactive' : 'active';
    if (value === 'create' || value === 'delete' || value === 'update') return value;
    if ((column === 'Company' || (column === 'Email' && this.partnerDetail?.portalFunctionality?.redirectToCustomerPortal)) && this.tableUsedComponent == 'customer') return 'sub-link'
    return '';
  }

  isOptionVisible(option: string): boolean {
    const commonExclusions = ['S. No.', 'Action', '#'];
    if (commonExclusions.includes(option)) return false;

    if (this.tableUsedComponent === 'customer') {
      const customerExclusions = ['Email', 'Company'];
      if (customerExclusions.includes(option)) return false;
    }

    if (this.tableUsedComponent === 'subscription') {
      const subscriptionExclusions = ['Sub Id', 'Company Name'];
      if (subscriptionExclusions.includes(option)) return false;
    }

    return true;
  }

  getInfoMessage(column: any) {
    if (this.tableUsedComponent == 'customer' && column == 'Company') return "Click on Customer's Company name to view the subscription list."
    if (this.tableUsedComponent == 'customer' && column == 'Email' && this.partnerDetail?.portalFunctionality?.redirectToCustomerPortal) return "Click on Customer's Email to Login directly in Customer Account."
    if (this.tableUsedComponent == 'cloud-user' && column == 'Sub Id') return "Click on Sub Id to view the Cloud User Details."
    if ((this.tableUsedComponent == 'subscription' || this.tableUsedComponent == 'license-details' || this.tableUsedComponent == 'google-drive-schedulerLogs' || this.tableUsedComponent == 'all-service-request') && column == 'Sub Id') return "Click on Sub Id to view the Subscription Details."
    if (this.tableUsedComponent == 'customer' && column == '#') return "Select a checkbox to assign a label to the customer."
    return ''
  }
}