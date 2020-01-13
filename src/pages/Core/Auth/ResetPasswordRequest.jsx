import React, { Component } from 'react'
import { Container, Grid, Card } from 'tabler-react'
import { resetPasswordRequest } from '../../../api/queries'
import ResetPasswordRequestForm from '../../../components/Forms/ResetPasswordRequestForm'
import { ServerResponseContext } from '../../../context/ServerResponseProvider'

class ResetPasswordRequest extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      email: ''
    };
    [, this.dispatch] = context
  }

  /**
   *
   */
  onChangeHandler = (e) => {
    const { name: target, value } = e.target
    const [{ formErrors }, dispatch] = this.context

    this.setState({
      [target]: value
    })

    if (Object.keys(formErrors).length > 0) {
      dispatch({
        type: 'updateFormErrors',
        updatedFormErrors: {}
      })
    }
  };

  /**
   *
   */
  handleSubmit = (e) => {
    e.preventDefault()
    const [, dispatch] = this.context
    const { email } = this.state
    resetPasswordRequest({ email }, dispatch).then((res) => console.log(res))
  };

  render() {
    const { email } = this.state
    const [{ formErrors }] = this.context

    return (
      <Container className="h-100">
        <Grid.Row className="h-100" alignItems="center" justifyContent="center">
          <Grid.Col md={6}>
            <Card>
              <Card.Header>
                <Card.Title>Reset password</Card.Title>
              </Card.Header>
              <Card.Body>
                <ResetPasswordRequestForm
                  email={email}
                  formErrors={formErrors}
                  handleSubmit={this.handleSubmit}
                  onChangeHandler={this.onChangeHandler}
                />
              </Card.Body>
            </Card>
          </Grid.Col>
        </Grid.Row>
      </Container>
    )
  }
}

export default ResetPasswordRequest

ResetPasswordRequest.contextType = ServerResponseContext
