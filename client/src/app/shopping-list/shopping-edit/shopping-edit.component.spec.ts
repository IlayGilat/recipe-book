import {ComponentFixture, TestBed} from '@angular/core/testing';
import {FormsModule, NgForm} from '@angular/forms';
import {Store} from '@ngrx/store';
import {of} from 'rxjs';

import {ShoppingEditComponent} from './shopping-edit.component';
import {Ingredient} from '../../shared/ingredient.model';
import {AddIngredientAction} from '../store/shopping-list.actions';

// Mock Store
const mockStore = {
  dispatch: jest.fn(),
  select: jest.fn()
};

describe('ShoppingEditComponent', () => {
  let component: ShoppingEditComponent;
  let fixture: ComponentFixture<ShoppingEditComponent>;

  beforeEach(async () => {
    // Reset mock store before each test
    jest.clearAllMocks();
    mockStore.select.mockReturnValue(of({
      ingredients: [],
      editedItemIndex: -1,
      editedItem: null
    }));

    await TestBed.configureTestingModule({
      declarations: [ShoppingEditComponent],
      imports: [FormsModule],
      providers: [
        { provide: Store, useValue: mockStore }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ShoppingEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should add a new ingredient when not in edit mode', () => {
    // Create a form with test values
    const testForm = {
      value: {
        name: 'Apple',
        amount: 5
      },
      resetForm: jest.fn()
    } as unknown as NgForm;

    component.editMode = false;
    component.onAddItem(testForm);

    expect(mockStore.dispatch).toHaveBeenCalledWith(
      AddIngredientAction(new Ingredient('Apple', 5))
    );
  });
});