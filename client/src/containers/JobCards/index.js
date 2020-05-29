import React from 'react';
import { Card, Modal, Header, Button, Icon } from 'semantic-ui-react';

const CardExampleGroups = () => (
  <Card.Group>
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
    <Card>
      <Card.Content>
        <Card.Header>Frontend Developer</Card.Header>
        <Card.Meta>Cisco</Card.Meta>
        <Card.Description>
          Click on view details for more info.
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
    <Card>
      <Card.Content>
        <Card.Header>Full Stack Developer</Card.Header>
        <Card.Meta>Facebook</Card.Meta>
        <Card.Description>
          Requires skills in React and React Native
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
  </Card.Group>
);

export default CardExampleGroups;
