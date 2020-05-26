import React from 'react';
import { Card, Modal, Header, Button, Icon } from 'semantic-ui-react';

function JobCard(props) {

  const dragStart = (e) => {
    const { target } = e.target;

    e.dataTransfer.setData('card_id', target.id);

    setTimeout(() => {
      target.style.display = 'none';
    }, 0);
  }

  const dragOver = e => {
    e.stopPropagation();
  }

  return (
    <div
      id={props.id}
      className={props.className}
      draggable={props.draggable}
      onDragStart={dragStart}
      onDragOver={dragOver}
    >
      <Card>
        <Card.Content>
          <Card.Header>Frontend Developer</Card.Header>
          <Card.Meta>Google</Card.Meta>
          <Card.Description>
            Work on your application!
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Modal trigger={<Button>Details</Button>}>
            <Modal.Header>Job Description</Modal.Header>
            <Modal.Content>
              <Modal.Description>
                <Header>Skills and Qualifications</Header>
                <p>
                  Listed here will be the required skills and qualifications needed for this job!
                </p>
              </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
              <Button primary>
                Save
                <Icon name="right chevron" />
              </Button>
            </Modal.Actions>
          </Modal>
        </Card.Content>
      </Card>
      Hi there!
    </div>
  );
}

export default JobCard;
