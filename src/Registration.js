import React, {Component} from 'react';

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import './Registration.css'
import RegistrationAlert from './RegistrationAlert'

class Registration extends Component {

  constructor(props) {
    super(props);
    this.registrationAlert = React.createRef();
  }

  handleSubmit = event => {
    event.preventDefault();
    console.log("username: " + event.target.username.value);
    console.log("password: " + event.target.password.value);
    this.registerUser(event.target.username.value, event.target.password.value);
  }

  registerUser(username, password){
    fetch('http://localhost:8080/users', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
      })
    }).then(function(response) {
      if (response.status === 200) {
        this.showRegistrationAlert("success", "User registered!", "Yoy can now log in using Your credentials.");
      } else if (response.status === 422) {
        this.showRegistrationAlert("danger", "User already exists", "Please choose a different name.");
      } else {
        this.showRegistrationAlert("danger", "User not registerd", "Something went wrong.");
      }
    }.bind(this)).catch(function(error) {
      this.showRegistrationAlert("danger", "ERROR!!", "Something went wrong.");
    }.bind(this));
  }

  showRegistrationAlert(variant, heading, message) {
    this.registrationAlert.current.setVariant(variant);
    this.registrationAlert.current.setHeading(heading);
    this.registrationAlert.current.setMessage(message);
    this.registrationAlert.current.setVisible(true);
  }

  render() {
    return (
      <>
      <div className="Register">
        <Form onSubmit = {this.handleSubmit}>
          <Form.Group controlId="username" size="lg">
            <Form.Label>Username </Form.Label>
            <Form.Control autoFocus name="username" placeholder="Enter Username" />
          </Form.Group>

          <Form.Group controlId="password" size="lg">
            <Form.Label>Password </Form.Label>
            <Form.Control type="password" name="password" placeholder="Password" />
          </Form.Group>

          <Button block size="lg" type="submit" variant="primary">Register</Button>
        </Form>
      </div>

      <RegistrationAlert ref={this.registrationAlert} />
      </>
    )
  }
}

export default Registration;
