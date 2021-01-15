import { TestBed } from '@angular/core/testing';

import { ChiefEditorService } from './chief-editor.service';

describe('ChiefEditorService', () => {
  let service: ChiefEditorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChiefEditorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
