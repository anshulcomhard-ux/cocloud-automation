import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, Subject, switchMap } from 'rxjs';
import { SearchService } from '../../core/services/search.service';

@Component({
  selector: 'app-universal-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './universal-search.component.html',
  styleUrl: './universal-search.component.css'
})
export class UniversalSearchComponent implements OnInit {
  @ViewChild('searchInput') searchInput!: ElementRef;
  
  searchQuery: string = '';
  searchResults: any[] = [];
  showResults: boolean = false;
  isLoading: boolean = false;
  private searchSubject = new Subject<string>();

  constructor(
    private searchService: SearchService,
    private router: Router,
    private elementRef: ElementRef
  ) {}

  ngOnInit(): void {
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(query => {
        if (query && query.length >= 3) {
          this.isLoading = true;
          return this.searchService.universalSearch(query);
        } else {
          this.searchResults = [];
          this.showResults = false;
          return [];
        }
      })
    ).subscribe({
      next: (response: any) => {
        this.isLoading = false;
        if (response.success) {
          this.searchResults = response.data || [];
          this.showResults = this.searchResults.length > 0;
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

  onSearchChange(): void {
    if (this.searchQuery.length >= 3) {
      this.searchSubject.next(this.searchQuery);
    } else {
      this.searchResults = [];
      this.showResults = false;
    }
  }

  onResultClick(result: any): void {
    this.showResults = false;
    this.searchQuery = '';
    
    // Navigate based on result type
    if (result.type === 'subscription') {
      this.router.navigate(['/subscriptions'], { 
        queryParams: { subId: result.data.code } 
      });
    } else if (result.type === 'customer') {
      this.router.navigate(['/customer'], { 
        queryParams: { customerId: result.id } 
      });
    }
  }

  closeSearch(): void {
    this.showResults = false;
    this.searchQuery = '';
    this.searchResults = [];
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.showResults = false;
    }
  }

  getResultIcon(type: string): string {
    switch (type) {
      case 'subscription':
        return 'bi-receipt';
      case 'customer':
        return 'bi-person';
      default:
        return 'bi-search';
    }
  }
}

