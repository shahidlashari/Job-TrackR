import React from 'react';
import { Button, Header, Icon, Modal } from 'semantic-ui-react';

const ModalScrollingExample = () => (
  <Modal trigger={<Button>Details</Button>}>
    <Modal.Header>Job Description</Modal.Header>
    <Modal.Content>
      <Modal.Description>
        <Header>Skills and Qualifications</Header>
        <p>
          This is an example of expanded content that will cause the modal's
          dimmer to scroll
        </p>
      </Modal.Description>
    </Modal.Content>
    <Modal.Actions>
      <Button primary>
        Proceed
        <Icon name='right chevron' />
      </Button>
    </Modal.Actions>
  </Modal>
);

export default ModalScrollingExample;