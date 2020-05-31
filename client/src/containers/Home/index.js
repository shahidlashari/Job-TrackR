import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Segment, Container, Header, Message, Button, Image, Icon, Grid, Divider } from 'semantic-ui-react';
import HomeCarousel from '../HomeCarousel';
import HomeExampleGraph from '../HomeExampleGraph';
import chatRoom from '../../images/chatroom.png';
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
                size="big"
                icon="attention"
                warning
                onDismiss={this.handleDismiss}
                header="You don't have access to the Chat Room and Job Dashboard page!"
                content="Please Sign-In or create an account in the Sign-Up page in order to chat with others and to start tracking your job applications"
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
          style={{ minHeight: 600, padding: '1em 0em' }}
          id="home-jumbotron"
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
          <Grid container stackable verticalAlign="middle" style={{ marginBottom: '50px' }}>
            <Grid.Row>
              <Grid.Column textAlign="center">
                <Header as="h1" style={{ fontSize: '4em' }}>
                  Job Search
                </Header>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={4}>
                <Header as="h3" style={{ fontSize: '2em' }}>
                  Find the Ideal Job
                </Header>
                <p style={{ fontSize: '1.33em' }}>
                  Search through various job posts by selecting a specific role, level, and location of your dream job!
                </p>
                <Button as={Link} to="/search" size="large" color="blue">
                  Head to Job Search
                  <Icon name="right arrow" />
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={10}>
                <HomeCarousel />
              </Grid.Column>
            </Grid.Row>
          </Grid>

          <Divider style={{ padding: '1em 0em' }} />

          <Grid container stackable verticalAlign="middle" style={{ marginBottom: '120px' }}>
            <Grid.Row>
              <Grid.Column textAlign="center">
                <Header as="h1" style={{ fontSize: '4em' }}>
                  Trending
                </Header>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column floated="left" width={10}>
                <HomeExampleGraph />
              </Grid.Column>
              <Grid.Column width={4}>
                <Header as="h3" style={{ fontSize: '2em' }}>
                  View Trending Data
                </Header>
                <p style={{ fontSize: '1.33em' }}>
                  Interested in analyzing salary data? View historical, histogram, regional, and top companies data regarding salaries!
                </p>
                <Button as={Link} to="/trending" size="large" color="blue">
                  Head to Trending
                  <Icon name="right arrow" />
                </Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>

          <Divider style={{ padding: '1em 0em' }} />

          <Grid container stackable verticalAlign="middle" style={{ marginBottom: '30px' }}>
            <Grid.Row>
              <Grid.Column textAlign="center">
                <Header as="h1" style={{ fontSize: '4em' }}>
                  Live Chat
                </Header>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={4}>
                <Header as="h3" style={{ fontSize: '2em' }}>
                  Chat with Others
                </Header>
                <p style={{ fontSize: '1.33em' }}>
                  Join the community and tell others all the cool job searches you've done and give tips for your fellow users!
                </p>
                { this.props.authenticated ? <Button as={Link} to="/chatroom" size="large" color="blue">
                  Head to Chat Room
                  <Icon name="right arrow" />
                </Button> : <Button as={Link} to="/signup" size="large" color="blue">
                  Get Started
                  <Icon name="right arrow" />
                </Button>}
              </Grid.Column>
              <Grid.Column floated="right" width={10}>
                <Segment inverted>
                  <Image src={chatRoom} />
                </Segment>
              </Grid.Column>
            </Grid.Row>
          </Grid>

          <Divider style={{ padding: '1em 0em' }} />

          <Grid container stackable verticalAlign="middle" style={{ marginBottom: '30px' }}>
            <Grid.Row>
              <Grid.Column textAlign="center">
                <Header as="h1" style={{ fontSize: '4em' }}>
                  Job Dashboard
                </Header>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column floated="left" width={10}>
                Placeholder Gif of Job Dashboard or something
              </Grid.Column>
              <Grid.Column width={4}>
                <Header as="h3" style={{ fontSize: '2em' }}>
                  Start Tracking Your Job Applications and Searches
                </Header>
                <p style={{ fontSize: '1.33em' }}>
                  Placeholder Text
                </p>
                { this.props.authenticated ? <Button as={Link} to="/dashboard" size="large" color="blue">
                  Head to Dashboard
                  <Icon name="right arrow" />
                </Button> : <Button as={Link} to="/signup" size="large" color="blue">
                  Get Started
                  <Icon name="right arrow" />
                </Button>}
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
