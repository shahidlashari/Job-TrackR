/* eslint-disable react/no-unused-state */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Helmet } from 'react-helmet';
import { Grid, Icon, Form, Modal, Input, TextArea, Header, Segment, Button, Card, GridColumn, ModalDescription } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import createDOMPurify from 'dompurify';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import { JSDOM } from 'jsdom';
import requireAuth from '../../hoc/requireAuth';
import { getUserJobs } from '../../actions/jobActions';
import { UPDATE_JOBS_BY_ID, UPDATE_JOBS_BY_ID_ERROR } from '../../actions/types';

const { window } = new JSDOM('');
const DOMPurify = createDOMPurify(window);

class UserJobList extends Component {
  state = {
    loading: false,
    updateError: false,
  }

  componentDidMount() {
    this.props.getUserJobs();
  }

  onSubmit = async (formValues, dispatch) => {
    console.log('theses are form value');
    console.log(formValues);
    // const {} = formValues;
    try {
      this.setState({ loading: true });
      const { data } = await axios.put('/api/job/update', {}, { headers: { authorization: localStorage.getItem('token') } });
      console.log(data);
      dispatch({ type: UPDATE_JOBS_BY_ID, payload: data });
      this.setState({ loading: false });
      if (this.props.userJobs.length === 0) {
        this.setState({ updateError: true });
      } else {
        this.setState({ updateError: false });
      }
    } catch (e) {
      dispatch({ type: UPDATE_JOBS_BY_ID_ERROR, payload: e });
    }
  };

  renderError = () => {
    if (this.state.updateError) {
      return (
        <Grid container stackable>
          <Grid.Row>
            <Grid.Column>
              <Message
                size="large"
                icon="x"
                negative
                onDismiss={this.handleDismiss}
                header="Failed to find result!"
                content="Please try again by searching something different"
                style={{ marginLeft: '15px' }}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      );
    } else {
      return null;
    }
  }

  renderData = (field) => {
    console.log(field);

    console.log('i am inside renderdata');
    return (
      <Form.Field
        {...field.input}
        error={field.meta.touched && field.meta.error}
        value={field.input.value}
        onChange={(params, data) => field.input.onChange(data.value)}
        onBlur={() => {}}
        placeholder={field.placeholder}
      />
    );
  };

  // onClose={(params, data) => field.input.onClose(data.value)}
  // defaultValue={field.defaultValue}


  // renderField = ({
  //   input,
  //   name,
  //   type,
  // }) => (
  //   <div>
  //     <div>
  //       <input {...input} placeholder={name} type={type} />
  //     </div>
  //   </div>
  // )

  render() {
    console.log(this.props.userJobs);
    const { handleSubmit, submitting, submitFailed } = this.props;

    return (
      <>
        <Helmet>
          <style>{'body { background-color: #37373b; }'}</style>
        </Helmet>
        <Grid container centered divided stackable textAlign="center">
          <Grid.Row columns={5} style={{ padding: '7em 0em', marginLeft: '75px' }}>
            <Grid.Column textalign="center" style={{ padding: '1em 1em', maxWidth: 500 }}>
              <Card color="black" header="Saved Jobs" />
              {this.props.userJobs?.map((job, idx) => {
                return (
                // <Draggable draggableId={job.publishedId}>

                  <Card textalign="center" key={idx}>

                  <Card key={idx}>

                    <Card.Content as="h1">{job.jobTitle}</Card.Content>
                    <Card.Content>Company: {job.companyName}</Card.Content>
                    <Card.Content>Location: {job.location}</Card.Content>
                    <Card.Content style={{ textalign: 'center' }}>
                      <Modal
                        size="large"
                        closeIcon
                        trigger={<Button
                          color="blue"
                          size="medium"
                          type="submit"

                          textalign="center"

                        >
                          View Job
                        </Button>}
                        onSubmit={handleSubmit(this.onSubmit)}
                      >

                        <Modal.Header style={{ textalign: 'center' }}>
                          <p style={{ fontSize: '24px' }}>{job.jobTitle}</p>

                        <Modal.Header style={{ textAlign: 'center' }}>
                          <p>{job.jobTitle}</p>

                          <p>{job.locations}</p>
                        </Modal.Header>
                        <div>
                          <Form
                            onSubmit={handleSubmit(this.onSubmit)}
                          >
                            <Segment stacked>
                              <Grid column={2} textalign="center">
                                <Button
                                  loading={this.state.loading}
                                  color="blue"
                                  size="huge"
                                  type="submit"
                                  disabled={submitting || submitFailed}
                                  onClick={() => this.onSubmit()}
                                >
                                  <Icon name="add" />
                                  Update
                                </Button>
                                <Grid.Row>
                                  <Grid.Column width={8}>
                                    <Field
                                      name="jobTitle"
                                      component={this.renderData}
                                      defaultValue={job.jobTitle}
                                      control={Input}
                                      placeholder="Job Title"
                                    />
                                  </Grid.Column>
                                  <Grid.Column width={8}>
                                    <Field
                                      name="location"
                                      component={this.renderData}
                                      defaultValue={job.location}
                                      control={Input}
                                      placeholder="Location"
                                    />
                                  </Grid.Column>
                                </Grid.Row>
                              </Grid>

                              <Grid column={2} textalign="center">
                                <Grid.Row>
                                  <Grid.Column width={8}>
                                    <Field
                                      name="companyName"
                                      defaultValue={job.companyName}
                                      control={Input}
                                      placeholder="Company Name"
                                    />
                                  </Grid.Column>
                                  <Grid.Column width={8}>
                                    <Field
                                      name="jobURL"
                                      // component={this.renderData}
                                      defaultValue={job.jobUrl}
                                      control={Input}
                                      placeholder="Post URL"
                                    />
                                  </Grid.Column>
                                </Grid.Row>
                              </Grid>

                              <Grid column={2} textalign="center">
                                <Grid.Row>
                                  <Grid.Column width={8}>
                                    <Field
                                      name="level"
                                      // component={this.renderData}
                                      defaultValue={job.level}
                                      control={Input}
                                      placeholder="Level"
                                    />
                                  </Grid.Column>
                                  <Grid.Column width={8}>
                                    <Field
                                      name="publishedDate"
                                      // component={this.renderData}
                                      defaultValue={job.publishedDate}
                                      control={Input}
                                      placeholder="PublishedDate"
                                    />
                                  </Grid.Column>
                                </Grid.Row>
                              </Grid>

                              <Grid column={2} textalign="center">
                                <Grid.Row>
                                  <Grid.Column width={8}>
                                    <Form.TextArea
                                      label="Resume"
                                      placeholder="Prepare your resume..."
                                    />
                                  </Grid.Column>
                                  <Grid.Column width={8}>
                                    <Form.TextArea
                                      label="CoverLeter"
                                      placeholder="Prepare your Cover Letter..."
                                    />
                                  </Grid.Column>
                                </Grid.Row>
                              </Grid>

                              <Grid column={2} textalign="center">
                                <Grid.Row>
                                  <Grid.Column width={8}>
                                    <Form.TextArea label="Notes" placeholder="Add your note..." />
                                  </Grid.Column>
                                  <Grid.Column width={8}>
                                    <Field
                                      name="deadline"
                                      control={Input}
                                      label="Deadline"
                                      placeholder="Select a date for deadline"
                                    />
                                  </Grid.Column>
                                </Grid.Row>
                              </Grid>
                            </Segment>
                          </Form>
                        </div>
                        <Modal.Content>
                          <Modal.Description>
                            <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(job.description) }} style={{ fontSize: '16px' }} />
                          </Modal.Description>

                        </Modal.Content>
                      </Modal>
                    </Card.Content>
                  </Card>
                // </Draggable>
                );
              })}
            </Grid.Column>
            <Grid.Column textalign="center" style={{ padding: '1em 1em', maxWidth: 500 }}>
              <Card color="blue" header="Applying" />
            </Grid.Column>
            <GridColumn textalign="center" style={{ padding: '1em 1em', maxWidth: 500 }}>
              <Card color="yellow" header="Interviewing" />
            </GridColumn>
            <GridColumn textalign="center" style={{ padding: '1em 1em', maxWidth: 500 }}>
              <Card color="green" header="Offers" />
            </GridColumn>
            <GridColumn textalign="center" style={{ padding: '1em 1em', maxWidth: 500 }}>
              <Card color="red" header="Rejected" />
            </GridColumn>
          </Grid.Row>
        </Grid>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    userJobs: state.jobs.userJobs,
  };
}

const composedComponent = compose(
  connect(mapStateToProps, { getUserJobs }),
  reduxForm({ form: 'UserJobList' }),
)(UserJobList);
export default requireAuth(composedComponent);
