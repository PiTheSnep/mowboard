import * as React from 'react';

interface DraggableProps {
  key: number;

  move: (from: number, to: number) => Draggable;
  find: (key: number) => Draggable | undefined;

  children: any;
}

/**
 * A draggable list element.
 */
export class Draggable extends React.Component<DraggableProps> {}
