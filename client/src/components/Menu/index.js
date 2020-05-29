import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Input, Label, Menu } from 'semantic-ui-react';

export default class MiniMenu extends Component {
  state = { activeItem: 'inbox' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state;

    return (
      <Menu size="medium">
        <Menu.Item
          as={Link}
          to="/dashboard"
          name="savedjobs"
          active={activeItem === 'savedjobs'}
          onClick={this.handleItemClick}
        >
          <Label color="teal">3</Label>
          Saved Jobs
        </Menu.Item>

        <Menu.Item
          as={Link}
          to="/search"
          name="available"
          active={activeItem === 'available'}
          onClick={this.handleItemClick}
        >
          <Label>51</Label>
          Available Jobs
        </Menu.Item>

        <Menu.Item
          name="updates"
          active={activeItem === 'updates'}
          onClick={this.handleItemClick}
        >
          <Label>1</Label>
          Updates
        </Menu.Item>
        <Menu.Item>
          <Input icon="search" placeholder="Search jobs..." />
        </Menu.Item>
      </Menu>
    );
  }
}
