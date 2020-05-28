import React, { Component } from 'react';
import io from 'socket.io-client';
// import moment from 'moment';
import { Grid, Segment, Divider } from 'semantic-ui-react';
import ChatRoomUsers from '../../components/ChatRoomUsers';
import ChatRoomMessageBox from '../../components/ChatRoomMessageBox';
import ChatRoomMessageInput from '../../components/ChatRoomMessageInput';
import './style.css';

const socket = io();

class ChatRoom extends Component {
  render() {
    return (
      <Segment vertical style={{ backgroundColor: '#37373b', padding: '10em 0em' }}>
        <Grid container stackable style={{ backgroundColor: '#5d9bd1', borderRadius: '25px' }}>
          <Grid.Row stretched>
            <Grid.Column width={4}>
              <ChatRoomUsers />
            </Grid.Column>
            <Grid.Column width={12}>
              <Grid textAlign="center" container stackable>
                <Grid.Row>
                  <Grid.Column width={12}>
                    <Segment inverted style={{ fontSize: '32px', borderRadius: '25px' }}>
                      Hi User!
                    </Segment>
                    <Divider />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
              <Grid container stackable>
                <Grid.Row>
                  <Grid.Column width={16}>
                    <ChatRoomMessageBox />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row centered>
                  <Grid.Column width={16}>
                    <ChatRoomMessageInput />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    );
  }
}

export default ChatRoom;
