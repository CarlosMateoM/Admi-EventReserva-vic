import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-alert',
  imports: [CommonModule],
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnChanges {
  @Input() message: string = '';
  @Input() alertType: 'success' | 'error' | 'warning' | 'info' = 'info';
  alertClass: string = '';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['alertType']) {
      this.setAlertClass();
    }
  }

  setAlertClass(): void {
    switch (this.alertType) {
      case 'success':
        this.alertClass = 'bg-green-100 border-green-400 text-green-700';
        break;
      case 'error':
        this.alertClass = 'bg-red-100 border-red-400 text-red-700';
        break;
      case 'warning':
        this.alertClass = 'bg-yellow-100 border-yellow-400 text-yellow-700';
        break;
      case 'info':
      default:
        this.alertClass = 'bg-blue-100 border-blue-400 text-blue-700';
        break;
    }
  }

  closeAlert(): void {
    this.message = '';
  }
}