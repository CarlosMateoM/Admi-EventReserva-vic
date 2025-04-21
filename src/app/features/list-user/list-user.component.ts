import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectLoading, selectUsers } from './store/listUser.selectors';
import { loadUsers } from './store/listUser.actions';
import { CommonModule } from '@angular/common';
import { User } from './interfaces/listUser.interface';

@Component({
  selector: 'app-list-user',
  imports: [CommonModule],
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit{

  private store: Store = inject(Store);

  users$ = this.store.select(selectUsers);
  loading$ = this.store.select(selectLoading);

  selectedUser: User | null = null;
  showModal: boolean = false;

  openModal(user: User): void {
    this.selectedUser = user;
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.selectedUser = null;
  }

  currentDate: string = '';
  
  ngOnInit(): void {
    this.currentDate = new Date().toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    this.store.dispatch(loadUsers({ force: true }));
  }
}