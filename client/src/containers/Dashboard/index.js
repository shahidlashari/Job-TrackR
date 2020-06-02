import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { Helmet } from 'react-helmet';
import { Grid, Form, Modal, Input, Segment, Button, Card, GridColumn } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import createDOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';
import requireAuth from '../../hoc/requireAuth';
import { getUserJobs } from '../../actions/jobActions';

const { window } = new JSDOM('');
const DOMPurify = createDOMPurify(window);

class UserJobList extends Component {
  componentDidMount() {
    this.props.getUserJobs();
  }

  handleClose = async () => {
    console.log('Hi, I can make an api call and do everything from here');
  };

  // renderData = (field) => {
  //   console.log(field);
  //   return (
  //     <Form.Field
  //       {...field.input}
  //       value={field.input.value}
  //       onClose={(params, data) => field.input.onClose(data.value)}
  //       defaultValue={field.defaultValue}
  //     />
  //   );
  // }

  renderField = ({ input, name, type }) => (
    <div>
      <div>
        <input {...input} placeholder={name} type={type} />
      </div>
    </div>
  );

  render() {
    console.log(this.props.userJobs);
    const { handleSubmit } = this.props;
    return (
      <div>
        <Helmet>
          <style>{'body { background-color: #37373b; }'}</style>
        </Helmet>
        <Grid container centered divided stackable textAlign="center">
          <Grid.Row
            columns={5}
            style={{ padding: '7em 0em', marginLeft: '75px' }}
          >
            <Grid.Column
              textAlign="center"
              style={{ padding: '1em 1em', maxWidth: 500 }}
            >
              <Card color="black" header="Saved Jobs" />
              {this.props.userJobs?.map((job, idx) => {
                return (
                  // <Draggable draggableId={job.publishedId}>
                  <Card key={idx}>
                    <Card.Content as="h1">{job.jobTitle}</Card.Content>
                    <Card.Content>Company: {job.companyName}</Card.Content>
                    <Card.Content>Location: {job.location}</Card.Content>
                    <Card.Content style={{ textAlign: 'center' }}>
                      <Modal
                        size="large"
                        closeIcon
                        trigger={
                          <Button color="blue" size="medium" type="submit">
                            View Job
                          </Button>
                        }
                        onClose={this.handleClose}
                      >
                        <Modal.Header style={{ textAlign: 'center' }}>
                          <p>{job.jobTitle}</p>
                          <p>{job.locations}</p>
                        </Modal.Header>
                        <Form onSubmit={handleSubmit(this.handleClose())}>
                          <Segment stacked>
                            <Grid column={2} textAlign="center">
                              <Grid.Row>
                                <Grid.Column width={8}>
                                  <Form.Field
                                    name="jobTitle"
                                    component={this.renderData}
                                    defaultValue={job.jobTitle}
                                    control={Input}
                                    label="Job Title"
                                  />
                                </Grid.Column>
                                <Grid.Column width={8}>
                                  <Form.Field
                                    name="location"
                                    component={this.renderData}
                                    defaultValue={job.location}
                                    control={Input}
                                    label="Location"
                                  />
                                </Grid.Column>
                              </Grid.Row>
                            </Grid>
                            <Grid column={2} textAlign="center">
                              <Grid.Row>
                                <Grid.Column width={8}>
                                  <Form.Field
                                    name="companyName"
                                    defaultValue={job.companyName}
                                    control={Input}
                                    label="Company Name"
                                  />
                                </Grid.Column>
                                <Grid.Column width={8}>
                                  <Form.Field
                                    name="jobURL"
                                    component={this.renderData}
                                    defaultValue={job.jobUrl}
                                    control={Input}
                                    label="Post URL"
                                  />
                                </Grid.Column>
                              </Grid.Row>
                            </Grid>
                            <Grid column={2} textAlign="center">
                              <Grid.Row>
                                <Grid.Column width={8}>
                                  <Form.Field
                                    name="level"
                                    component={this.renderData}
                                    defaultValue={job.level}
                                    control={Input}
                                    label="Level"
                                  />
                                </Grid.Column>
                                <Grid.Column width={8}>
                                  <Form.Field
                                    name="publishedDate"
                                    component={this.renderData}
                                    defaultValue={job.publishedDate}
                                    control={Input}
                                    label="PublishedDate"
                                  />
                                </Grid.Column>
                              </Grid.Row>
                            </Grid>
                            <Grid column={2} textAlign="center">
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
                            <Grid column={2} textAlign="center">
                              <Grid.Row>
                                <Grid.Column width={8}>
                                  <Form.TextArea
                                    label="Notes"
                                    placeholder="Add your note..."
                                  />
                                </Grid.Column>
                                <Grid.Column width={8}>
                                  <Form.Field
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
                        <Modal.Content>
                          <Modal.Description>
                            <div
                              dangerouslySetInnerHTML={{
                                __html: DOMPurify.sanitize(job.description),
                              }}
                              style={{ fontSize: '16px' }}
                            />
                          </Modal.Description>
                        </Modal.Content>
                      </Modal>
                    </Card.Content>
                  </Card>
                  // </Draggable>
                );
              })}
            </Grid.Column>
            <Grid.Column
              textAlign="center"
              style={{ padding: '1em 1em', maxWidth: 500 }}
            >
              <Card color="blue" header="Applying" />
            </Grid.Column>
            <GridColumn
              textAlign="center"
              style={{ padding: '1em 1em', maxWidth: 500 }}
            >
              <Card color="yellow" header="Interviewing" />
            </GridColumn>
            <GridColumn
              textAlign="center"
              style={{ padding: '1em 1em', maxWidth: 500 }}
            >
              <Card color="green" header="Offers" />
            </GridColumn>
            <GridColumn
              textAlign="center"
              style={{ padding: '1em 1em', maxWidth: 500 }}
            >
              <Card color="red" header="Rejected" />
            </GridColumn>
          </Grid.Row>
        </Grid>
      </div>
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
