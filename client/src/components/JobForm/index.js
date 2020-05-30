import React from 'react';
import { Card, Container, Icon, CardDescription } from 'semantic-ui-react';

const JobForm = React.memo(
  ({ list, text = '', onChange, closeForm, children }) => {
    const placeholder = list
      ? 'Enter list title...'
      : 'Enter a title for this card...';

    return (
      <Container>
        <Card>
          <CardDescription
            placeholder={placeholder}
            autoFocus
            value={text}
            onChange={(e) => onChange(e)}
            onBlur={closeForm}
          />
        </Card>
        <Container>
          {children}
          <Icon onMouseDown={closeForm}>Close</Icon>
        </Container>
      </Container>
    );
  },
);

export default JobForm;
