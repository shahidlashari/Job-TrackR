import React from 'react';
import { Grid, Segment, List, Icon } from 'semantic-ui-react';
import './style.css';

const ChatRoomUsers = () => {
  return (
    <div>
      <Grid textAlign="center" container stackable>
        <Grid.Row>
          <Grid.Column width={12}>
            <Segment inverted style={{ fontSize: '20px', borderRadius: '15px' }}>
              Users:
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Segment.Group className="chat-users">
        <List animated verticalAlign="middle" style={{ fontSize: '24px' }}>
          <List.Item>
            <Segment inverted>
              <Icon name="user" />
              Shahid
            </Segment>
          </List.Item>
          <List.Item>
            <Segment inverted>
              <Icon name="user" />
              Narayan
            </Segment>
          </List.Item>
          <List.Item>
            <Segment inverted>
              <Icon name="user" />
              Ujwal
            </Segment>
          </List.Item>
          <List.Item>
            <Segment inverted>
              <Icon name="user" />
              Jernice
            </Segment>
          </List.Item>
        </List>
      </Segment.Group>
    </div>
  );
};

export default ChatRoomUsers;
