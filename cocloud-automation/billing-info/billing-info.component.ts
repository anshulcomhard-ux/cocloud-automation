import { Component, Input, OnInit } from '@angular/core';
import { WalletService } from '../../core/services/wallet.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-billing-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './billing-info.component.html',
  styleUrl: './billing-info.component.css'
})
export class BillingInfoComponent implements OnInit {
  @Input() billingFields: any[] = []
  data: any
  constructor(private walletService: WalletService, private router: Router) { }
  ngOnInit(): void {
    this.walletService.getProfileDetails().subscribe({
      next: (res: any) => {
        this.walletService.setBillingDetails(res?.partner?.billing, res?.partner?.branding)
        this.walletService.changeProfileDetails(res?.partner)
        this.walletService.billingDetails$.subscribe((billDetails: any) => {
          this.data = billDetails
        })
      }
    })
  }

  get role(){
    const role = localStorage.getItem('role')
    return role == 'undefined'
  }

  editForm() {
    this.router.navigateByUrl('/billing/billing-details')
  }
}
