import React, { Component } from 'react';
import io from 'socket.io-client';
import { connect } from 'react-redux';
// import { ReactDOM } from 'react-dom';
// import moment from 'moment';
import { Grid, Segment, Divider } from 'semantic-ui-react';
import ChatRoomUsers from '../../components/ChatRoomUsers';
import ChatRoomMessageBox from '../../components/ChatRoomMessageBox';
import ChatRoomMessageInput from '../../components/ChatRoomMessageInput';
import requireAuth from '../../hoc/requireAuth';
import './style.css';
import { loadRoom, getUsers, createMessage } from '../../actions/chatActions';

const socket = io();

class ChatRoom extends Component {
  componentDidMount() {
    socket.emit('connection', {});
    socket.emit('loadRoom', this.props.user._id, (roomData) => {
      this.props.loadRoom(roomData);
      this.props.getUsers(roomData);
      this.props.createMessage(roomData);
    });

    socket.on('userJoin', () => {
      // console.log('User has joined');
      socket.emit('loadRoom', null, (roomData) => {
        this.props.getUsers(roomData);
        // console.log('Room refreshed');
      });
    });

    socket.on('userLeft', () => {
      // console.log('User has left');
      socket.emit('loadRoom', null, (roomData) => {
        this.props.getUsers(roomData);
        // console.log('Room refreshed');
      });
    });

    socket.on('sentMessage', () => {
      // console.log('User has left');
      socket.emit('loadRoom', null, (roomData) => {
        this.props.createMessage(roomData);
        // console.log('Room refreshed');
      });
    });
  }

  componentWillUnmount() {
    socket.emit('leaveRoom', this.props.user._id);
  }

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
                      Hello { this.props.user.username }!
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
                    <ChatRoomMessageInput socket={socket} user={this.props.user} />
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

function mapStateToProps(state) {
  return {
    user: state.auth.user,
  };
}

// const mapDispatchToProps = (dispatch) => ({
//   loadRoom: (roomData) => dispatch(loadRoom(roomData)),
//   getUsers: (roomData) => dispatch(getUsers(roomData)),
//   getMessages: (roomData) => dispatch(createMessage(roomData)),
// });

export default requireAuth(connect(mapStateToProps, { loadRoom, getUsers, createMessage })(ChatRoom));
