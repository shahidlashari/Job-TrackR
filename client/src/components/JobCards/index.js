import React from 'react'
import { Button, Card, Header, Icon, Image, Modal } from 'semantic-ui-react';

const CardExampleGroups = () => (
  <Card.Group>
    <Card>
      <Card.Content>
        <Image
          floated='right'
          size='mini'
          src='/images/avatar/large/steve.jpg'
        />
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
      </Card.Content>
    </Card>
    <Card>
      <Card.Content>
        <Image
          floated='right'
          size='mini'
          src='/images/avatar/large/molly.png'
        />
        <Card.Header>Molly Thomas</Card.Header>
        <Card.Meta>New User</Card.Meta>
        <Card.Description>
          Molly wants to add you to the group <strong>musicians</strong>
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div className='ui two buttons'>
          <Button basic color='green'>
            Approve
          </Button>
          <Button basic color='red'>
            Decline
          </Button>
        </div>
      </Card.Content>
    </Card>
    <Card>
      <Card.Content>
        <Image
          floated='right'
          size='mini'
          src='/images/avatar/large/jenny.jpg'
        />
        <Card.Header>Jenny Lawrence</Card.Header>
        <Card.Meta>New User</Card.Meta>
        <Card.Description>
          Jenny requested permission to view your contact details
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div className='ui two buttons'>
          <Button basic color='green'>
            Approve
          </Button>
          <Button basic color='red'>
            Decline
          </Button>
        </div>
      </Card.Content>
    </Card>
  </Card.Group>
)

export default CardExampleGroups;
