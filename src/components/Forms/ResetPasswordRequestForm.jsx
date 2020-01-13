import React from 'react'
import PropTypes from 'prop-types'
import { Form, Button } from 'tabler-react'
import { NavLink, withRouter } from 'react-router-dom'
import Alert from '../Notifications/Alert'


const ResetPasswordRequestForm = ({
  formErrors, email, handleSubmit, onChangeHandler
}) => {
  const onChange = (e) => onChangeHandler(e)
  const onSubmit = (e) => handleSubmit(e)

  return (
    <Form onSubmit={onSubmit}>
      <Alert />
      <Form.StaticText className="small pb-5">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Quisque sapien velit, aliquet eget commodo nec, auctor a
        sapien. Nam eu neque vulputate diam rhoncus faucibus.
        Curabitur quis varius libero. Lorem ipsum dolor sit amet,
        consectetur adipiscing elit. Aliquam placerat sem at
        mauris suscipit porta. Cras metus velit, elementum sed
        pellentesque a, pharetra eu eros. Etiam facilisis placerat
        euismod. Nam faucibus neque arcu, quis accumsan leo
        tincidunt varius. In vel diam enim. Sed id ultrices ligula.
        Maecenas at urna arcu. Sed quis nulla sapien. Nam felis mauris,
        tincidunt at convallis id, tempor molestie libero.
      </Form.StaticText>

      <Form.Group>
        <Form.Input
          icon="user"
          size="sm"
          name="email"
          error={formErrors.email && formErrors.email[0]}
          placeholder="Email"
          value={email}
          onChange={onChange}
        />
      </Form.Group>

      <Form.Group label="" className="text-right">
        <Button.List>
          <Button size="sm" color="primary" RootComponent={withRouter(NavLink)} to="/user/login">Back</Button>
          <Button type="submit" size="sm" color="primary">Request password reset</Button>
        </Button.List>
      </Form.Group>
    </Form>
  )
}

ResetPasswordRequestForm.propTypes = {
  formErrors: PropTypes.shape().isRequired,
  email: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onChangeHandler: PropTypes.func.isRequired
}


export default ResetPasswordRequestForm
