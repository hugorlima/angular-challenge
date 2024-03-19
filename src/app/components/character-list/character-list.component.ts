import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-character-list',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule],
  templateUrl: './character-list.component.html',
  styleUrl: './character-list.component.scss',
})
export class CharacterListComponent implements OnInit {
  public heroes: any[] = [];
  public storageKey: string = 'heroes';
  public loading: boolean = false;

  constructor(
    private apiService: ApiService,
    private storageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.getHeroes();
    this.loading = true;
  }

  getHeroes(): void {
    this.apiService.fetchCharacters().subscribe((res) => {
      this.heroes =
        this.storageService.getLocalStorageItems(this.storageKey) || res;
    });
  }

  localStorageIsEmpty() {
    return (
      this.storageService.getLocalStorageItems(this.storageKey) &&
      this.storageService.getLocalStorageItems(this.storageKey) !== 'null' &&
      this.storageService.getLocalStorageItems(this.storageKey) !== 'undefined'
    );
  }

  saveItems() {
    this.storageService.setLocalStorageItems(this.storageKey, this.heroes);
  }

  addItem(item: any) {
    this.heroes.push(item);
    this.saveItems();
  }

  updateItem(item: any, changes: any) {
    const index = this.heroes.indexOf(item);
    this.heroes[index] = { ...item, ...changes };
    this.saveItems();
  }

  deleteItem(item: string) {
    const index = this.heroes.indexOf(item);
    this.heroes.splice(index, 1);
    this.saveItems();
  }
}
