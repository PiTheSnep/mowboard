import * as React from 'react';
import update from 'immutability-helper';
import { useDrop } from 'react-dnd';
import { Draggable } from './Draggable';

/**
 * A list of draggable things.
 */
export class List<T extends Draggable> extends React.Component<
  { children: T[] },
  { items: T[] }
> {
  state = {
    items: this.props.children
  };

  /**
   * Move an item to the given position of the list.
   * @param from
   * @param to
   */
  public moveItem(from: number, to: number): void {
    this._checkRange(from, to);

    this.setState({
      items: update(this.state.items, {
        $splice: [
          [from, 1],
          [to, 0, this.getItem(from)]
        ]
      })
    });
  }

  /**
   * Fetch the specified item at index `key`.
   */
  public getItem(key: number): T {
    this._checkRange(key);

    return this.state.items[key];
  }

  private _checkRange(...keys: number[]): void {
    for (const key of keys) {
      if (key >= this.state.items.length || key < 0) {
        throw Error('Invalid key access - is out of range.');
      }
    }
  }

  public render(): JSX.Element {
    const [a, drop] = useDrop({ accept: 'draggable' });

    return <div ref={drop}>{this.state.items}</div>;
  }
}
