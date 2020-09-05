import { TestBed } from '@angular/core/testing';

import { AddBookService } from './books/add-book/add-book.service';

describe('AddBookService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddBookService = TestBed.get(AddBookService);
    expect(service).toBeTruthy();
  });
});
