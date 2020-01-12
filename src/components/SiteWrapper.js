/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import { NavLink, withRouter } from 'react-router-dom'

import {
  Site,
  Nav,
  Grid,
  List,
  Button,
  RouterContextProvider
} from 'tabler-react'

import { isAuthenticated } from '../common/common'
import {
  userDataByToken, getPublicMenu, getAuthenticatedMenu, userLogout
} from '../api/queries'
import LoginButton from './Buttons/LoginButton'
import TablerLogo from '../assets/images/tabler.svg'
import { ServerResponseContext } from '../context/ServerResponseProvider'
import AuthWrapper from './AuthWrapper'

class SiteWrapper extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      userData: {},
      publicMenu: [],
      authenticatedMenu: []
    }
    this.dispatch = context[1]
  }

  componentDidMount() {
    this.publicMenu()
    isAuthenticated() && this.userData()
  }

  /**
   * get user data
   */
  userData = () =>
    userDataByToken(this.dispatch)
      .then(({ data: userData }) => {
        console.log(userData)
        this.setState({ userData })
      })
      .catch((error) => error);

  /**
   * get public menu items
   */
  publicMenu = () =>
    getPublicMenu(this.dispatch)
      .then(({ data: publicMenu }) => this.setState({ publicMenu }))
      .catch((error) => error);


  authenticatedMenu = () =>
    getAuthenticatedMenu(this.dispatch)
      .then(({ data: authenticatedMenu }) => this.setState({ authenticatedMenu }))
      .catch((error) => error);


  /**
   * log out, clear local storage, rediredt to path
   */
  logOutHandler = (e) => {
    const { history } = this.props
    e.preventDefault()
    userLogout(this.dispatch).then(() => {
      localStorage.clear()
      history.push('/')
    })
  };

  /**
   *
   */
  accountDropdownProps = ({ email, name }) => ({
    avatarURL: './demo/faces/female/5.jpg',
    name: email,
    description: 'Click for menu',
    options: [
      { icon: 'user', value: 'Profile' },
      { icon: 'settings', value: 'Settings' },
      { icon: 'mail', value: 'Inbox', badge: '6' },
      { icon: 'send', value: 'Message' },
      { isDivider: true },
      { icon: 'help-circle', value: 'Need help?' },
      { icon: 'log-out', value: 'Sign out', onClick: this.logOutHandler }
    ]
  });

  navBarItems = (menuItems) =>
    menuItems.map(({
      name, description, icon, path, children
    }) => {
      const menuItem = {
        value: name,
        icon,
        useExact: true
      }

      if (children.length > 0) {
        const subItems = children.map(({
          name, description, icon, path
        }) => ({
          value: name,
          to: path,
          icon,
          LinkComponent: withRouter(NavLink),
          useExact: true
        }))
        return { ...menuItem, subItems }
      }
      return { ...menuItem, LinkComponent: withRouter(NavLink), to: path }
    });

  signInButton = () => {};

  render() {
    const { userData, publicMenu, authenticatedMenu } = this.state

    return (
      <Site.Wrapper
        headerProps={{
          href: '/',
          alt: 'Tabler React',
          imageURL: TablerLogo,
          navItems: !isAuthenticated() && <LoginButton />,
          accountDropdown: isAuthenticated()
            ? this.accountDropdownProps(userData)
            : this.signInButton()
        }}
        navProps={{ itemsObjects: this.navBarItems(!isAuthenticated() ? publicMenu : authenticatedMenu) }}
        routerContextComponentType={withRouter(RouterContextProvider)}
        footerProps={{
          links: [
            <a href="#">First Link</a>,
            <a href="#">Second Link</a>,
            <a href="#">Third Link</a>,
            <a href="#">Fourth Link</a>,
            <a href="#">Five Link</a>,
            <a href="#">Sixth Link</a>,
            <a href="#">Seventh Link</a>,
            <a href="#">Eigth Link</a>
          ],
          note:
            'Premium and Open Source dashboard template with responsive and high quality UI. For Free!',
          copyright: (
            <>
              Copyright © 2019
              <a href="."> Tabler-react</a>
. Theme by
              <a
                href="https://codecalm.net"
                target="_blank"
                rel="noopener noreferrer"
              >
                {' '}
                codecalm.net
              </a>
              {' '}
              All rights reserved.
            </>
          ),
          nav: (
            <>
              <Grid.Col auto>
                <List className="list-inline list-inline-dots mb-0">
                  <List.Item className="list-inline-item">
                    <a href="./docs/index.html">Documentation</a>
                  </List.Item>
                  <List.Item className="list-inline-item">
                    <a href="./faq.html">FAQ</a>
                  </List.Item>
                </List>
              </Grid.Col>
              <Grid.Col auto>
                <Button
                  href="https://github.com/tabler/tabler-react"
                  size="sm"
                  outline
                  color="primary"
                  RootComponent="a"
                >
                  Source code
                </Button>
              </Grid.Col>
            </>
          )
        }}
      >
        {this.props.children}
      </Site.Wrapper>
    )
  }
}

export default AuthWrapper(SiteWrapper)

SiteWrapper.contextType = ServerResponseContext
