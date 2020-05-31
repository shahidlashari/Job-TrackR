import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Container, Form, FormInput, Menu, MenuItem } from 'semantic-ui-react';
import { addBoard } from '../../actions/draganddropActions';
import Board from '../../components/Board';

const JobBoardHome = ({ boards, boardOrder, dispatch }) => {
  // this is the home site that shows you your boards and you can also create a Board here.

  const [newBoardTitle, setNewBoardTitle] = useState('');

  const handleChange = (e) => {
    setNewBoardTitle(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addBoard(newBoardTitle));
  };

  const renderBoards = () => {
    return boardOrder.map((boardID) => {
      const board = boards[boardID];

      return (
        <Link
          key={boardID}
          to={`/dashboard/${board.id}` ? board.id === 'board-1' : '/dashboard'}
          style={{ textDecoration: 'red' }}
        >
          <Board {...board} />
        </Link>
      );
    });
  };
  const renderCreateBoard = () => {
    return (
      <Form onSubmit={handleSubmit} style={{ textAlign: 'center' }}>
        <h3>Create a Job Board!</h3>
        <FormInput
          onChange={handleChange}
          value={newBoardTitle}
          placeholder="Your new job board"
          type="text"
        />
      </Form>
    );
  };
  return (
    <Menu vertical>
      <MenuItem>{renderBoards()}</MenuItem>
      <MenuItem>{renderCreateBoard()}</MenuItem>
    </Menu>
  );
};
const mapStateToProps = (state) => ({
  boards: state.boards,
  boardOrder: state.boardOrder,
});

export default connect(mapStateToProps)(JobBoardHome);
