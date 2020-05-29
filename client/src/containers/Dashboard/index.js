import React, { Component } from 'react';
import { Card, Grid, Header, Container, GridColumn, GridRow } from 'semantic-ui-react';
import CardExampleGroups from '../JobCards';
// import MiniMenu from '../../components/Menu';
// import Drag from '../../components/DragnDrop';

import requireAuth from '../../hoc/requireAuth';

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
                  <Card color="black">Saved Jobs</Card>
                  <CardExampleGroups />
                </Grid.Column>
                <Grid.Column>
                  <Card color="blue">Applying</Card>
                </Grid.Column>
                <Grid.Column>
                  <Card color="yellow">Interviewing</Card>
                </Grid.Column>
                <Grid.Column>
                  <Card color="green">Offers</Card>
                </Grid.Column>
                <Grid.Column>
                  <Card color="red">Rejected</Card>
                </Grid.Column>
              </GridRow>
            </Grid>
            {/* <Drag /> */}
          </Container>
        </GridColumn>
      </Grid>
    );
  }
}


export default requireAuth(Dashboard);
