import { Routes } from '@angular/router';
import { CharacterListComponent } from './components/character-list/character-list.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';

export const routes: Routes = [
  { path: '', redirectTo: 'lista-de-herois', pathMatch: 'full' },
  { path: 'lista-de-herois', component: CharacterListComponent },
  { path: '**', component: PageNotFoundComponent },
];
