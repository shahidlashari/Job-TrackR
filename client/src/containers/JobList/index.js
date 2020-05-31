import React, { useState } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { connect } from 'react-redux';
import { Container, FormInput, Button, Header, Form } from 'semantic-ui-react';
import JobCard from '../JobCard';
import { editTitle, deleteList } from '../../actions/draganddropActions';
import JobCreator from '../JobCreator';

const JobList = ({ title, cards, listID, index, dispatch }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [listTitle, setListTitle] = useState(title);

  const handleFocus = (e) => {
    e.target.select();
  };

  const handleChange = (e) => {
    e.preventDefault();
    setListTitle(e.target.value);
  };

  const handleFinishEditing = (e) => {
    setIsEditing(false);
    dispatch(editTitle(listID, listTitle));
  };

  const handleDeleteList = () => {
    dispatch(deleteList(listID));
  };

  const renderEditInput = () => {
    return (
      <Form onSubmit={handleFinishEditing}>
        <FormInput
          type="text"
          value={listTitle}
          onChange={handleChange}
          autoFocus
          onFocus={handleFocus}
          onBlur={handleFinishEditing}
        />
      </Form>
    );
  };

  let CARDO;
  if (cards) {
    CARDO = cards.map((card, index) => (
      <JobCard
        key={card.id}
        text={card.text}
        id={card.id}
        index={index}
        listID={listID}
      />
    ))}

  return (
    <Draggable draggableId={String(listID)} index={index}>
      {(provided) => (
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <Droppable droppableId={String(listID)} type="card">
            {(provided) => (
              <div>
                <div>
                  {isEditing ? (
                    renderEditInput()
                  ) : (
                    <Container onClick={() => setIsEditing(true)}>
                      <Header>{listTitle}</Header>
                      <Button onClick={renderEditInput()}>
                        Edit
                      </Button>
                    </Container>
                  )}
                </div>
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {CARDO}
                  {provided.placeholder}
                  <JobCreator listID={listID} />
                </div>
              </div>
            )}
          </Droppable>
        </Container>
      )}
    </Draggable>
  );
};

export default connect()(JobList);
