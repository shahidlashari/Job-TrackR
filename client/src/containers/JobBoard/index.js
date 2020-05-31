import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { Container, Grid, GridColumn, Header } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { sort, setActiveBoard } from '../../actions/draganddropActions';
import JobCreator from '../JobCreator';
import JobList from '../JobList';

class JobBoard extends Component {
  componentDidMount() {
    // set active trello board here
    const { boardID } = this.props.match.params;

    this.props.dispatch(setActiveBoard(boardID));
  }

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
  };

  render() {
    const { lists, cards, match, boards } = this.props;
    const { boardID } = 'board-1';
    const board = boards[boardID];
    if (!board) {
      return <h1>Board not found</h1>;
    }
    const listOrder = board.lists;

    return (
      <Grid>
        <GridColumn>
          <Container style={{ marginTop: '100px', marginBottom: '100px' }}>
            <Header as="h1" textAlign="center">Job TrackR Board</Header>
            <DragDropContext onDragEnd={this.onDragEnd}>
              <Link to="/Dashboard">Go Back</Link>
              {/* <h2>{board.title}</h2> */}
              <Droppable droppableId="all-lists" direction="horizontal" type="list">
                {(provided) => (
                  <Container
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {listOrder.map((listID, index) => {
                      const list = lists[listID];
                      return (
                        <JobList
                          listID={list.id}
                          key={list.id}
                          title={list.title}
                          cards={list.cards}
                          index={index}
                        />
                      );
                    })}
                    {provided.placeholder}
                    <JobCreator list />
                  </Container>
                )}
              </Droppable>
            </DragDropContext>
          </Container>
        </GridColumn>
      </Grid>

    );
  }
}

const mapStateToProps = (state) => ({
  lists: state.lists,
  cards: state.cards,
  boards: state.boards,
});

export default connect(mapStateToProps)(JobBoard);
