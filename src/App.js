// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import AddPlayer from './AddPlayer';
import AddCoach from './AddCoach';
import CreateTeam from './CreateTeam';
import ViewTeam from './ViewTeam';
import WriteNewsletter from './WriteNewsletter';
import UpdateStatistics from './UpdateStatistics';
import AdminHome from './AdminHome';
import ViewNews from './ViewNews';
import Players from './Players';
import AdminViewTeam from './AdminViewTeam'; // Import the new component
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light', // or 'dark'
  },
});

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-player" element={<AddPlayer />} />
          <Route path="/add-coach" element={<AddCoach />} />
          <Route path="/create-team" element={<CreateTeam />} />
          <Route path="/view-team" element={<ViewTeam />} />
          <Route path="/write-newsletter" element={<WriteNewsletter />} />
          <Route path="/update-statistics" element={<UpdateStatistics />} />
          <Route path="/admin-home" element={<AdminHome />} />
          <Route path="/view-news" element={<ViewNews />} />
          <Route path="/players" element={<Players />} />
          <Route path="/admin-view-team" element={<AdminViewTeam />} /> {/* New route for AdminViewTeam */}
        </Routes>
      </Router>

    </div>
  );
}

export default App;
