import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Segment, List, Icon } from 'semantic-ui-react';
import './style.css';

class ChatRoomUsers extends Component {
  render() {
    console.log(this.props.users);
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
            { this.props.users.map((user, index) => (
              <List.Item key={index}>
                <Segment inverted>
                  <Icon name="user" />
                  {user.username}
                </Segment>
              </List.Item>
            ))}
          </List>
        </Segment.Group>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    users: state.chat.users,
  };
}

export default connect(mapStateToProps, {})(ChatRoomUsers);
