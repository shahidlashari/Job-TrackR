import React from 'react';
import { Link } from 'react-router-dom';
import { Header, Icon, Menu, Segment, Sidebar, ItemDescription } from 'semantic-ui-react';
import CardExampleGroups from '../JobCards';

const SidebarExampleVisible = () => (
  <Sidebar.Pushable as={Segment}>
    <Sidebar
      as={Menu}
      animation="slide out"
      icon="labeled"
      inverted
      vertical
      visible
      width="thin"
    >
      <Menu.Item as={Link} to="/">
        <Icon name='home' />
        Home
      </Menu.Item>
      <Menu.Item as={Link} to="/jobsearch">
        <Icon name='search' />
        Job Search
      </Menu.Item>
      <Menu.Item as={Link} to="/signout">
        <Icon name='sign-out' />
        Sign Out
      </Menu.Item>
    </Sidebar>

    <Sidebar.Pusher>
      <Segment basic>
        <Header as="h1">Job Trackr Dashboard</Header>
        <ItemDescription as="h4">This is your dashboard that allows you to save jobs that you would like to apply for!</ItemDescription>
        <CardExampleGroups />
      </Segment>
    </Sidebar.Pusher>
  </Sidebar.Pushable>
)

export default SidebarExampleVisible;
