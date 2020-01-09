import React, {Component} from "react"
import { Container, Grid, Card } from "tabler-react"
import { resetPasswordRequest } from '../../../api/queries'
import ResetPasswordRequestForm from '../../../components/Forms/ResetPasswordRequestForm' 
import { ServerResponseContext } from '../../../context/ServerResponseProvider'

class ResetPasswordRequest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            formErrors: {},
            serverResponse: ""
        };
    }
    static contextType = ServerResponseContext;
    /**
     * 
     */
    onChangeHandler = e => {
      const { name: target, value } = e.target
      const [{ formErrors }, dispatch] = this.context

      this.setState({
          [target]: value
      });

      if(Object.keys(formErrors).length > 0) {
        dispatch({
          type: 'updateFormErrors',
          updateFormErrors: {}
        })
      }
  };

    /**
     *
     */
    handleSubmit = e => {
      e.preventDefault();
      const [, dispatch] = this.context
      const data = {email: this.state.email}
      resetPasswordRequest(data, dispatch).then(res => console.log(res))
    };

    render() {
        const { email } = this.state;
        const [{ formErrors,  serverResponse} ] = this.context;
    
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
                      serverResponse={serverResponse}
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
