import { TestBed } from '@angular/core/testing';

import { ViewModeService } from './view-mode.service';

describe('ViewModeService', () => {
  let service: ViewModeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ViewModeService],
    });
    service = TestBed.inject(ViewModeService);
  });

  it('should set table view', (done) => {
    service.setViewMode('table');

    service.viewMode().subscribe((viewMode) => {
      expect(viewMode).toEqual('table');
      done();
    });
  });

  it('should set grid view', (done) => {
    service.setViewMode('grid');

    service.viewMode().subscribe((viewMode) => {
      expect(viewMode).toEqual('grid');
      done();
    });
  });
});
