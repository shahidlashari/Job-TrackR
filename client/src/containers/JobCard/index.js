import React, { useState } from 'react';
import { Button, Card, CardContent, Container} from 'semantic-ui-react';
import { Draggable } from 'react-beautiful-dnd';
import { connect } from 'react-redux';
import JobForm from '../JobForm';
import { editCard, deleteCard } from '../../actions/draganddropActions';

const JobCard = React.memo(({ text, id, listID, index, dispatch }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [cardText, setText] = useState(text);

  const closeForm = (e) => {
    setIsEditing(false);
  };

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const saveCard = (e) => {
    e.preventDefault();

    dispatch(editCard(id, listID, cardText));
    setIsEditing(false);
  };

  const handleDeleteCard = (e) => {
    console.log(listID);
    dispatch(deleteCard(id, listID));
  };

  const renderEditForm = () => {
    return (
      <JobForm text={cardText} onChange={handleChange} closeForm={closeForm}>
        <Button onClick={saveCard}>Save</Button>
      </JobForm>
    );
  };

  const renderCard = () => {
    return (
      <Draggable draggableId={String(id)} index={index}>
        {(provided) => (
          <Container
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            onDoubleClick={() => setIsEditing(true)}
          >
            <Card>
              <Button
                onMouseDown={() => setIsEditing(true)}
                fontSize="small"
              >
                Edit
              </Button>
              <Button fontSize="small" onMouseDown={handleDeleteCard}>
                Delete
              </Button>

              <CardContent>
                <p>{text}</p>
              </CardContent>
            </Card>
          </Container>
        )}
      </Draggable>
    );
  };

  return isEditing ? renderEditForm() : renderCard();
});

export default connect()(JobCard);
