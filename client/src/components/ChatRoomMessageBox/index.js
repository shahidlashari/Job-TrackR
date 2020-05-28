import React from 'react';
import { Container, Segment, Image, Grid } from 'semantic-ui-react';
import pfp1 from '../../images/pfp1.png';
import './style.css';

const ChatRoomMessageBox = () => {
  return (
    <div>
      <Segment inverted style={{ marginTop: '-40px' }}>
        <Container className="message-container">
          <Segment>
            <Grid verticalAlign="middle">
              <Grid.Row>
                <Image src={pfp1} height="45" width="45" style={{ marginLeft: '5px', marginRight: '5px' }} />
                <p>
                  <strong style={{ fontSize: '20px', textDecoration: 'underline' }}>User:</strong>
                  <span style={{ fontSize: '12px' }}> 5/27/2020 | 10:00pm</span>
                  <br />
                  <span style={{ fontSize: '16px' }}>Welcome to the Chat Room!</span>
                </p>
              </Grid.Row>
            </Grid>
          </Segment>
        </Container>
      </Segment>
    </div>
  );
};

export default ChatRoomMessageBox;
