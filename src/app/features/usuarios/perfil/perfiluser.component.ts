import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-perfiluser',
  imports: [],
  templateUrl: './perfiluser.component.html',
  styleUrl: './perfiluser.component.css'
})
export class PerfiluserComponent implements OnInit{

  private authService: AuthService = inject(AuthService);

  ngOnInit(): void {
      
  }

}
