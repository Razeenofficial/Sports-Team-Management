import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import GroupsIcon from '@mui/icons-material/Groups';

const AdminNavbar = () => {
    

  const navigate = useNavigate();

  const handleAdminLogout = () => {
    console.log('View Teams clicked');
    navigate('/');
  };

  

  const handleaddplayer = () => {
    console.log('Add Player clicked');
    navigate('/add-player');
  };

  const handleaddcoach = () => {
    console.log('Add Coach clicked');
    navigate('/add-coach');
  };

  const handlecreateteam = () => {
    console.log('Create Team clicked');
    navigate('/create-team');
  };

  const handleupdatestat = () => {
    console.log('Update Statistics clicked');
    navigate('/update-statistics');
  };

  const handleHome = () => {
    console.log('Home clicked');
    navigate('/admin-home');
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

          <li className="nav__items" onClick={handleaddplayer}>
            <PersonAddAlt1Icon />
            <br />
            <a> Add Player</a>
          </li>

          <li className="nav__items" onClick={handleaddcoach}>
            <PeopleIcon />
            <br />
            <a>Add Coach</a>
          </li>


          <li className="nav__items" onClick={handlecreateteam}>
            <GroupsIcon />
            <br />
            <a>Create Team</a>
          </li>

          <li className="nav__items" onClick={handleupdatestat}>
            <ManageAccountsIcon />
            <br />
            <a>Update Statistics</a>
          </li>

          <li className="nav__items" onClick={handleAdminLogout}>
            <LoginIcon />
            <br />
            <a>Logout</a>
          </li>
        </ul>
      </nav>


      
    </div>
    </div>

  );
};

export default AdminNavbar;
