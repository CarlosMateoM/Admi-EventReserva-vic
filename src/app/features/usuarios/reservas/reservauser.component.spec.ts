import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservauserComponent } from './reservauser.component';

describe('ReservauserComponent', () => {
  let component: ReservauserComponent;
  let fixture: ComponentFixture<ReservauserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservauserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservauserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
