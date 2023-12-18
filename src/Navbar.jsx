import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import PersonIcon from '@mui/icons-material/Person';
import LoginIcon from '@mui/icons-material/Login';

const Navbar = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setLoggedIn] = useState(false);

  const navigate = useNavigate();

  const handleAdminLogin = () => {
    setModalOpen(true);  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleViewTeams = () => {
    console.log('View Teams clicked');
    navigate('/view-team');
  };

  const handleViewNews = () => {
    console.log('View News clicked');
    navigate('/view-news');
  };

  const handlePlayers = () => {
    console.log('Players clicked');
    navigate('/players');
  };

  const handleHome = () => {
    console.log('Home clicked');
    navigate('/');
    // Add your logic for the Home action, if needed
  };

  const handleLogin = () => {
    const correctUsername = 'admin';
    const correctPassword = 'admin123';

    if (username === correctUsername && password === correctPassword) {
      setLoggedIn(true);
      handleCloseModal();
      navigate('/admin-home');
    } else {
      alert('Username or password incorrect');
    }
  };


  return (
    <div className="navbar">

    <div className="home-container">
      <nav className="nav__cont">
        <ul className="nav">
          <li className="nav__items" onClick={handleHome}>
            <HomeIcon />
            <br />
            <a> Home</a>
          </li>

          <li className="nav__items" onClick={handleViewTeams}>
            <PeopleIcon />
            <br />
            <a> View Teams</a>
          </li>

          <li className="nav__items" onClick={handleViewNews}>
            <ModeCommentIcon />
            <br />
            <a>View News</a>
          </li>

          <li className="nav__items" onClick={handlePlayers}>
            <PersonIcon />
            <br />
            <a>Players</a>
          </li>

          <li className="nav__items" onClick={handleAdminLogin}>
            <LoginIcon />
            <br />
            <a>Admin Login</a>
          </li>
        </ul>
      </nav>


      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>&times;</span>
            <div className="admin-login-form">
              <h2>Admin Login</h2>
              <form>
                <label htmlFor="username">Username:</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />

                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <button type="button" onClick={handleLogin}>Login</button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>

  );
};

export default Navbar;
