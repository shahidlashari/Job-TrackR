/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'redux';
import createDOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';
import { Helmet } from 'react-helmet';
import {
  Grid,
  Icon,
  Form,
  Modal,
  Header,
  Segment,
  Button,
  Card,
} from 'semantic-ui-react';
import axios from 'axios';
import {
  jobOptions,
  levelOptions,
  locationOptions,
} from '../../static/location';
// import levelOptions from '../../static/location';
// import jobOptions from '../../static/location';

import { SEARCH_JOBS, SEARCH_JOBS_ERROR } from '../../actions/types';

const { window } = new JSDOM('');
const DOMPurify = createDOMPurify(window);

class Search extends Component {
  state = {
    loading: false,
  }

  onSubmit = async (formValues, dispatch) => {
    const { role, level, location } = formValues;
    try {
      this.setState({ loading: true });
      const { data } = await axios.get(`/api/job/search?role=${role}&level=${level}&location=${location}`);
      console.log(data);
      dispatch({ type: SEARCH_JOBS, payload: data });
      this.setState({ loading: false });
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

  jobCompanyURL = async (id) => {
    window.location.href = `https://www.themuse.com/job/redirect/${id}`;
  }

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
      <div>
        <Helmet>
          <style>{'body { background-color: #37373b; }'}</style>
        </Helmet>
        <Grid textAlign="center" style={{ height: '450px', padding: '9em 0em' }}>
          <Grid.Column style={{ maxWidth: 500 }}>
            <Header color="blue" textAlign="center" style={{ fontSize: '52px' }}>
              Job Search
            </Header>
            <Form
              size="large"
              onSubmit={handleSubmit(this.onSubmit)}
            >
              <Segment vertical style={{ padding: '1em 0em' }}>
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
                  loading={this.state.loading}
                  color="blue"
                  size="large"
                  type="submit"
                  disabled={submitting || submitFailed}
                >
                  <Icon name="search" />
                  Search
                </Button>
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
        <Grid container centered relaxed stackable textAlign="center">
          <Grid.Row columns={3} style={{ padding: '1em 0em', marginLeft: '75px' }}>
            { this.props.jobs?.map((job, idx) => {
              return (
                <Grid.Column stretched textAlign="center" style={{ padding: '1em 0em', maxWidth: 500 }}>
                  <Card textAlign="center" key={idx}>
                    <Card.Content as="h1">{job.name}</Card.Content>
                    <Card.Content>Company: {job.company.name}</Card.Content>
                    <Card.Content style={{ textAlign: 'center' }}>
                      <Modal
                        size="large"
                        closeIcon
                        trigger={<Button
                          color="blue"
                          size="medium"
                          type="submit"
                          floated="right"
                          style={{ marginRight: '80px' }}
                        >
                          View Job
                        </Button>}
                      >
                        <Modal.Header style={{ textAlign: 'center' }}>
                          <p style={{ fontSize: '24px' }}>{job.name}</p>
                          <p>{job.locations[0].name}</p>
                        </Modal.Header>
                        <Modal.Content>
                          <Modal.Description>
                            <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(job.contents) }} style={{ fontSize: '20px' }} />
                          </Modal.Description>
                        </Modal.Content>
                        <Modal.Actions>
                          <Button
                            color="blue"
                            type="submit"
                            floated="right"
                            size="huge"
                            style={{ marginBottom: '10px' }}
                            onClick={() => this.saveJob(job)}
                          >
                            <Icon name="save" />
                            Save Job
                          </Button>
                        </Modal.Actions>
                      </Modal>
                    </Card.Content>
                  </Card>
                </Grid.Column>
              );
            })}
          </Grid.Row>
        </Grid>
      </div>
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
