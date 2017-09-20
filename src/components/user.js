// User data  If a user is logged in, this will populate.  It should also
// be sent down with the original HTML render.

// ----------------------
// IMPORTS

/* NPM */

// React
import React from 'react';
import { Segment, Grid, Button, Form, Header } from 'semantic-ui-react';


/* App */

// ----------------------

const User = props => {
  const user = (props.user) || {
    id: '',
    email: '',
    firstName: '',
    lastName: '',
  };
  const fields = [
    {
      name: 'id',
      label: 'User ID',
      value: user.id,
    },
    {
      name: 'email',
      label: 'E-mail',
      value: user.email,
    },
    {
      name: 'firstName',
      label: 'First name',
      value: user.firstName,
    },
    {
      name: 'lastName',
      label: 'Last name',
      value: user.lastName,
    },
  ];

  return (
    <Grid.Row>
      <Grid.Column>
        <Segment color="violet">
          <Header>Logged in details</Header>
          <p>
            This data is pulled back from the GraphQL server using the JWT token that&rsquo;s
            stored in <em>localStorage</em> or in the <em>jwt</em> cookie that&rsquo;s sent
            to the server. Custom middleware handle passing the JWT to our GraphQL request.
          </p>
          <Form>
            {fields.map(field => (
              <Form.Input
                readOnly
                key={field.name}
                name={field.name}
                label={field.label}
                value={field.value} />
            ))}
            <Button.Group>
              <Button
                type="submit"
                positive>Update</Button>
              <Button.Or text="or" />
              <Button
                type="button"
                onClick={this.clear}
                negative>Clear</Button>
            </Button.Group>

          </Form>
        </Segment>
      </Grid.Column>
    </Grid.Row>
  );
};

export default User;
