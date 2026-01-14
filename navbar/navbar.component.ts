import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ToggleService } from '../../core/services/toggle.service';
import { MatTooltipModule } from '@angular/material/tooltip';
import { WalletService } from '../../core/services/wallet.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ModalComponent } from '../modal/modal.component';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HeaderSearchComponent } from '../header-search/header-search.component';
import { ThemeToggleComponent } from '../theme-toggle/theme-toggle.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, MatTooltipModule, HeaderSearchComponent, ThemeToggleComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  isSidebarToggle: boolean = false
  walletAmount: any
  userName: any
  bsModalRef !: BsModalRef
  constructor(public toggleService: ToggleService, private walletService: WalletService, private modalService: BsModalService, private router: Router, private toasterService: ToastrService) { }

  ngOnInit(): void {
    this.toggleService.sideBar$.subscribe((isToggle) => {
      this.isSidebarToggle = isToggle
    })

    this.walletService.walletAmount$.subscribe((wallet_amount) => {
      this.walletAmount = wallet_amount
    })
    this.userName = localStorage.getItem('userName')
  }

  sidebarToggle() {
    this.isSidebarToggle = !this.isSidebarToggle;
    this.toggleService.setSideBarToggle(this.isSidebarToggle)
  }

  logout() {
    this.bsModalRef = this.modalService.show(ModalComponent, {
      class: 'modal-sm',
      backdrop: 'static'
    })
    this.bsModalRef.content.title = 'Log out ?';
    this.bsModalRef.content.message = "Are you sure you want to logout ?"
    this.bsModalRef.content.confirmText = 'Yes';
    this.bsModalRef.content.cancelText = 'No'
    this.bsModalRef.content.formUsedComponent = 'modal'

    this.bsModalRef.content.event.subscribe((res: any) => {
      if (res == 'ok') {
        this.router.navigateByUrl('/login')
        this.toasterService.success('Logout Successfully')
        this.bsModalRef.hide()
        this.clearLocalStorage()
      }
    })
  }

  clearLocalStorage() {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    localStorage.removeItem('email');
    localStorage.removeItem('partnerId');
    localStorage.removeItem('partnerType')

  }
  settings() {
    this.router.navigateByUrl('/setting')
  }

  get userType() {
    return localStorage.getItem('isSalesman') == 'true' ? false : true
  }
}
