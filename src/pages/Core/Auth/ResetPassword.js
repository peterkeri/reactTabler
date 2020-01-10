import React, { Component } from "react"
import { Container, Grid, Card } from "tabler-react"
import { Redirect } from "react-router-dom"
import { resetPassword } from '../../../api/queries' 
import { ServerResponseContext } from '../../../context/ServerResponseProvider'
import ResetPasswordForm from '../../../components/Forms/ResetPasswordForm' 

class ResetPassword extends Component {
    constructor(props, context) {
    super(props, context);
    this.state = {
        password: "",
        password_confirmation: "",
        redirectToReferrer: false
    };
    this.dispatch = context[1]
    }

    onChangeHandler = e => {
        const { name: target, value } = e.target;
        const [{ formErrors } ] = this.context;

        this.setState({[target]: value});

        if (Object.keys(formErrors).length > 0) {
            this.dispatch({
            type: "updateFormErrors",
            updateFormErrors: {}
            });
        }
    };

    handleSubmit = e => {
        e.preventDefault();

        const data = {
            "email": this.props.location.state.userData.email,
            "password": this.state.password,
            "password_confirmation": this.state.password_confirmation,
            "token": this.props.location.state.userData.token 
        }
        resetPassword(data, this.dispatch).then(res => {
            console.log(res)
            this.setState({redirectToReferrer: true})
        });
    };

    render() {
        const [ { formErrors} ] = this.context;
        const { email } = this.props.location.state.userData
        const { redirectToReferrer, password, password_confirmation } = this.state

        if (redirectToReferrer) {
            return <Redirect to={'/user/login'} />;
          }

        return (
            <Container className="h-100">
                <Grid.Row className="h-100" alignItems="center" justifyContent="center">
                    <Grid.Col md={6}>
                        <Card>
                            <Card.Header>
                                <Card.Title>Change password</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <ResetPasswordForm
                                    email={email}
                                    password={password}
                                    password_confirmation={password_confirmation}
                                    formErrors={formErrors} 
                                    handleSubmit={this.handleSubmit} 
                                    onChangeHandler={this.onChangeHandler} />
                            </Card.Body>
                        </Card>
                    </Grid.Col>
                </Grid.Row>
            </Container>
        )
    }
}

export default ResetPassword;

ResetPassword.contextType = ServerResponseContext;