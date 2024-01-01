import React from 'react';
import { Link } from 'react-router-dom';
import AdminNavbar from './AdminNavbar';
import Footer from './Footer';

function AdminHome() {
  return (
    <div>
    <AdminNavbar/>
      <h2 className="text">Welcome to the Admin Home Page</h2>
      <br/> <br/> <br/>

      <div className="admin-buttons">
        <Link to="/add-player">
          <button>Add Player</button>
        </Link>
        <Link to="/add-coach">
          <button>Add Coach</button>
        </Link>
        <Link to="/create-team">
          <button>Create Team</button>
        </Link>
        <Link to="/admin-view-team">
          <button>View Team</button>
        </Link>
        <Link to="/write-newsletter">
          <button>Write Newsletter</button>
        </Link>
        <Link to="/update-statistics">
          <button>Update Statistics</button>
        </Link>
      </div>
      <br/> <br/> <br/>
      <br/> <br/> <br/>      <br/> 
      <br/> <br/> <br/>      <br/> 

      <Footer/>
    </div>
  );
}

export default AdminHome;
