import React from 'react';
import styled from 'styled-components';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  
`;

const Form = styled.form`
  width: 400px;
  height: 250px;
  border-radius: 10px;
  background-color: green;
  padding: 15px;
`;

const Title = styled.h3`
  text-align: center;
`;
const Label = styled.label`
  display: block;
`;

const Input = styled.input``;


class AddBookingForm extends React.PureComponent {
  state = {
    name: '',
    email: '',
  };

  onNameChange = (event) => this.setState({ name: event.target.value });
  onEmailChange = (event) => this.setState({ email: event.target.value });

  handleSubmit = (event) => {
    event.preventDefault();
    const { name, email } = this.state;
    if (name.length && email.length) {
      this.props.onComplete({ name, email });
    } else {
      this.props.onComplete();
    }

  };
  render() {
    const { title } = this.props;
    return (
      <Overlay>
        <Form onSubmit={this.handleSubmit}>
          <Title>{title}</Title>
          <Label>Name</Label>
          <Input type="text" value={this.state.name} onChange={this.onNameChange} name="name" />
          <Label>Email</Label>
          <Input type="text" value={this.state.email} onChange={this.onEmailChange} name="email" />
          <input type="submit" value="Submit" />
        </Form>
      </Overlay>
    );
  }
}

export default AddBookingForm;