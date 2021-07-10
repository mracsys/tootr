const longPressDuration = 300;

export default class ContextMenuHandler {
  constructor(callback) {
    this.callback = callback;
    this.longPressCountdown = null;
    this.contextMenuPossible = false;
  }

  onTouchStart = e => {
    this.contextMenuPossible = true;

    const touch = e.currentTarget;
    const source = e.currentTarget.getAttribute('data-source');

    this.longPressCountdown = setTimeout(() => {
      this.contextMenuPossible = false;
      this.callback(touch, source);
    }, longPressDuration);
  };

  onTouchMove = e => {
    clearTimeout(this.longPressCountdown);
  };

  onTouchCancel = e => {
    this.contextMenuPossible = false;
    clearTimeout(this.longPressCountdown);
  };

  onTouchEnd = e => {
    this.contextMenuPossible = false;
    clearTimeout(this.longPressCountdown);
  };

  onContextMenu = e => {
    this.contextMenuPossible = false;

    clearTimeout(this.longPressCountdown);

    this.callback(e.currentTarget, e.currentTarget.getAttribute('data-source'));
    e.preventDefault();
  };
}