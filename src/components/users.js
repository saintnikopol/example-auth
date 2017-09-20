// User data  If a user is logged in, this will populate.  It should also
// be sent down with the original HTML render.

// ----------------------
// IMPORTS

/* NPM */

// React
import React from 'react';
import { Segment, Grid, Accordion, Header } from 'semantic-ui-react';

// GraphQL connector
import { graphql } from 'react-apollo';

/* App */

// GraphQL query
import usersQuery from 'src/gql/queries/users.gql';

import css from './users.css';
// ----------------------


// ----------------------

// Username and password hints, so we can copy and paste them into the
// form fields and test working login credentials
const emailAndPasswords = users => [{
  title: (
    <span className={css.title}>Hint: For sample e-mail/password combos, click here</span>
  ),
  content: (
    <ul>
      {users.map(user => (
        <li className={css.li} key={user.email}>
          E-mail: <span className={css.highlight}>{user.email}</span> &middot;
          Password: <span className={css.highlight}>{user.password}</span>
          FirstName: <span className={css.highlight}>{user.firstName}</span>
          LastName: <span className={css.highlight}>{user.lastName}</span>
        </li>
      ))}
    </ul>
  ),
}];

const Users = props => {
  // console.log("const Users = props => { props  === ", props);
  // const users = props.data || [];
  const users = (props.data && props.data.users) || [];
  console.log('const Users = props => { props  === ', props);

  this.componentWillReceiveProps = nextProps => {
    console.log('this.componentWillReceiveProps = nextProps => { nextProps  === ', nextProps);
  }

  return (
    <Grid.Row>
      <Grid.Column>
        <Segment color="blue" inverted>
          <Header>Existing users</Header>
          Show working e-mail/password combinations
          <Accordion panels={emailAndPasswords(users)} />
        </Segment>

      </Grid.Column>
    </Grid.Row>
  );
};

export default graphql(usersQuery)(Users);
