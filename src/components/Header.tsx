import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

interface Props {
}

const Header: React.FC<Props> = () => {
    return (
        <Navbar bg="primary" variant="dark">
            <Navbar.Brand href="/">Users</Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link href="/form">Form</Nav.Link>
                <Nav.Link href="/table">Table</Nav.Link>
            </Nav>
        </Navbar>
    )
}
export default Header