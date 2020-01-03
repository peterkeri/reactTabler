/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import { NavLink, withRouter } from "react-router-dom";

import {Site, Nav, Grid, List, Button, RouterContextProvider} from "tabler-react";
import { isAuthenticated } from '../common/common';
import { userDataByToken, getPublicMenu, userLogout } from '../api/queries';

const navBarItems = (menuItems) => menuItems.map(({name, description, icon, path, children}) => {
  let menuItem = {
    value: name,
    to: path,
    icon: icon,
    LinkComponent: withRouter(NavLink),
    useExact: true,
  }
  if (children.length > 0 ) {
    menuItem = {
      value: name,
      icon: icon,
      useExact: true,
    }
    const subItems = children.map(({name, description, icon, path}) => ({
      value: name,
      to: path,
      icon: icon,
      LinkComponent: withRouter(NavLink),
      useExact: true,
    }))
    menuItem = {...menuItem, subItems}
  }
  return menuItem
}

)
const logOut = (e) => {
  e.preventDefault();
  userLogout().then(() => {
    localStorage.clear()
    window.location.pathname = '/'
  })
}
const accountDropdownProps = ({email, name}) => {
  return {
    avatarURL: "./demo/faces/female/5.jpg",
    name: email,
    description: "Click for menu",
    options: [
      { icon: "user", value: "Profile" },
      { icon: "settings", value: "Settings" },
      { icon: "mail", value: "Inbox", badge: "6" },
      { icon: "send", value: "Message" },
      { isDivider: true },
      { icon: "help-circle", value: "Need help?" },
      { icon: "log-out", value: "Sign out",  onClick: logOut },
    ],
    
  }
};

const signInButton = () => {

}


class SiteWrapper extends Component{

  userData = () => userDataByToken()
        .then(res => res.json())
        .then(json => {
          this.setState({ userData: json.data })})
        .catch(error => error)

  publicMenu = () => getPublicMenu()
    .then(res => res.json())
    .then(json => {
      this.setState({ publicMenu: json.data })})
    .catch(error => error)  

  componentDidMount() {
    this.publicMenu()
    isAuthenticated() && this.userData()
  }


  state = {
    notificationsObjects: [
      {
        unread: true,
        avatarURL: "http://tabler-react.com/demo/faces/male/41.jpg",
        message: (
          <React.Fragment>
            <strong>Nathan</strong> pushed new commit: Fix page load performance
            issue.
          </React.Fragment>
        ),
        time: "10 minutes ago",
      },
      {
        unread: true,
        avatarURL: "demo/faces/female/1.jpg",
        message: (
          <React.Fragment>
            <strong>Alice</strong> started new task: Tabler UI design.
          </React.Fragment>
        ),
        time: "1 hour ago",
      },
      {
        unread: false,
        avatarURL: "demo/faces/female/18.jpg",
        message: (
          <React.Fragment>
            <strong>Rose</strong> deployed new version of NodeJS REST Api // V3
          </React.Fragment>
        ),
        time: "2 hours ago",
      },
    ],
    userData: {},
    publicMenu: []
  };

  render() {
    const notificationsObjects = this.state.notificationsObjects || [];
    const { userData, publicMenu } = this.state
    const unreadCount = this.state.notificationsObjects.reduce(
      (a, v) => a || v.unread,
      false
    );

    return (
      <Site.Wrapper
        headerProps={{
          href: "/",
          alt: "Tabler React",
          imageURL: "http://tabler-react.com/demo/brand/tabler.svg",
          navItems: !isAuthenticated() ? (
            <Nav.Item type="div" className="d-none d-md-flex">
              <Button
                href="/login"
                size="l"
                RootComponent="a"
                color="primary"
              >
                Sign In
              </Button>
            </Nav.Item>
          ) : null,
          accountDropdown: isAuthenticated() ? accountDropdownProps(userData) : signInButton(),
        }}
        navProps={{ itemsObjects: navBarItems(publicMenu) }}
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
            <a href="#">Eigth Link</a>,
          ],
          note:
            "Premium and Open Source dashboard template with responsive and high quality UI. For Free!",
          copyright: (
            <>
              Copyright © 2019
              <a href="."> Tabler-react</a>. Theme by
              <a
                href="https://codecalm.net"
                target="_blank"
                rel="noopener noreferrer"
              >
                {" "}
                codecalm.net
              </a>{" "}
              All rights reserved.
            </>
          ),
          nav: (
            <React.Fragment>
              <Grid.Col auto={true}>
                <List className="list-inline list-inline-dots mb-0">
                  <List.Item className="list-inline-item">
                    <a href="./docs/index.html">Documentation</a>
                  </List.Item>
                  <List.Item className="list-inline-item">
                    <a href="./faq.html">FAQ</a>
                  </List.Item>
                </List>
              </Grid.Col>
              <Grid.Col auto={true}>
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
            </React.Fragment>
          ),
        }}
      >
        {this.props.children}
      </Site.Wrapper>
    );
  }
}

export default SiteWrapper;