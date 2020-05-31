import React from 'react';
import { Header, Container } from 'semantic-ui-react';

const Board = ({ title }) => {
  return (
    <Container style={{ marginBottom: '20px' }}>
      <Header textAlign="center">{title}</Header>
    </Container>
  );
};

export default Board;
