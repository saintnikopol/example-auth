// Main page

// ----------------------
// IMPORTS

/* NPM */
import React from 'react';

// Use the Semantic UI React framework (https://react.semantic-ui.com)
// to get some nicely styled components
import { Grid } from 'semantic-ui-react';

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
    };
  }

  render() {
    return (
      <Grid className={css.main} padded>
        <Header />
        <Login />
        <Register />
        <User user={(this.props.data && this.props.data.session && this.props.data.session.user) || null} />
        <Users />
      </Grid>
    );
  }
}


export default graphql(sessionQuery)(MainComponent);
