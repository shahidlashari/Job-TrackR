import React, { Component } from 'react';
import { Card, Grid, Header, Container, GridColumn, GridRow } from 'semantic-ui-react';
import CardExampleGroups from '../JobCards';
import MiniMenu from '../../components/Menu';
import Drag from '../../components/DragnDrop';

class Dashboard extends Component {


  render() {
    return (
      <Grid>
        <GridColumn>
          <Container stackable style={{ marginTop: '4em', marginBottom: '5em' }}>
            <Header as="h1" textAlign="center">Job TrackR Dashboard</Header>
            <Grid container divided stackable>
              <GridRow columns={5}>
                <Grid.Column>
                  <Card color='black' header="Saved Jobs">Saved Jobs</Card>
                  <CardExampleGroups />
                </Grid.Column>
                <Grid.Column>
                  <Card color='blue' header="Applying">Applying</Card>
                </Grid.Column>
                <Grid.Column>
                  <Card color='yellow' header="Interviewing">Interviewing</Card>
                </Grid.Column>
                <Grid.Column>
                  <Card color='green' header="Offers">Offers</Card>
                </Grid.Column>
                <Grid.Column>
                  <Card color='red' header="Rejected">Rejected</Card>
                </Grid.Column>
              </GridRow>
            </Grid>
            <Drag />
          </Container>
        </GridColumn>
      </Grid>
    );
  }
}


export default Dashboard;
