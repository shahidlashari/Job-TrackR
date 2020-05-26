/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react';
import {
  Form,
  Header,
  Segment,
  Container,
  Button,
  Divider,
} from 'semantic-ui-react';

import { SEARCH_JOBS, SEARCH_JOBS_ERROR } from '../../actions/types';

const jobOptions = [
  { key: 'Software Engineer', text: 'Software Engineer', value: 'Software Engineer' },
  { key: 'Data Analytics', text: 'Data Analytics', value: 'Data Analytics' },
  { key: 'DevOps', text: 'DevOps', value: 'DevOps' },
  { key: 'Design', text: 'Design', value: 'Design' },
  { key: 'Marketing', text: 'Marketing', value: 'Marketing' },
  { key: 'Sales', text: 'Sales', value: 'Sales' },
  { key: 'Support', text: 'Support', value: 'Support' },
  { key: 'Accounting', text: 'Accounting', value: 'Accounting' },
  { key: 'Healthcare', text: 'HealthCare', value: 'HealthCare' },
];

class Dashboard extends Component {
  state = {};

  render() {

    return (
      <div>
        <Segment style={{ padding: '-2em 0em' }} vertical>
          <Form
            style={{ minHeight: 0, padding: '10em 1em', margin: '5em' }}
          >
            <Form.Group widths="4">
              <Form.Input fluid placeholder="Keyword Search" />
              <Form.Dropdown
                placeholder="Select Roles"
                fluid
                search
                selection
                options={jobOptions}
              />
              <Form.Dropdown
                placeholder="Select Location"
                fluid
                search
                selection
              />
              <Form.Button size="large" inverted color="blue">Search</Form.Button>

            </Form.Group>

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
          </Form>
        </Segment>
      </div>
    );
  }
}

export default Dashboard;
