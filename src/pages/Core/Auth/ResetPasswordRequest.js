import React, {Component} from "react"
import { Container, Grid, Card } from "tabler-react"
import { resetPasswordRequest } from '../../../api/queries'
import ResetPasswordRequestForm from '../../../components/Forms/ResetPasswordRequestForm' 


class ResetPasswordRequest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            formErrors: {},
            serverError: ""
        };
    }

    /**
     * 
     */
    onChangeHandler = e => {
        const { name: target, value } = e.target;

        this.setState({
            [target]: value
        });
    };

    /**
     *
     */
    handleSubmit = e => {
        e.preventDefault();
        const data = {email: this.state.email}
        resetPasswordRequest(data)
            .then(res => res.json())
            .then(json => {
              if (json.success === false) {
                this.setState({
                  serverError: json.message,
                  formErrors: {}
                })
              } else if(json.errors) {
                this.setState({
                  formErrors: json.errors,
                  serverError: ""
                })
              }
            })
            .catch(e => {
            console.log(e);
            });

        
    };

    render() {
        const { formErrors, serverError, email } = this.state;
    
        return (
          <Container className="h-100" >
            <Grid.Row  className="h-100" alignItems="center" justifyContent="center">
              <Grid.Col md={6}>
                <Card>
                  <Card.Header>
                    <Card.Title>Reset password</Card.Title>
                  </Card.Header>
                  <Card.Body>
                    <ResetPasswordRequestForm 
                      email={email}
                      serverError={serverError}
                      formErrors={formErrors} 
                      handleSubmit={this.handleSubmit} 
                      onChangeHandler={this.onChangeHandler} />
                  </Card.Body>
                </Card>
              </Grid.Col>
            </Grid.Row>
          </Container>
        );
      }
}

export default ResetPasswordRequest