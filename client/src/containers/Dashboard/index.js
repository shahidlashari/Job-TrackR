import React, { Component } from 'react';
import { Grid, Container } from 'semantic-ui-react';
import SidebarExampleVisible from '../../components/Sidebar';
import ModalScrollingExample from '../../components/Modals';

class Dashboard extends Component {


  render() {
    return (
      <Grid>
        <Container>
          <SidebarExampleVisible />
          <ModalScrollingExample />
        </Container>
      </Grid>
    );
  }
}


export default Dashboard;
