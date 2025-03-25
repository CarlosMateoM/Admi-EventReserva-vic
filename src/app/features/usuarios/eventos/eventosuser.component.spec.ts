import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventosuserComponent } from './eventosuser.component';

describe('EventosuserComponent', () => {
  let component: EventosuserComponent;
  let fixture: ComponentFixture<EventosuserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventosuserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventosuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
