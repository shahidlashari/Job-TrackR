import React, { Component } from 'react';
import { Card, Grid, Header, Container, GridColumn, GridRow } from 'semantic-ui-react';
import CardExampleGroups from '../JobCards';
// import Drag from '../../components/DragnDrop';
import requireAuth from '../../hoc/requireAuth';
import './style.css';
import { Example } from '../Drag';
import JobList from '../../components/JobList';

class Dashboard extends Component {
  render() {
    return (
      <Grid>
        <GridColumn>
          <Container style={{ marginTop: '4em', marginBottom: '5em' }}>
            <Header as="h1" textAlign="center">Job TrackR Dashboard</Header>
            <Grid container divided stackable>
              <GridRow columns={5}>
                <Grid.Column>
                  <Card color="black" header="Saved Jobs" />
                  <CardExampleGroups />
                </Grid.Column>
                <Grid.Column>
                  <Card color="blue" header="Applying" />
                  <Example />
                  {/* <Droppable droppableId={this.props}>
                    {provided => (
                      <CardExampleGroups
                        innerRef={provided.innerRef}
                        {...provided.droppableProps}
                      >
                      {provided.placeholder}
                      </CardExampleGroups>
                    )}
                  </Droppable> */}
                </Grid.Column>
                <Grid.Column>
                  <Card color="yellow" header="Interviewing" />
                  {/* <JobList /> */}
                </Grid.Column>
                <Grid.Column>
                  <Card color="green" header="Offers" />
                </Grid.Column>
                <Grid.Column>
                  <Card color="red" header="Rejected" />
                </Grid.Column>
              </GridRow>
            </Grid>
          </Container>
        </GridColumn>
      </Grid>
    );
  }
}


export default requireAuth(Dashboard);
