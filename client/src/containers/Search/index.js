/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'redux';
import createDOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';

import {
  Icon,
  Form,
  List,
  Image,
  Modal,
  Header,
  Segment,
  Container,
  Button,
  Divider,
  Dropdown,
  Card,
} from 'semantic-ui-react';
import axios from 'axios';
import {
  locationOptions,
  levelOptions,
  jobOptions,
} from '../../static/location';
// import levelOptions from '../../static/location';
// import jobOptions from '../../static/location';

import { SEARCH_JOBS, SEARCH_JOBS_ERROR } from '../../actions/types';
import { searchJob, searchJobError } from '../../actions/searchActions';

const { window } = new JSDOM('');
const DOMPurify = createDOMPurify(window);

//  54295
class Search extends Component {
  onSubmit = async (formValues, dispatch) => {
    const { role, level, location } = formValues;
    try {
      const { data } = await axios.get(
        `/api/job/search?role=${role}&level=${level}&location=${location}`,
      );
      console.log(data);
      dispatch({ type: SEARCH_JOBS, payload: data });
    } catch (e) {
      dispatch({ type: SEARCH_JOBS_ERROR, payload: e });
    }
  };

  // const { jobTitle, publishedId, publishedDate, level, categories, location, companyName, contents, coverLetter, resume, deadline, salary, note } = req.body;

  saveJob = async (job) => {
    console.log(job);
    try {
      const savedData = await axios.post('/api/job/save', { job }, { headers: { authorization: localStorage.getItem('token') } });
      console.log(savedData);
    } catch (e) {
      if (e) throw e;
    }
  };

  renderDropdown = (field) => {
    return (
      <Form.Dropdown
        {...field.input}
        error={field.meta.touched && field.meta.error}
        fluid
        search
        selection
        options={field.data}
        value={field.input.value}
        onChange={(params, data) => field.input.onChange(data.value)}
        onBlur={() => {}}
        placeholder={field.placeholder}
      />
    );
  };

  render() {
    const { handleSubmit, submitting, submitFailed } = this.props;
    return (
      <Form
        style={{ minHeight: 0, padding: '10em 1em', margin: '5em' }}
        size="large"
        onSubmit={handleSubmit(this.onSubmit)}
      >
        <Segment style={{ padding: '-2em 0em' }} vertical>
          {/* <Container text>
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
          </Container> */}
          <Field
            name="role"
            component={this.renderDropdown}
            data={jobOptions}
            placeholder="select role"
          />
          <Field
            name="level"
            component={this.renderDropdown}
            data={levelOptions}
            placeholder="select level"
          />
          <Field
            name="location"
            component={this.renderDropdown}
            data={locationOptions}
            placeholder="select location"
          />

          <Button
            color="teal"
            size="large"
            type="submit"
            disabled={submitting || submitFailed}
          >
            Search
          </Button>

          <Container>
            { this.props.jobs?.map((job, idx) => {
              return (
                <Card>
                  <List.Item key={idx}>
                    <List.Content>
                      <List.Header>{job.name}</List.Header>
                      <List.Header>{job.company.name}</List.Header>
                      <Button
                        color="teal"
                        size="small"
                        type="submit"
                        floated="right"
                        onClick={() => this.saveJob(job)}
                      >
                        {' '}
                        save job
                      </Button>
                      <Modal trigger={<Button
                        color="teal"
                        size="small"
                        type="submit"
                        floated="right"
                      >
                        View Job
                      </Button>}
                      >
                        <Modal.Header>
                          {job.name}
                          {' '}
                          {job.locations[0].name}
                        </Modal.Header>

                        <Modal.Content>
                          <Modal.Description>
                            <Header>
                              <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(job.contents) }} />
                            </Header>
                          </Modal.Description>
                        </Modal.Content>
                      </Modal>
                    </List.Content>
                  </List.Item>
                </Card>
              );
            })}
          </Container>
        </Segment>
      </Form>
    );
  }
}

function mapStateToProps(state) {
  return { jobs: state.jobs.searchJobResults };
}

export default compose(
  connect(mapStateToProps, {}),
  reduxForm({ form: 'Search' }),
)(Search);
