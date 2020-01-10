import React, { Component } from "react"

import { findByToken } from '../../../api/queries' 
import { Redirect } from "react-router-dom"
import { ServerResponseContext } from '../../../context/ServerResponseProvider'

class ResetPasswordCheckToken extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            userData: {}, 
            redirectToReferrer: false
        };
        this.dispatch = context[1]
    }

    componentDidMount() {
        const { match: { params } } = this.props;
        this.checkToken(params.token)
}

    checkToken = token => {
        return findByToken(token, this.dispatch)
            .then(json => {
                if (json.hasOwnProperty('success')) {
                this.setState({
                    userData: json.data,
                    redirectToReferrer: true,
                })      
                }
                
            return json.data
            })
            .catch(error => error);
    }

    render() {
        const { location } = this.props;
        const { from } = location.state || { from: { pathname: "/user/password/reset" } };
        const { userData, redirectToReferrer} = this.state
        

        if (redirectToReferrer) {
            return <Redirect to={{...from, state: {userData: userData}}}  />;
        }

        return (<div></div>)
    }
}

export default ResetPasswordCheckToken;

ResetPasswordCheckToken.contextType = ServerResponseContext;