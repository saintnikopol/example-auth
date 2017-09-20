// Main page

// ----------------------
// IMPORTS

/* NPM */
import React from 'react';

// Use the Semantic UI React framework (https://react.semantic-ui.com)
// to get some nicely styled components
import { Grid, Segment, Button } from 'semantic-ui-react';

/* App */

// Components
import Header from './header';
import Login from './login';
import Register from './register';
// import Social from './social';
import User from './user';
import Users from './users';

// Styles
import css from './main.css';

// GraphQL connector
import { graphql } from 'react-apollo';

// GraphQL query
import sessionQuery from 'src/gql/queries/session.gql';

// ----------------------

class MainComponent extends React.Component {
  constructor(props) {
    super(props);
    const user = (props.data && props.data.session && props.data.session.user) || null;
    this.state = {
      // form: 'login' // 'register' |
      user,
      isLogin: true,
    };
  }

  componentWillReceiveProps = nextProps => {
    const newUser = (nextProps.data && nextProps.data.session && nextProps.data.session.user) || null;
    if (!(newUser === this.user)) {
      console.log('user === ', newUser);
      this.setState(Object.assign({}, this.state, { user: newUser }));
    }
  }

  setFormLogin = () => {
    this.setState(Object.assign({}, this.state, {isLogin: true, isRegister: false }));
  }

  setFormRegister = () => {
    this.setState(Object.assign({}, this.state, {isLogin: false, isRegister: true }));
  }

  logout = () => {
    window.localStorage.setItem('reactQLJWT', '');
    this.setState({ isLogin: true, isRegister: false, user: null });
    console.log('logout');
  }

  render() {
    return (
      <Grid className={css.main} padded>
        <Header />
        <Grid.Row>
          <Grid.Column>
            <Segment >
              <Button.Group>
                {!this.state.user && this.state.isLogin ? <Button
                  type="button"
                  onClick={this.setFormRegister}
                  positive>Show Registration Form</Button> : ''}
                {!this.state.user && this.state.isRegister ? <Button
                  type="button"
                  onClick={this.setFormLogin}
                  negative>Show Login Form</Button> : ''}
                {this.state.user ? <Button
                  type="button"
                  onClick={this.logout}
                  negative>Logout</Button> : ''}
              </Button.Group>
            </Segment>
          </Grid.Column>
        </Grid.Row>
        {this.state.user ? <User user={this.state.user || null} /> : '' }
        {!this.state.user && this.state.isLogin ? <Login /> : ''}
        {!this.state.user && this.state.isRegister ? <Register /> : ''}
        <Users />
      </Grid>
    );
  }
}


export default graphql(sessionQuery)(MainComponent);
