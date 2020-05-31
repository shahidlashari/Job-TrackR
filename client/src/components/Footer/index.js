import React from 'react';
import { Link } from 'react-router-dom';
import { Segment, Container, Grid, Header, Image, Button, List, Divider, Icon } from 'semantic-ui-react';
import LogoImg from '../../images/logo.png';
import pfp1 from '../../images/pfp1.png';
import pfp2 from '../../images/pfp2.png';
import pfp3 from '../../images/pfp3.png';
import pfp4 from '../../images/pfp4.png';
import pfp5 from '../../images/pfp5.png';

const Footer = () => {
  return (
    <div>
      <Segment inverted vertical style={{ padding: '-10000em 0em' }}>
        <Container>
          <Grid divided inverted stackable>
            <Grid.Row>
              <Grid.Column width={7}>
                <Header as="h1" inverted>
                  <Image src={LogoImg} />
                  Job TrackR
                </Header>
                <p>
                  Job TrackR allows you to search specific job categories in the area of your choice to find the job that's right for you and keep track of them all. JobTrackR also allows you to view trendings of jobs and salaries.
                </p>
                <p>
                  Register and ramp-up your job search with Job TrackR tools: collaborative live chat messaging with other users, access to relevant job trends, and track and update job search details to make progress in your Job Dashboard page!
                </p>
              </Grid.Column>
              <Grid.Column width={3}>
                <Header inverted as="h3" content="Get Started" />
                <p>Get access to your Job Dashboard by creating an account.</p>
                <Button as={Link} to="/signup" color="blue">Register Now</Button>
              </Grid.Column>
              <Grid.Column width={6}>
                <Header inverted as="h3" content="Contact Us" />
                <List link inverted selection animated>
                  <List.Item>
                    <List.Icon name="mail" />
                    <List.Content>
                      <a href="mailto:nmantohac82098@gmail.com">
                        Send Feedback
                      </a>
                    </List.Content>
                  </List.Item>
                </List>
                <Grid.Row>
                  <List link inverted horizontal selection>
                    <Header inverted as="h3" content="Developed By" />
                    <List.Item>
                      <a href="https://github.com/NMantohac" target="_blank" rel="noopener noreferrer">
                        <Image src={pfp1} circular width="65" height="65" />
                      </a>
                    </List.Item>
                    <List.Item>
                      <a href="https://github.com/shahidlashari" target="_blank" rel="noopener noreferrer">
                        <Image src={pfp2} circular width="65" height="65" />
                      </a>
                    </List.Item>
                    <List.Item>
                      <a href="https://github.com/jerniceduncan" target="_blank" rel="noopener noreferrer">
                        <Image src={pfp3} circular width="65" height="65" />
                      </a>
                    </List.Item>
                    <List.Item>
                      <a href="https://github.com/usualketchup" target="_blank" rel="noopener noreferrer">
                        <Image src={pfp4} circular width="65" height="65" />
                      </a>
                    </List.Item>
                    <List.Item>
                      <a href="https://github.com/naryan" target="_blank" rel="noopener noreferrer">
                        <Image src={pfp5} circular width="65" height="65" />
                      </a>
                    </List.Item>
                  </List>
                </Grid.Row>
              </Grid.Column>
            </Grid.Row>
            <Divider />
          </Grid>
          <Segment textAlign="center" inverted style={{ background: '#37373b' }}>
            <Icon name="copyright outline" style={{ marginLeft: '3px' }} />
            Copyright 2020. All rights reserved.
          </Segment>
        </Container>
      </Segment>
    </div>
  );
};

export default Footer;
