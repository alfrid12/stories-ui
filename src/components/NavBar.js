import React from 'react';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

import { LinkContainer } from 'react-router-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

export default class NavBar extends React.Component {
    
    render(){
        return (
            <Navbar style={{ backgroundColor: '#8cb4b9', border: '1px solid gray'}} expand="lg">
                <LinkContainer to="/">
                    <Navbar.Brand>Stories</Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <LinkContainer to="#" onClick={this.props.toggleSidebar} active={this.props.showSidebar}>
                            <Nav.Link>Sidebar</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/stories/find">
                            <Nav.Link>Find</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/stories/new">
                            <Nav.Link>New Story</Nav.Link>
                        </LinkContainer>
                        <NavDropdown title="New" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/sprints/new">Sprint</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Team</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Form inline>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                        <Button variant="outline-secondary"><FontAwesomeIcon icon={faSearch} /></Button>
                    </Form>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}