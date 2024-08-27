import { TestBed } from '@angular/core/testing';

import { LocalStorageService } from './local-storage.service';
import {MockStore, provideMockStore} from "@ngrx/store/testing";
import {AppState} from "../../../core/app.state";
import {selectTodos} from "../../../core/todo-store/todo.selectors";

describe('LocalStorageService', () => {
  let service: LocalStorageService;
  let store: MockStore<AppState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [],
      providers: [
        provideMockStore({
          selectors: [
            {
              selector: selectTodos, value: [{
                id: "632531de-74e5-4cb8-9951-80859cb5593f", title: "task6", description: "aa", state: "InProgress",
                endDate: "2024-08-29T22:00:00.000Z", startDate: ""
              }]
            }, // Mock selector value
          ],
        })
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
