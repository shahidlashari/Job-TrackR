import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Segment, Container, Header, Button, Icon, Grid, Divider } from 'semantic-ui-react';
import './style.css';

class Home extends Component {
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
              content="Keep in track of your Job Applications and Job Searches"
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
          </Container>
        </Segment>
        <Segment style={{ padding: '7em 0em' }} vertical>
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
              </Grid.Column>
              <Grid.Column floated="right" width={6}>
                Placeholder Socket.io Chat
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>

        <Segment style={{ padding: '8em 0em' }} vertical>
          <Container text>
            <Header as="h3" style={{ fontSize: '2em' }}>
              Top Industries
            </Header>
            <p style={{ fontSize: '1.33em' }}>
              Discover the current top industries for job posts
            </p>
            <Button as="a" size="large" inverted color="blue">
              Find Out More
            </Button>

            <Divider style={{ margin: '2em 0em' }} />

            <Header as="h3" style={{ fontSize: '2em' }}>
              Top Cities
            </Header>
            <p style={{ fontSize: '1.33em' }}>
              Discover the current top cities for job posts
            </p>
            <Button as="a" size="large" inverted color="blue">
              Find Out More
            </Button>

            <Divider style={{ margin: '2em 0em' }} />

            <Header as="h3" style={{ fontSize: '2em' }}>
              Top Employers
            </Header>
            <p style={{ fontSize: '1.33em' }}>
              Discover the current top employers for job posts
            </p>
            <Button as="a" size="large" inverted color="blue">
              Find Out More
            </Button>
          </Container>
        </Segment>
      </div>
    );
  }
}

export default Home;
