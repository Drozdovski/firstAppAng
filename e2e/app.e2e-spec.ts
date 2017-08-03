import { TaskManPage } from './app.po';

describe('task-man App', () => {
  let page: TaskManPage;

  beforeEach(() => {
    page = new TaskManPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
