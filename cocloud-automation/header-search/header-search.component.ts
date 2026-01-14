import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, Subject, switchMap } from 'rxjs';
import { GlobalSearchService, SearchResult } from '../../core/services/global-search.service';

@Component({
  selector: 'app-header-search',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './header-search.component.html',
  styleUrl: './header-search.component.css'
})
export class HeaderSearchComponent implements OnInit {
  @Input() scope: 'admin' | 'partner' = 'partner';
  @ViewChild('searchInput') searchInput!: ElementRef;
  
  searchControl = new FormControl('');
  searchResults: SearchResult[] = [];
  showResults: boolean = false;
  isLoading: boolean = false;
  selectedIndex: number = -1;
  selectedCategory: string = 'all';
  private searchSubject = new Subject<string>();

  categories = [
    { type: 'subscription', label: 'Subscriptions', icon: 'bi-receipt' },
    { type: 'customer', label: 'Customers', icon: 'bi-person' }
  ];

  constructor(
    private globalSearchService: GlobalSearchService,
    private router: Router,
    private elementRef: ElementRef
  ) {}

  ngOnInit(): void {
    // Setup search with debounce
    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(value => {
      if (value && value.length >= 3) {
        this.searchSubject.next(value);
      } else {
        this.searchResults = [];
        this.showResults = false;
        this.selectedIndex = -1;
      }
    });

    // Perform search
    this.searchSubject.pipe(
      switchMap(query => {
        this.isLoading = true;
        return this.globalSearchService.globalSearch(query, this.scope);
      })
    ).subscribe({
      next: (response) => {
        this.isLoading = false;
        if (response.success) {
          this.searchResults = response.data || [];
          this.showResults = this.searchResults.length > 0;
          this.selectedIndex = -1;
          this.selectedCategory = 'all';
        } else {
          this.searchResults = [];
          this.showResults = false;
        }
      },
      error: (error) => {
        this.isLoading = false;
        this.searchResults = [];
        this.showResults = false;
      }
    });
  }

  get filteredResults(): SearchResult[] {
    if (this.selectedCategory === 'all') {
      return this.searchResults;
    }
    return this.searchResults.filter(r => r.type === this.selectedCategory);
  }

  selectCategory(category: string): void {
    this.selectedCategory = category;
    this.selectedIndex = -1;
  }

  getCategoryCount(type: string): number {
    return this.searchResults.filter(r => r.type === type).length;
  }

  getTotalCount(): number {
    return this.searchResults.length;
  }

  getResultsHeader(): string {
    if (this.selectedCategory === 'all') {
      return 'All search results';
    }
    const category = this.categories.find(c => c.type === this.selectedCategory);
    return category ? category.label : 'Search results';
  }

  highlightSearchTerm(text: string): string {
    if (!this.searchControl.value || !text) return text;
    const term = this.searchControl.value;
    const regex = new RegExp(`(${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
  }

  onSearchFocus(): void {
    if (this.searchControl.value && this.searchControl.value.length >= 3 && this.searchResults.length > 0) {
      this.showResults = true;
    }
  }

  clearSearch(): void {
    this.searchControl.setValue('');
    this.searchResults = [];
    this.showResults = false;
    this.selectedIndex = -1;
    this.selectedCategory = 'all';
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    // Cmd+K or Ctrl+K to focus search
    if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
      event.preventDefault();
      this.searchInput.nativeElement.focus();
      this.searchInput.nativeElement.select();
    }

    // Handle navigation when dropdown is open
    if (this.showResults && this.filteredResults.length > 0) {
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        this.selectedIndex = Math.min(this.selectedIndex + 1, this.filteredResults.length - 1);
        this.scrollToSelected();
      } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        this.selectedIndex = Math.max(this.selectedIndex - 1, -1);
        this.scrollToSelected();
      } else if (event.key === 'Enter' && this.selectedIndex >= 0) {
        event.preventDefault();
        this.navigateToResult(this.filteredResults[this.selectedIndex]);
      } else if (event.key === 'Escape') {
        this.closeResults();
      }
    }
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.closeResults();
    }
  }

  onResultClick(result: SearchResult): void {
    this.navigateToResult(result);
  }

  onResultMouseEnter(index: number): void {
    this.selectedIndex = index;
  }

  navigateToResult(result: SearchResult): void {
    this.closeResults();
    this.searchControl.setValue('', { emitEvent: false });
    
    // Navigate to detail page based on type
    if (result.type === 'subscription') {
      this.router.navigate(['/subscriptions/subscriptions-details'], { 
        queryParams: { subId: result.data.code } 
      });
    } else if (result.type === 'customer') {
      this.router.navigate(['/customer'], { 
        queryParams: { customerId: result.id } 
      });
    }
  }

  closeResults(): void {
    this.showResults = false;
    this.selectedIndex = -1;
  }

  scrollToSelected(): void {
    if (this.selectedIndex >= 0) {
      const element = document.getElementById(`search-result-${this.selectedIndex}`);
      if (element) {
        element.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }
    }
  }

  getTypeLabel(type: string): string {
    const labels: { [key: string]: string } = {
      'subscription': 'Subscription',
      'customer': 'Customer',
      'partner': 'Partner',
      'user': 'User'
    };
    return labels[type] || type;
  }

  getTypeIcon(type: string): string {
    const icons: { [key: string]: string } = {
      'subscription': 'bi-receipt',
      'customer': 'bi-person',
      'partner': 'bi-building',
      'user': 'bi-person-badge'
    };
    return icons[type] || 'bi-search';
  }
}
