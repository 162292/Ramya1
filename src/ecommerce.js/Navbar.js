// import React from "react";
// import { Link } from "react-router-dom";

// function NavBar() {
//     return(
//         <nav>
//             <ul>
//                 <li>
//                     <Link to = "/login">Login</Link>
                    
//                 </li>
//             </ul>
//         </nav>
//     );
// }
// export default NavBar;

// import React from 'react';
// import { Navbar, Container, Nav } from 'react-bootstrap';
// import { Link } from 'react-router-dom';

// const NavbarComponent = () => {
//   return (
//     <Navbar bg="dark" variant="dark" expand="md" className='p-3'>
//       <Container>
//         {/* Brand */}
//         <Navbar.Brand as={Link} to="/">EZShop</Navbar.Brand>

//         {/* Navbar Toggle Button for Collapsing on Small Screens */}
//         <Navbar.Toggle aria-controls="navbar-nav" />

//         {/* Navbar Links */}
//         <Navbar.Collapse id="navbar-nav" className="justify-content-end">
//           <Nav>
//             <Nav.Link as={Link} to="/product" className="mx-2">
//               Products
//             </Nav.Link>
//             <Nav.Link as={Link} to="/login" className="mx-2">
//               Login
//             </Nav.Link>
            
//           </Nav>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// };

// export default NavbarComponent;


import React, { useState } from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const NavbarComponent = ({ isAuthenticated, setIsAuthenticated }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to handle menu toggle
  const navigate = useNavigate();

  // Handle the link click and refresh page
  const handleLinkClick = (path) => {
    window.location.href = path;  // Forces page refresh on link click
  };

  // Logout function using fetch directly
  const handleLogout = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/admin_console/logout/', {
        method: 'GET', // Use GET for logout
        credentials: 'include', // Include credentials (cookies) if needed
      });

      if (response.ok) {
        setIsAuthenticated(false);
        localStorage.removeItem('isAuthenticated');
        console.log('Logged out successfully');
        handleLinkClick('/login'); // Forces a page refresh after logout and redirects to login
      } else {
        console.error('Failed to log out');
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <Navbar bg="dark" variant="dark" expand="md" className="p-3">
      <Container>
        {/* Brand */}
        <Navbar.Brand as={Link} to="/">EZShop</Navbar.Brand>

        {/* Navbar Toggle Button for Collapsing on Small Screens */}
        <Navbar.Toggle aria-controls="navbar-nav" onClick={() => setIsMenuOpen(!isMenuOpen)} />

        
        {/* Navbar Links */}
        <Navbar.Collapse id="navbar-nav" className={`justify-content-end ${isMenuOpen ? 'show' : ''}`}>
          <Nav>
            {isAuthenticated ? (
              <>
                {/* Show these links if the user is authenticated */}
                <Nav.Link as={Link} to="/product" className="mx-3">
                  Products
                </Nav.Link>
                <Nav.Link as={Link} to="/cart" className="mx-3">
                  Cart
                </Nav.Link> 
                <Nav.Link as={Link} to="/order-history" className="mx-3">
                  Order History
                </Nav.Link>  
                <Nav.Link as={Link} to="/profile" className="mx-3">
                  profile
                </Nav.Link> 

                <Button variant="light" onClick={handleLogout} className="mx-3">
                  Logout
                </Button>
              </>
            ) : (
              <>
                {/* Show these links if the user is not authenticated */}
                <Nav.Link as={Link} to="/product" className="mx-3">
                  Products
                </Nav.Link>
                <Nav.Link as={Link} to="/login" className="mx-3">
                  Login
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;

