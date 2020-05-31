import React from 'react';
import { Card, Container, CardDescription, Button, Form, FormInput } from 'semantic-ui-react';

const JobForm = React.memo(
  ({ list, text = '', onChange, closeForm, children }) => {
    const placeholder = list
      ? 'List Title'
      : 'Description';

    return (
      <Container>
        <Form color="blue">
          <FormInput
            placeholder={placeholder}
            autoFocus
            value={text}
            onChange={(e) => onChange(e)}
            onBlur={closeForm}
          />
        </Form>
        <Container>
          {children}
          <Button onMouseDown={closeForm}>Close</Button>
        </Container>
      </Container>
    );
  },
);

export default JobForm;
