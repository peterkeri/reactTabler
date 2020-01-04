/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";

import {
  Site,
  Nav,
  Grid,
  List,
  Button,
  RouterContextProvider
} from "tabler-react";
import { isAuthenticated } from "../common/common";
import { userDataByToken, getPublicMenu, userLogout } from "../api/queries";

class SiteWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: {},
      publicMenu: []
    };
  }

  componentDidMount() {
    this.publicMenu();
    isAuthenticated() && this.userData();
  }

  /**
   * get user data
   */
  userData = () =>
    userDataByToken()
      .then(res => res.json())
      .then(({ data: userData }) => this.setState({ userData }))
      .catch(error => error);

  /**
   * get public menu items
   */
  publicMenu = () =>
    getPublicMenu()
      .then(res => res.json())
      .then(({ data: publicMenu }) => this.setState({ publicMenu }))
      .catch(error => error);

  /**
   * log out, clear local storage, rediredt to path
   */
  logOutHandler = e => {
    const { history } = this.props;
    e.preventDefault();
    userLogout().then(() => {
      localStorage.clear();
      history.push("/");
    });
  };

  /**
   *
   */
  accountDropdownProps = ({ email, name }) => {
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
        { icon: "log-out", value: "Sign out", onClick: this.logOutHandler }
      ]
    };
  };

  navBarItems = menuItems =>
    menuItems.map(({ name, description, icon, path, children }) => {
      const menuItem = {
        value: name,
        icon: icon,
        useExact: true
      };

      if (children.length > 0) {
        const subItems = children.map(({ name, description, icon, path }) => ({
          value: name,
          to: path,
          icon: icon,
          LinkComponent: withRouter(NavLink),
          useExact: true
        }));
        return { ...menuItem, subItems };
      }
      return { ...menuItem, LinkComponent: withRouter(NavLink), to: path };
    });

  signInButton = () => {};

  render() {
    const { userData, publicMenu } = this.state;

    return (
      <Site.Wrapper
        headerProps={{
          href: "/",
          alt: "Tabler React",
          imageURL: "http://tabler-react.com/demo/brand/tabler.svg",
          navItems: !isAuthenticated() ? (
            <Nav.Item type="div" className="d-none d-md-flex">
              <Button href="/login" size="l" RootComponent="a" color="primary">
                Sign In
              </Button>
            </Nav.Item>
          ) : null,
          accountDropdown: isAuthenticated()
            ? this.accountDropdownProps(userData)
            : this.signInButton()
        }}
        navProps={{ itemsObjects: this.navBarItems(publicMenu) }}
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
          )
        }}
      >
        {this.props.children}
      </Site.Wrapper>
    );
  }
}

export default SiteWrapper;
