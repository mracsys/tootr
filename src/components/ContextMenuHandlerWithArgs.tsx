import type { MouseEventHandler, TouchEventHandler } from 'react';

const longPressDuration = 300;

export type ContextCallback = (args: ArgDestructure) => void;
export interface ArgDestructure { [key: string]: string | number | boolean | string[] };

export default class ContextMenuHandlerWithArgs {
  private longPressCountdown: ReturnType<typeof setTimeout> | null;
  protected contextMenuPossible: boolean;

  constructor(
    public callback: ContextCallback,
    public args: ArgDestructure,
  ) {
    this.longPressCountdown = null;
    this.contextMenuPossible = false;
  }

  onTouchStart: TouchEventHandler = () => {
    this.contextMenuPossible = true;

    this.longPressCountdown = setTimeout(() => {
      this.contextMenuPossible = false;
      this.callback(this.args);
    }, longPressDuration);
  };

  onTouchMove: TouchEventHandler = () => {
    if (!!(this.longPressCountdown))
      clearTimeout(this.longPressCountdown);
  };

  onTouchCancel: TouchEventHandler = () => {
    this.contextMenuPossible = false;
    if (!!(this.longPressCountdown))
      clearTimeout(this.longPressCountdown);
  };

  onTouchEnd: TouchEventHandler = () => {
    this.contextMenuPossible = false;
    if (!!(this.longPressCountdown))
      clearTimeout(this.longPressCountdown);
  };

  onContextMenu: MouseEventHandler = (e) => {
    e.stopPropagation();
    this.contextMenuPossible = false;

    if (!!(this.longPressCountdown))
      clearTimeout(this.longPressCountdown);

    this.callback(this.args);
    e.preventDefault();
  };
}