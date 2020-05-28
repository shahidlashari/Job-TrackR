/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

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

class Search extends Component {
  onSubmit = async (formValues, dispatch) => {
    const { role, level, location } = formValues;
    console.log(formValues);
    try {
      // eslint-disable-next-line no-sequences
      const { data } = await axios.get(
        `/api/job/search?role=${role}&level=${level}&location=${location}`,
      );
      dispatch({ type: SEARCH_JOBS, payload: data });
      this.props.history.push('/search');
    } catch (e) {
      dispatch({ type: SEARCH_JOBS_ERROR, payload: e });
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
        onBlur={() => console.log('hi')}
        placeholder={field.placeholder}
      />
    );
  };

  // renderJobList = () => {
  //   if (this.props.job.searchJob.data.length === 0) {
  //     return <Header content='No Job yet'/>
  //   } else {
  //     return this.props.job.searchJob.data.map({ id, locations,categorie }) => {
  //       return (
  //         <List.Item key={id}>
  //           <List.Content>
  //             <List.Header>{categorie}</List.Header>
  //             <List.Description>location</List.Description>
  //           </List.Content>
  //         </List.Item>
  //       )
  //     })
  //   }
  // }

  // renderLevel = ({ input, meta }) => {
  //   return (
  //     <Form.Input
  //       {...input}
  //       error={meta.touched && meta.error}
  //       icon="sort amount up"
  //       iconPosition="left"
  //       autoComplete="off"
  //       placeholder="Select Level"
  //     />
  //   );
  // }

  // renderLocation = ({ input, meta }) => {
  //   return (
  //     <Form.Input
  //       {...input}
  //       error={meta.touched && meta.error}
  //       icon="map marker alternate"
  //       iconPosition="left"
  //       autoComplete="off"
  //       placeholder="Select Location"
  //     />
  //   );

  render() {
    const { handleSubmit, submitting, submitFailed } = this.props;
    return (
      <Form
        style={{ minHeight: 0, padding: '10em 1em', margin: '5em' }}
        size="large"
        onSubmit={handleSubmit(this.onSubmit)}
      >
        <Segment style={{ padding: '-2em 0em' }} vertical>
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
          <Modal
            trigger={
              <Button
                color="teal"
                size="large"
                type="submit"
                disabled={submitting || submitFailed}
              >
                Search
              </Button>
            }
          >
            <Modal.Header>Select a Photo</Modal.Header>
            <Modal.Content>
              <Modal.Description>
                <Header>Default Profile Image</Header>
                <p>
                  this is where I render job list
                  {/* {this.props.jobs.searchJob.data} */}
                </p>
              </Modal.Description>
            </Modal.Content>
          </Modal>

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
      </Form>
    );
  }
}

export default reduxForm({
  form: 'Search',
})(Search);
