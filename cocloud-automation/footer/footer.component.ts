import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { WalletService } from '../../core/services/wallet.service';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, FormsModule, NgIf],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  currentYear: any
  partnerDetail: any = []

  constructor(private walletService: WalletService) { }

  ngOnInit(): void {
    this.currentYear = new Date().getFullYear()
    this.profileDetails()
  }

  profileDetails() {
    this.walletService.getProfileDetails().subscribe( {
      next: (res: any) => {
        this.walletService.changeProfileDetails(res?.partner)
        this.walletService.setBillingDetails(res?.partner?.billing, res?.partner?.branding)
        this.walletService.updateSubjects(res?.partner)
        this.partnerDetail = res?.partner;
      }
    });
  }

}
