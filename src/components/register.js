// Login page

// ----------------------
// IMPORTS

/* NPM */
import React from 'react';
import PropTypes from 'prop-types';

// Use the Semantic UI React framework (https://react.semantic-ui.com)
// to get some nicely styled components
import {
  Segment,
  Grid,
  Button,
  Form,
  // Accordion,
  Header,
  Message,
} from 'semantic-ui-react';

// GraphQL decorator to handle our login mutation
import { graphql } from 'react-apollo';

/* App */

// Get the users that were added to the DB as fixtures
import { users } from 'src/common';

// Get the login mutation
import sessionQuery from 'src/gql/queries/session.gql';
// import loginMutation from 'src/gql/mutations/login.gql';
import registerMutation from 'src/gql/mutations/createUser.gql';

// Styles
import css from './login.css';

// ----------------------

// Username and password hints, so we can copy and paste them into the
// form fields and test working login credentials
/*
const emailAndPasswords = [{
  title: (
    <span className={css.title}>Hint: For sample e-mail/password combos, click here</span>
  ),
  content: (
    <ul>
      {users.map(user => (
        <li className={css.li} key={user.email}>
          E-mail: <span className={css.highlight}>{user.email}</span> &middot;
          Password: <span className={css.highlight}>{user.password}</span>
        </li>
      ))}
    </ul>
  ),
}];
*/

// @graphql(loginMutation, {
//   options: {
//     update(proxy, { data: { login } }) {
//       const data = proxy.readQuery({
//         query: sessionQuery,
//       });
//       data.session = login;
//       proxy.writeQuery({ query: sessionQuery, data });
//     },
//   },
// })
//
@graphql(registerMutation, {
  options: {
    update(proxy, { data: { createUser } }) {
      // const { data: { login } } = megaArgs;
      // console.log('update(proxy, megaArgs) { megaArgs === ', megaArgs);
      const data = proxy.readQuery({
        query: sessionQuery,
      });
      data.session = createUser;
      proxy.writeQuery({ query: sessionQuery, data });


      // const data2 = proxy.readQuery({
      //   query: usersQuery,
      // });
      // data.users = createUser;
      // proxy.writeQuery({ query: sessionQuery, data });
    },
  },
})
export default class Login extends React.PureComponent {
  static propTypes = {
    mutate: PropTypes.func,
  }

  static defaultProps = {
    mutate: null,
  }

  state = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    errors: [],
  };

  // Set the form state locally. We could use Redux for this (if we care about
  // the values in other parts of our app), but we'll keep this simple by
  // keeping field -> vals locally
  handleChange = (e, { name, value }) => this.setState({
    [name]: value,
  })

  // Clear the form and errors
  clear = () => this.setState({ email: '', password: '', firstName: '', lastName: '', errors: [] })


  // This is the function that will attempt the login back to the GraphQL
  // server, and handle errors
  tryRegister = async () => {
    try {
      // Send the login request to the server using our email/password,
      // await the response, and parse the `data.login` entry point
      const { data: { createUser } } = await this.props.mutate({
        variables: {
          email: this.state.email,
          password: this.state.password,
          firstName: this.state.firstName,
          lastName: this.state.lastName,
        },
      });

      // Do we have any errors?  If so, set them on the state so we can
      // re-render the login form with the right message
      if (createUser.errors) {
        this.setState({ errors: createUser.errors });
        return;
      }

      // Set the errors to null, in case the user attempted a login previously
      this.setState({ errors: [] });

      // await this.tryLogin();
      // Store the returned JWT token in `localStorage` if we're in the
      // browser, so we can pass that over in subsequent requests
      if (!SERVER) {
        // window.localStorage.setItem('reactQLJWT', login.jwt);
      }
    } catch (e) {
      // Some kind of error was returned -- display it in the console
      // eslint-disable-next-line no-console
      console.error('GraphQL error: ', e.message);
    }
  }
  /*

  // This is the function that will attempt the login back to the GraphQL
  // server, and handle errors
  tryLogin = async () => {
    try {
      // Send the login request to the server using our email/password,
      // await the response, and parse the `data.login` entry point
      const { data: { login } } = await this.props.mutate({
        variables: {
          email: this.state.email,
          password: this.state.password,
        },
      });

      console.log("if (login.errors) { login === ", login);

      // Do we have any errors?  If so, set them on the state so we can
      // re-render the login form with the right message
      if (login.errors) {
        this.setState({ errors: login.errors });
        return;
      }

      // Set the errors to null, in case the user attempted a login previously
      this.setState({ errors: [] });

      // Store the returned JWT token in `localStorage` if we're in the
      // browser, so we can pass that over in subsequent requests
      if (!SERVER) {
        window.localStorage.setItem('reactQLJWT', login.jwt);
      }
    } catch (e) {
      // Some kind of error was returned -- display it in the console
      // eslint-disable-next-line no-console
      console.error('GraphQL error: ', e.message);
    }
  }
*/

  render() {
    // Do we have any errors to display?  Find out by checking the length
    // of the errors array
    const isError = !!this.state.errors.length;
    const { email, password, firstName, lastName } = this.state;

    return (
      <Grid.Row>
        <Grid.Column>
          {/* Login form */}
          <Segment color="teal">
            <Header>Register</Header>

            <Form onSubmit={this.tryRegister} error={isError}>
              <Form.Input
                name="email"
                label="E-mail"
                placeholder="Enter your e-mail"
                value={email}
                onChange={this.handleChange} />
              <Form.Input
                name="firstName"
                label="First name"
                placeholder="Enter your first name"
                value={firstName}
                onChange={this.handleChange} />
              <Form.Input
                name="lastName"
                label="Last name"
                placeholder="Enter your last name"
                value={lastName}
                onChange={this.handleChange} />
              <Form.Input
                name="password"
                type="password"
                label="Password"
                placeholder="Enter your password"
                value={password}
                onChange={this.handleChange} />
              <Message
                error
                header="Couldn't register"
                content={(
                  <ul>
                    {this.state.errors.map(error => (
                      <li key={error.field}>{error.message}</li>
                    ))}
                  </ul>
                )} />
              <Button.Group>
                <Button
                  type="submit"
                  positive>Register</Button>
                <Button.Or text="or" />
                <Button
                  type="button"
                  onClick={this.clear}
                  negative>Clear</Button>
              </Button.Group>
            </Form>
          </Segment>
          {/*
          <Segment color="blue" inverted>
             Show working e-mail/password combinations
            <Accordion panels={emailAndPasswords} />
          </Segment>
*/}
        </Grid.Column>
      </Grid.Row>
    );
  }
}
