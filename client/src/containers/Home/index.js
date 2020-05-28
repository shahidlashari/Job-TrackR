import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Segment, Container, Header, Message, Button, Icon, Grid, Divider } from 'semantic-ui-react';
import './style.css';

class Home extends Component {
  state = {
    messageVisible: true,
  }

  handleDismiss = () => this.setState({ messageVisible: false });

  warningMessage() {
    if (this.state.messageVisible && !this.props.authenticated) {
      return (
        <Grid container stackable style={{ marginTop: '2em' }}>
          <Grid.Row>
            <Grid.Column>
              <Message
                icon="attention"
                warning
                onDismiss={this.handleDismiss}
                header="You don't have access to the Job Dashboard page!"
                content="Please create an account in the Sign-Up page in order to start tracking your job applications"
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      );
    } else {
      return null;
    }
  }

  render() {
    return (
      <div>
        <Segment
          inverted
          textAlign="center"
          vertical
          style={{ minHeight: 550, padding: '1em 0em' }}
          className="home-jumbotron"
        >
          <Container text>
            <Header
              as="h1"
              content="Job TrackR"
              inverted
              style={{
                color: 'skyblue',
                fontSize: '72px',
                fontWeight: 'bold',
                marginBottom: 0,
                marginTop: '2.3em',
              }}
            />
            <Header
              as="h2"
              content="Search for a job that you have always dreamed of and keep track of it forever"
              inverted
              style={{
                fontSize: '1.8em',
                fontWeight: 'normal',
                marginTop: '1em',
                marginBottom: '1em',
              }}
            />
            <Button as={Link} to="/signup" primary size="massive">
              Get Started
              <Icon name="right arrow" />
            </Button>
            <Button as={Link} to="/search" primary size="massive">
              Search Job
              <Icon name="right arrow" />
            </Button>
          </Container>
        </Segment>

        { this.props.authenticated ? null : this.warningMessage() }

        <Segment style={{ padding: '5em 0em' }} vertical>
          <Grid container stackable verticalAlign="middle">
            <Grid.Row>
              <Grid.Column textAlign="center">
                <Header as="h1" style={{ fontSize: '4em' }}>
                  Live Chat
                </Header>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={5}>
                <Header as="h3" style={{ fontSize: '2em' }}>
                  Chat with Others
                </Header>
                <p style={{ fontSize: '1.33em' }}>
                  Join the community and tell others all the cool job searches you've done and give tips for your fellow users!
                </p>
                <Button as={Link} to="/chatroom" size="large" color="blue">
                  Head to Chat Room
                  <Icon name="right arrow" />
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={6}>
                Placeholder Image of Chat Room (or something)
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { authenticated: state.auth.authenticated };
}

export default connect(mapStateToProps, {})(Home);
