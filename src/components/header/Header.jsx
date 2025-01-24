import React from 'react';
import { Container, Logo, Logoutbtn } from '../index';
import { Link } from 'react-router';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import './header.css';

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navItems = [
    { name: 'Home', slug: "/", active: true },
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "Signup", slug: "/signup", active: !authStatus },
    { name: "All Posts", slug: "/all-posts", active: authStatus },
    { name: "Add Post", slug: "/add-posts", active: authStatus },
  ];

  return (
    <header className="header">
      <Container>
        <nav className="header-nav">
          <div className="logo-container">
            <h1>READ.me</h1>
          </div>
          <ul className="nav-items">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className="nav-button"
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li>
                <Logoutbtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
