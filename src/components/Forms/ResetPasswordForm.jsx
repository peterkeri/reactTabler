import React from 'react'
import PropTypes from 'prop-types'
import { Form, Button } from 'tabler-react'
import Alert from '../Notifications/Alert'


const ResetPasswordForm = ({
  formErrors, email, password, passwordConfirmation, handleSubmit, onChangeHandler
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
          error={formErrors.identity && formErrors.identity[0]}
          placeholder="Email or Client number"
          value={email}
          readOnly
          onChange={onChange}
        />
      </Form.Group>

      <Form.Group label="">
        <Form.Input
          icon="lock"
          type="password"
          size="sm"
          name="password"
          error={formErrors.password && formErrors.password[0]}
          invalid={!!(formErrors.password && formErrors.password[0])}
          value={password}
          placeholder="New password"
          onChange={onChange}
          autoComplete="new-password"
        />
      </Form.Group>

      <Form.Group label="">
        <Form.Input
          icon="lock"
          type="password"
          size="sm"
          name="passwordConfirmation"
          error={formErrors.password_confirmation && formErrors.password_confirmation[0]}
          invalid={!!(formErrors.password_confirmation && formErrors.password_confirmation[0])}
          value={passwordConfirmation}
          placeholder="New password again"
          onChange={onChange}
          autoComplete="new-password"
        />
      </Form.Group>

      <Form.Group label="" className="text-right">
        <Button.List>
          <Button type="submit" size="sm" color="info">Change password</Button>
        </Button.List>
      </Form.Group>
    </Form>
  )
}

ResetPasswordForm.propTypes = {
  formErrors: PropTypes.shape().isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  passwordConfirmation: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onChangeHandler: PropTypes.func.isRequired
}


export default ResetPasswordForm
