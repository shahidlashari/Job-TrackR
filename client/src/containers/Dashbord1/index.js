/* eslint-disable react/no-danger */
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Grid, Icon, Form, Modal, Input, Container, Button, Card, GridColumn } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import createDOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';
import { Droppable, Draggable, DragDropContext } from 'react-beautiful-dnd';
import requireAuth from '../../hoc/requireAuth';

import { getUserJobs, sort } from '../../actions/jobActions';

const { window } = new JSDOM('');
const DOMPurify = createDOMPurify(window);

class UserJobList extends Component {
  componentDidMount() {
    this.props.getUserJobs();
  }


  onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    this.props.dispatch(
      sort(source.droppableId, destination.droppableId, source.index, destination.index, draggableId),
    );
  };

  render() {
    console.log(this.props.userJobs);
    return (
      <>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Grid container centered divided stackable>
            <Grid.Row columns={5} style={{ padding: '4em 0em', marginLeft: '75px' }}>
              <Grid.Column textAlign="center" id="savedjobs" listId="savedjobs" style={{ padding: '1em 1em', maxWidth: 500 }}>
                <Card color="black" header="Saved Jobs" />
                <Droppable droppableId="savedjobs">
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      style={{ backgroundColor: provided.isDragging ? 'green' : 'lightblue' }}
                      {...provided.droppableProps}
                    >
                      {this.props.userJobs?.map((job, idx) => {
                        return (
                          <Draggable key={job.publishedId} draggableId={String(job.publishedId)} index={idx}>
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <Card key={idx}>
                                  <Card.Content as="h1">{job.jobTitle}</Card.Content>
                                  <Card.Content>Company: {job.companyName}</Card.Content>
                                  <Card.Content>Location: {job.location}</Card.Content>
                                  <Card.Content>Status: {job.status}</Card.Content>
                                  <Card.Content>Id: {job.publishedId}</Card.Content>
                                  <Card.Content style={{ textAlign: 'center' }}>
                                    <Modal
                                      size="large"
                                      closeIcon
                                      trigger={<Button
                                        color="blue"
                                        size="medium"
                                        type="submit"
                                        textAlign="center"
                                        style={{ marginRight: '80px' }}
                                      >
                                        View Job
                                      </Button>}
                                    >
                                      <Modal.Header style={{ textAlign: 'center' }}>
                                        <p style={{ fontSize: '24px' }}>{job.jobTitle}</p>
                                        <p>{job.locations}</p>
                                      </Modal.Header>
                                      <Form>
                                        <Form.Group widths="equal">
                                          <Form.Field
                                            id="form-input-control-jobTitle"
                                            defaultValue={job.jobTitle}
                                            control={Input}
                                            label="Job Title"
                                          />
                                          <Form.Field
                                            id="form-input-control-location"
                                            defaultValue={job.location}
                                            control={Input}
                                            label="Location"
                                          />
                                        </Form.Group>
                                        <Form.Field
                                          id="form-button-control-CompanyName"
                                          defaultValue={job.companyName}
                                          control={Input}
                                          label="Company Name"
                                        />
                                        <Form.Field
                                          id="form-button-control-PostURL"
                                          defaultValue={job.jobUrl}
                                          control={Input}
                                          label="Post URL"
                                        />
                                      </Form>
                                      <Modal.Content>
                                        <Modal.Description>
                                          <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(job.description) }} style={{ fontSize: '20px' }} />
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
                              </div>
                            )}
                          </Draggable>
                        );
                      })}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </Grid.Column>
              <Grid.Column textAlign="center" id="applying" style={{ padding: '1em 1em', maxWidth: 500 }}>
                <Card color="blue" header="Applying" />
                <Droppable droppableId="applying">
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      style={{ backgroundColor: provided.isDragging ? 'green' : 'lightblue' }}
                      {...provided.droppableProps}
                    >
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </Grid.Column>
              <GridColumn textAlign="center" id="interviewing" listId="interviewing" style={{ padding: '1em 1em', maxWidth: 500 }}>
                <Card color="yellow" header="Interviewing" />
                <Droppable droppableId="interviewing">
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      style={{ backgroundColor: provided.isDragging ? 'green' : 'lightblue' }}
                      {...provided.droppableProps}
                    >
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </GridColumn>
              <GridColumn textAlign="center" id="offers" listId="offers" style={{ padding: '1em 1em', maxWidth: 500 }}>
                <Card color="green" header="Offers" />
                <Droppable droppableId="offers">
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      style={{ backgroundColor: provided.isDragging ? 'green' : 'lightblue' }}
                      {...provided.droppableProps}
                    >
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </GridColumn>
              <GridColumn textAlign="center" id="rejected" listId="rejected" style={{ padding: '1em 1em', maxWidth: 500 }}>
                <Card color="red" header="Rejected" />
                <Droppable droppableId="rejected">
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      style={{ backgroundColor: provided.isDragging ? 'green' : 'lightblue' }}
                      {...provided.droppableProps}
                    >
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </GridColumn>
            </Grid.Row>
          </Grid>
        </DragDropContext>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    userJobs: state.jobs.userJobs,
    columnJobs: state.jobs.columnJobs,
    // JobClientError: state.jobs.getUserJobsClientError,
    // JobserverError: state.jobs.getUserJobsServerError,
  };
}

const composedComponent = compose(
  connect(mapStateToProps, { getUserJobs, sort }),
)(UserJobList);


export default requireAuth(composedComponent);
