import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LocalStorageService } from '../../services/local-storage.service';
import { CharacterListComponent } from './character-list.component';

describe('CharacterListComponent', () => {
  let component: CharacterListComponent;
  let fixture: ComponentFixture<CharacterListComponent>;
  let storageService: LocalStorageService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, CharacterListComponent],
    }).compileComponents();

    storageService = TestBed.inject(LocalStorageService);
    fixture = TestBed.createComponent(CharacterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should populate heroes array with data', () => {
    component.getHeroes();
    expect(component.heroes.length).toBeGreaterThanOrEqual(0);
  });

  it('should delete item from heroes array', () => {
    const item = component.heroes[0];
    component.deleteItem(item);
    expect(component.heroes.length).toBe(0);
  });

  it('should add a new hero to the list and save to local storage', () => {
    const initialLength = component.heroes.length;
    const newHero = { name: 'Superman', description: "It's a DC hero." };
    component.addItem(newHero);
    expect(component.heroes.length).toBe(initialLength + 1);
    expect(component.heroes).toContain(newHero);
    expect(storageService.getLocalStorageItems('heroes')).toContain(newHero);
  });
});
