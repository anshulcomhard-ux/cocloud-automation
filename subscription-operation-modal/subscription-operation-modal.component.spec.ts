import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionOperationModalComponent } from './subscription-operation-modal.component';

describe('SubscriptionOperationModalComponent', () => {
  let component: SubscriptionOperationModalComponent;
  let fixture: ComponentFixture<SubscriptionOperationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubscriptionOperationModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubscriptionOperationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
