import React, {ChangeEvent} from "react";
import { Link } from 'react-router-dom';
import  {useAuth} from "../../Auth";
import {Simulate} from "react-dom/test-utils";
import {Button, FormControl, Nav, Navbar, Container, Form} from "react-bootstrap";


const Header = () =>{
    const {isAuth, user, loading} = useAuth();

    return(
            <Navbar bg="dark" variant="dark" expand="lg">
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                    </Nav>
                   {/* <Form inline>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" onChange={handleSearchInputChange} />
                        <Button variant="outline-success">Search</Button>
                    </Form>*/}
                    {
                        !loading && (
                            (isAuth && user)
                                ?(
                                    <Form inline>
                                        <Navbar.Text>{ user.name }</Navbar.Text>
                                        <Nav.Link as={Link} to="/signout">SignOut</Nav.Link>
                                    </Form>
                                )
                                :(
                                    <Form inline>
                                        <Nav.Link as={Link} to="/signin">Sign in/Sign up</Nav.Link>
                                    </Form>
                                )
                        )
                    }
                </Navbar.Collapse>
            </Navbar>
        )
}

export default Header;