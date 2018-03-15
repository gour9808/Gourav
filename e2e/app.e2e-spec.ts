import { CarbookDataManagerPage } from './app.po';

describe('carbook-data-manager App', () => {
  let page: CarbookDataManagerPage;

  beforeEach(() => {
    page = new CarbookDataManagerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
