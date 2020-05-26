import React, { Component } from 'react';
import { Draggable, Droppable } from 'react-drag-and-drop';

class Drag extends Component {
  render() {
    return (
      <div>
        <ul>
          <Draggable type="fruit" data="banana"><li>Banana</li></Draggable>
          <Draggable type="fruit" data="apple"><li>Apple</li></Draggable>
          <Draggable type="metal" data="silver"><li>Silver</li></Draggable>
        </ul>
        <Droppable
          types={['fruit']} // <= allowed drop types
          onDrop={() => this.onDrop()} />
          <ul className="Smoothie" />
      </div>
    );
  }
}

export default Drag;
