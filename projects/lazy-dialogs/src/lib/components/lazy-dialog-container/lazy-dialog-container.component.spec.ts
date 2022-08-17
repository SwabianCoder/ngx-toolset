import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { LAZY_DIALOG_CONTAINER_STYLES } from '../../injection-tokens';
import { LazyDialogContainerComponent } from './lazy-dialog-container.component';

describe('LazyDialogContainerComponent', () => {
  let spectator: Spectator<LazyDialogContainerComponent>;
  const createComponent = createComponentFactory({
    component: LazyDialogContainerComponent,
    providers: [{ provide: LAZY_DIALOG_CONTAINER_STYLES, useValue: {} }],
  });

  beforeEach(() => (spectator = createComponent()));

  it('creates instance', () => {
    expect(spectator.component).toBeTruthy();
    const dialogContainer = spectator.query('div.dialog-container');
    expect(dialogContainer).toBeTruthy();
    expect(dialogContainer?.childNodes.length).toBe(1);
  });
});
