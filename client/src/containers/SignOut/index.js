import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Grid, Header, Image, Container, Message, Button } from 'semantic-ui-react';
import { Helmet } from 'react-helmet';
import LogoImg from '../../images/logoAppTitle.png';
import signOut from '../../actions/auth';
// import requireAuth from '../../hoc/requireAuth';

class SignOut extends Component {
  componentDidMount() {
    this.props.signOut();
  }

  render() {
    return (
      <div>
        <Helmet>
          <style>{'body { background-color: #37373b; }'}</style>
        </Helmet>
        <Grid textAlign="center" style={{ height: '100vh' }} verticalAlign="middle">
          <Grid.Column style={{ maxWidth: 500 }}>
            <Header color="blue" textAlign="center" style={{ fontSize: '34px' }}>
              <Image src={LogoImg} />
              You are now signed-out
            </Header>
            <Container>
              <Message error header="Leaving so soon? You're always welcome to come back!" style={{ marginTop: '20px' }} />
              <Button.Group style={{ marginTop: '20px' }}>
                <Button as={Link} to="/signin" inverted color="blue" content="Go back to Sign In" />
                <Button.Or />
                <Button as={Link} to="/signup" inverted color="green" content="Go back to Sign Up" />
              </Button.Group>
            </Container>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

// export default requireAuth(connect(null, { signOut })(SignOut));
export default connect(null, { signOut })(SignOut);
