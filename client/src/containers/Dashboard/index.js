import React, { Component } from 'react';
import { Card, Grid, Header, Container, GridColumn, GridRow } from 'semantic-ui-react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { connect } from 'react-redux';
import CardExampleGroups from '../JobCards';
import requireAuth from '../../hoc/requireAuth';
import { sort } from '../../actions/draganddropActions';
import './style.css';
import { Example } from '../Drag';
import JobBoard from '../JobBoard';
import JobBoardHome from '../JobBoardHome';
import JobList from '../JobList';
import JobCreator from '../JobCreator';


class Dashboard extends Component {
  onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }

    this.props.dispatch(
      sort(
        source.droppableId,
        destination.droppableId,
        source.index,
        destination.index,
        draggableId,
        type,
      ),
    );
  }

  render() {
    const { list } = this.props;
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Grid>
          <GridColumn>
            <Container fluid style={{ marginTop: '4em', marginBottom: '5em' }}>
              <Header as="h1" textAlign="center">Job TrackR Dashboard</Header>
              {/* <JobBoard /> */}
              <Grid container stackable>
                <GridRow columns={7}>
                  <GridColumn>
                    <JobBoardHome />
                  </GridColumn>
                  <GridColumn />
                  <Grid.Column>
                    <Card color="black" header="Saved Jobs" />
                    <Droppable droppableId="all-lists" direction="horizontal" type="list">
                      {(provided) => (
                        <Container
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                        >
                          <JobList
                            listID={list.id}
                            key={list.id}
                            title={list.title}
                            cards={list.cards}
                            index={1}
                          />
                          {provided.placeholder}
                          <JobCreator list />
                        </Container>
                      )}
                    </Droppable>
                  </Grid.Column>
                  <Grid.Column>
                    <Card color="blue" header="Applying" />
                    {/* <Example /> */}
                    <Droppable droppableId="all-lists" direction="horizontal" type="list">
                      {(provided) => (
                        <Container
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                        >
                          <JobList
                            listID={list.id}
                            key={list.id}
                            title={list.title}
                            cards={list.cards}
                            index={1}
                          />
                          {provided.placeholder}
                          <JobCreator list />
                        </Container>
                      )}
                    </Droppable>
                  </Grid.Column>
                  <Grid.Column>
                    <Card color="yellow" header="Interviewing" />
                    <Droppable droppableId="all-lists" direction="horizontal" type="list">
                      {(provided) => (
                        <Container
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                        >
                          <JobList
                            listID={list.id}
                            key={list.id}
                            title={list.title}
                            cards={list.cards}
                            index={1}
                          />
                          {provided.placeholder}
                          <JobCreator list />
                        </Container>
                      )}
                    </Droppable>
                  </Grid.Column>
                  <Grid.Column>
                    <Card color="green" header="Offers" />
                    <Droppable droppableId="all-lists" direction="horizontal" type="list">
                      {(provided) => (
                        <Container
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                        >
                          <JobList
                            listID={list.id}
                            key={list.id}
                            title={list.title}
                            cards={list.cards}
                            index={1}
                          />
                          {provided.placeholder}
                          <JobCreator list />
                        </Container>
                      )}
                    </Droppable>
                  </Grid.Column>
                  <Grid.Column>
                    <Card color="red" header="Rejected" />
                    <Droppable droppableId="all-lists" direction="horizontal" type="list">
                      {(provided) => (
                        <Container
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                        >
                          <JobList
                            listID={list.id}
                            key={list.id}
                            title={list.title}
                            cards={list.cards}
                            index={1}
                          />
                          {provided.placeholder}
                          <JobCreator card />
                        </Container>
                      )}
                    </Droppable>
                  </Grid.Column>
                </GridRow>
              </Grid>
            </Container>
          </GridColumn>
        </Grid>
      </DragDropContext>
    );
  }
}

const mapStateToProps = (state) => ({
  list: state.list,
  cards: state.cards,
});


export default requireAuth(connect(mapStateToProps)(Dashboard));
