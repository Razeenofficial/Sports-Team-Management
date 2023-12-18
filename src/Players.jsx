import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Home from './Home';
import Navbar from './Navbar';
import Footer from './Footer';

function Players() {
  const [players, setPlayers] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState(null);



  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts1, setFilteredProducts1] = useState([]);

  const [filteredProducts2, setFilteredProducts2] = useState([]);


  useEffect(() => {
    // Fetch players from local storage on component mount
    const storedPlayers = JSON.parse(localStorage.getItem('players')) || [];
    setPlayers(storedPlayers);
  }, []);

  // Filter players based on sports
  const cricketPlayers = players.filter((player) => player.sportsName === 'Cricket');
  const footballPlayers = players.filter((player) => player.sportsName === 'Football');

  const handlePlayerClick = (player) => {
    setSelectedPlayer(player);
  };

  const handleDialogClose = () => {
    setSelectedPlayer(null);
  };
  useEffect(() => {
    setFilteredProducts1(
      cricketPlayers.filter((cricketPlayers) =>
      cricketPlayers.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery,cricketPlayers]);


  useEffect(() => {
    setFilteredProducts2(
      footballPlayers.filter((footballPlayers) =>
      footballPlayers.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery,footballPlayers]);


  return (
    <div className='bgi'>
    <Navbar/>

    <div style={{ textAlign: 'center' }}>
        <br />
        <input
          style={{ width: '300px', border: '1px solid black' }}
          type="search"
          placeholder="Search Players"
          className="search-bar"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Cricket Players */}
      <h2 className='nametag'>Cricket Players</h2>
      <Grid container spacing={3}
      className='gridt'>
        {filteredProducts1.map((player, index) => (
          <Grid key={index} item xs={12} sm={6} md={4} lg={3} xl={2}>
            <Card
              sx={{ height: '100%', cursor: 'pointer' }}
              onClick={() => handlePlayerClick(player)}
            >
              <CardContent>
                <Typography variant="h6">{player.name}</Typography>
                {/* Add more player details as needed */}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Football Players */}
      <h2 className='nametag'>Football Players</h2>
      <Grid container spacing={3}
      className='gridt'>
        {filteredProducts2.map((player, index) => (
          <Grid key={index} item xs={12} sm={6} md={4} lg={3} xl={2}>
            <Card
              sx={{ height: '100%', cursor: 'pointer' }}
              onClick={() => handlePlayerClick(player)}
            >
              <CardContent>
                <Typography variant="h6">{player.name}</Typography>
                {/* Add more player details as needed */}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Popup Card */}
      <Dialog open={selectedPlayer !== null} onClose={handleDialogClose}>
        <DialogTitle>{selectedPlayer?.name}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {/* Display all player details here */}
            {Object.entries(selectedPlayer || {}).map(([key, value]) => (
              <p key={key}>
                <strong>{key}:</strong> {value}
              </p>
            ))}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Close</Button>
        </DialogActions>
      </Dialog>
<br/>
      <Footer/>
    </div>
  );
}

export default Players;
