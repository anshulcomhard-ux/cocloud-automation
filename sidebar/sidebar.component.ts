import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ToggleService } from '../../core/services/toggle.service';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { WalletService } from '../../core/services/wallet.service';
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {
  partnerDetail: any = []
  ngOnInit(): void {
    this.toggleService.sideBar$.subscribe((isToggle) => {
      this.sidebarToggle = isToggle
    })

    this.currentSection = this.router.url;
    this.manageRoute()
    this.WalletService.profileDetails$.subscribe((partner: any) => {
      this.partnerDetail = partner;
      localStorage.setItem('domainName', partner?.branding?.domainName)
    });
  }
  sidebarItems = [{
    title: 'Dashboard',
    link: '',
    icon: 'bi bi-grid-fill',
    id: 1,
  }, {
    title: 'Customer',
    link: '/customer',
    icon: 'bi bi-person-fill',
    id: 2,
  }, {
    title: 'Cloud User',
    link: '/cloud-user',
    icon: 'bi bi-people-fill',
    id: 3,
  }, {
    title: 'User & Roles',
    link: '/user-and-roles',
    icon: 'bi bi-person-bounding-box',
    id: 4,
  }, {
    title: 'Subscriptions',
    link: '/subscriptions',
    icon: 'bi bi-award menu',
    id: 5,
  }, {
    title: 'Branding',
    link: '/branding',
    icon: 'bi bi-tags-fill',
    id: 6,
  }, {
    title: 'Google Drive',
    link: '/google-drive',
    icon: 'fa-brands fa-google-drive mt-1',
    id: 7,
  }, {
    title: 'Billing',
    link: '/billing',
    icon: 'bi bi-receipt',
    id: 8,
  },
  {
    title: 'Audit Log',
    link: '/audit-logs',
    icon: 'bi bi-info-square-fill',
    id: 9,
  },
  {
    title: 'License Details',
    link: '/license-details',
    icon: 'bi bi-briefcase-fill',
    id: 10,
  },
  {
    title: 'Knowledge Base',
    link: 'https://docs.partners.cocloud.in/',
    icon: 'bi bi-lightbulb-fill',
    isknowledgeBase: true,
    id: 11,
  },
  {
    title: 'Service Request',
    subItems: [{
      title: 'All Requests',
      link: '/service-request/all-requests',
      id: 1,
    }, {
      title: 'Raise Request',
      link: '/service-request/raise-service-request',
      id: 2,
    }],
    icon: 'bi bi-list-ol',
    id: 12,
    link: '/service-request',
  },
  {
    title: 'Reports',
    subItems: [{
      title: 'MRR Report',
      link: '/reports/mrr-report',
      id: 1,
    }, {
      title: 'Salesperson Report',
      link: '/reports/salesman-report',
      id: 2,
    }, {
      title: 'RM Report',
      link: '/reports/rm-report',
      id: 3,
    }],
    icon: 'bi-graph-up-arrow',
    id: 13,
    link: '/Reports',
  },
  {
    title: 'Settings',
    link: '/setting',
    icon: "bi bi-gear",
    id: 14,
  }
  ]
  sidebarToggle: boolean = false
  currentSection: any
  currentSubSection: any
  toggleSubItem: boolean = false
  currentUrl: any
  constructor(public toggleService: ToggleService, private router: Router, private route: ActivatedRoute, private WalletService: WalletService) { }

  showItem(item: any) {
    if (item.title == 'Dashboard') {
      return this.isPartnerSalesman;
    } else if (item.title == 'Customer' || item.title == 'User & Roles' || item.title == 'Audit Log') {
      return this.userType;
    } else if (item.title == 'Branding' || item.title == 'Google Drive' || item.title == 'Billing') {
      return this.isSubUser;
    } else if (item.title == 'License Details') {
      return this.getPartnerId && this.getRole != 'salesPerson';
    } else if (item.title == 'Knowledge Base') {
      return this.getRole != 'salesPerson' && this.partnerDetail?.portalFunctionality?.showKnowledgeBase;
    } else if (item.title == 'Service Request') {
      return this.partnerDetail?.portalFunctionality?.showTicketWindow;
    }
    else if (item.title == 'All Requests' || item.title == 'Raise Request') {
      return this.partnerDetail?.portalFunctionality?.showTicketWindow;
    }
    else if (item.title == 'Reports') {
      return this.getPartnerId;
    }
    else if (item.title == 'MRR Report') {
      return this.getPartnerId;
    } else if (item.title == 'Salesperson Report') {
      return this.userType || (!this.userType && this.getRole != 'relationshipManager');
    } else if (item.title == 'RM Report') {
      return this.userType || (!this.userType && this.getRole != 'salesPerson' && this.getRole != 'salesPersonManager');
    } else if (item.title == 'Settings') {
      return this.userType;
    } else {
      return true;
    }
  }

  getVisibleSubItemsCount(subItems: any[]) {
    let count = 0;
    subItems.forEach((subItem: any) => {
      if (this.showItem(subItem)) {
        count++;
      }
    });
    return count;
  }

  manageRoute() {
    this.sidebarItems.map((item: any) => {
      if (this.currentSection.includes(item.link)) {
        this.currentSection = item.link
      }
      if (item.subItems) {
        item.subItems.map((subItem: any) => {
          if (this.currentSection.includes(subItem.link)) {
            this.openDropdown(item.link)
            this.changeSubSection(subItem.link)
          }
        })
      }
    })
  }

  changeSubSection(item: any) {
    this.currentSubSection = item
  }

  openDropdown(link: any) {
    if (this.currentSection == link) {
      this.currentSection = ''
    } else {
      this.currentSection = link
    }
  }

  resetSections(item: any) {
    if (item.isknowledgeBase) {
      window.open(item.link, '_blank');
      return;
    }
    this.currentSection = '';
    this.currentSubSection = ''
  }

  get getRole() {
    return localStorage.getItem('role')
  }

  get getPartnerId() {
    return localStorage.getItem('partnerId') == '645a4eca8c6428e9ac655957' ? true : false
  }

  get userType() {
    return localStorage.getItem('isSalesman') == 'true' ? false : true
  }

  get isSubUser() {
    const value = localStorage.getItem('partnerType');
    return value === 'subUser' ? false : true;
  }

  get isPartnerSalesman() {
    const userType = localStorage.getItem('isSalesman') == 'true' ? true : false
    const partnerType = localStorage.getItem('partnerType');
    const partnerId = localStorage.getItem('partnerId')
    if (userType && partnerId != '645a4eca8c6428e9ac655957' && partnerType == 'subUser') {
      return false
    } else {
      return true
    }
  }

  getTotalItems(subItems: any) {
    let count = 0;
    subItems.map((subItem: any) => {
      if (subItem.condition) {
        count++;
      }
    })
    return count;
  }
}


