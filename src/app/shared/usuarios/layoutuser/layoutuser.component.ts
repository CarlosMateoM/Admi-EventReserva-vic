import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbaruserComponent } from '../navbaruser/navbaruser.component';

@Component({
  selector: 'app-layoutuser',
  imports: [RouterOutlet, NavbaruserComponent ],
  templateUrl: './layoutuser.component.html',
  styleUrl: './layoutuser.component.css'
})
export class LayoutuserComponent {

}
