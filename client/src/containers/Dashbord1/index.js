import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
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

  render() {
    console.log(this.props.userJobs);
    return (
      <>
        <Grid container centered relaxed stackable textAlign="center">
          <Grid.Row columns={2} style={{ padding: '10em 0em', marginLeft: '75px' }}>
            { this.props.userJobs?.map((job, idx) => {
              return (
                <Grid.Column stretched textAlign="center" style={{ padding: '1em 0em', maxWidth: 500 }}>
                  <Card textAlign="center" key={idx}>
                    <Card.Content as="h1">{job.jobTitle}</Card.Content>
                    <Card.Content>Company: {job.companyName}</Card.Content>
                    <Card.Content>Location: {job.location}</Card.Content>
                    <Card.Content>Status: {job.status}</Card.Content>
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
                          <p style={{ fontSize: '24px' }}>{job.jobTitle}</p>
                          <p>{job.locations}</p>
                        </Modal.Header>
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
                </Grid.Column>
              );
            })}
          </Grid.Row>
        </Grid>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    userJobs: state.jobs.userJobs,
    // JobClientError: state.jobs.getUserJobsClientError,
    // JobserverError: state.jobs.getUserJobsServerError,
  };
}

const composedComponent = compose(
  connect(mapStateToProps, { getUserJobs }),
)(UserJobList);


export default requireAuth(composedComponent);
