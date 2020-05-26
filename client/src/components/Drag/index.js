import React from 'react';
import { Item, Ref } from 'semantic-ui-react';
import { DragSource } from 'react-dnd';

const MyItem = props => {
  return (
    <Item>
      <Item.Content>
        <Item.Header>{props.header}</Item.Header>
        <Item.Content>{props.content}</Item.Content>
      </Item.Content>
    </Item>
  )
}

const DraggableItem = props => {
  const { connectDragSource } = props
  return (
    <Ref innerRef={instance => connectDragSource(instance)}>
      <MyItem {...props} />
    </Ref>
  )
}

export default DragSource(...)(DraggableItem);