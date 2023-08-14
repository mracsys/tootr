import type { MouseEvent, MouseEventHandler, TouchEventHandler, TouchEvent } from 'react';

const longPressDuration = 300;

export default class ContextMenuHandler {
  private longPressCountdown: ReturnType<typeof setTimeout> | null;
  protected contextMenuPossible: boolean;

  constructor(
    public callback: (t: HTMLDivElement, data: string | null) => void,
  ) {
    this.longPressCountdown = null;
    this.contextMenuPossible = false;
  }

  onTouchStart: TouchEventHandler<HTMLDivElement> = (e) => {
    this.contextMenuPossible = true;

    const touch = e.currentTarget;
    const source = e.currentTarget.getAttribute('data-source');

    this.longPressCountdown = setTimeout(() => {
      this.contextMenuPossible = false;
      this.callback(touch, source);
    }, longPressDuration);
  };

  onTouchMove: TouchEventHandler<HTMLDivElement> = (e) => {
    if (!!(this.longPressCountdown))
      clearTimeout(this.longPressCountdown);
  };

  onTouchCancel: TouchEventHandler<HTMLDivElement> = (e) => {
    this.contextMenuPossible = false;
    if (!!(this.longPressCountdown))
      clearTimeout(this.longPressCountdown);
  };

  onTouchEnd: TouchEventHandler<HTMLDivElement> = (e) => {
    this.contextMenuPossible = false;
    if (!!(this.longPressCountdown))
      clearTimeout(this.longPressCountdown);
  };

  onContextMenu: MouseEventHandler<HTMLDivElement> = (e) => {
    this.contextMenuPossible = false;

    if (!!(this.longPressCountdown))
      clearTimeout(this.longPressCountdown);

    this.callback(e.currentTarget, e.currentTarget.getAttribute('data-source'));
    e.preventDefault();
  };
}