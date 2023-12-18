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
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import AdminNavbar from './AdminNavbar';
import Footer from './Footer';

function UpdateStatistics() {
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedPlayer, setEditedPlayer] = useState({});
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    // Fetch players from local storage on component mount
    const storedPlayers = JSON.parse(localStorage.getItem('players')) || [];
    setPlayers(storedPlayers);
  }, []);

  const handlePlayerClick = (player) => {
    setSelectedPlayer(player);
    setEditMode(false);
  };

  const handleDialogClose = () => {
    setSelectedPlayer(null);
    setEditMode(false);
    setEditedPlayer({});
  };

  const handleUpdateClick = () => {
    setEditMode(true);
    setEditedPlayer(selectedPlayer);
  };

  const handleSaveChanges = () => {
    // Implement the logic to save the edited player details
    // Update the local storage and any other necessary state
    // After updating, you can close the dialog by calling handleDialogClose()
    const updatedPlayers = players.map((player) =>
      player.name === selectedPlayer.name ? editedPlayer : player
    );

    setPlayers(updatedPlayers);
    localStorage.setItem('players', JSON.stringify(updatedPlayers));

    handleDialogClose();
  };

  const handleDeletePlayer = () => {
    const updatedPlayers = players.filter((player) => player.name !== selectedPlayer.name);

    setPlayers(updatedPlayers);
    localStorage.setItem('players', JSON.stringify(updatedPlayers));

    handleDialogClose();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedPlayer((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRoleChange = (event) => {
    const { value } = event.target;
    setEditedPlayer((prev) => ({
      ...prev,
      roles: value,
    }));
  };

  const cricketPlayers = players.filter((player) => player.sportsName === 'Cricket');
  const footballPlayers = players.filter((player) => player.sportsName === 'Football');



  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts1, setFilteredProducts1] = useState([]);
  const [filteredProducts2, setFilteredProducts2] = useState([]);



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
    <div>
    <AdminNavbar/>

    <div style={{ textAlign: 'center' }}>
        <br />
        <input
          style={{ width: '300px', border: '1px solid black' }}
          type="search"
          placeholder="Search Products"
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
      <br/>

      {/* Popup Card */}
      <Dialog open={selectedPlayer !== null}
      onClose={handleDialogClose}>
        <DialogTitle>{selectedPlayer?.name}</DialogTitle>
        <DialogContent>
          {editMode ? (
            <>
              <DialogContentText>
                {/* Display editable player details here */}
                <br/>
                <TextField
                  label="Name"
                  name="name"
                  value={editedPlayer.name || ''}
                  onChange={handleInputChange}
                />
                <br/><br/>
                <TextField
                  label="Age"
                  name="age"
                  value={editedPlayer.age || ''}
                  onChange={handleInputChange}
                /> <br/><br/>
                <TextField
                  label="Phone Number"
                  name="phoneNumber"
                  value={editedPlayer.phoneNumber || ''}
                  onChange={handleInputChange}
                /> <br/><br/>

                {/* Roles */}
                <FormControl sx={{ m: 1, minWidth: 200 }}>
                  <InputLabel id="roles-label">Roles</InputLabel>
                  <Select
                    labelId="roles-label"
                    id="roles"
                    multiple
                    value={editedPlayer.roles || []}
                    onChange={handleRoleChange}
                    input={<Input />}
                    renderValue={(selected) => selected.join(', ')}
                  >
                    {selectedPlayer.sportsName === 'Cricket' ? (
                      ['Batsman', 'Bowler', 'Wicket Keeper', 'All Rounder'].map((role) => (
                        <MenuItem key={role} value={role}>
                          <FormControlLabel
                            control={
                              <Checkbox checked={editedPlayer.roles?.includes(role) || false} />
                            }
                            label={role}
                          />
                        </MenuItem>
                      ))
                    ) : (
                      ['Forward', 'Defender', 'Goal Keeper'].map((role) => (
                        <MenuItem key={role} value={role}>
                          <FormControlLabel
                            control={
                              <Checkbox checked={editedPlayer.roles?.includes(role) || false} />
                            }
                            label={role}
                          />
                        </MenuItem>
                      ))
                    )}
                  </Select>
                </FormControl>
                <br /><br />

                {/* Additional input fields for Cricket */}
                {selectedPlayer.sportsName === 'Cricket' && (
                  <> 
                    <TextField
                      label="Total Interclub Matches"
                      name="totalInterclubMatches"
                      type="number"
                      value={editedPlayer.totalInterclubMatches || ''}
                      onChange={handleInputChange}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                    <br /><br />

                    <TextField
                      label="Average Run"
                      name="avgRun"
                      type="number"
                      value={editedPlayer.avgRun || ''}
                      onChange={handleInputChange}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                    <br /><br />

                    <TextField
                      label="Highest Run"
                      name="highestRun"
                      type="number"
                      value={editedPlayer.highestRun || ''}
                      onChange={handleInputChange}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                    <br /><br />

                    <TextField
                      label="Bowling Economy"
                      name="bowlingEconomy"
                      type="number"
                      value={editedPlayer.bowlingEconomy || ''}
                      onChange={handleInputChange}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                    <br /><br />

                    <TextField
                      label="Total Wickets"
                      name="totalWickets"
                      type="number"
                      value={editedPlayer.totalWickets || ''}
                      onChange={handleInputChange}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                    <br /><br />
                  </>
                )}

                {/* Additional input fields for Football */}
                {selectedPlayer.sportsName === 'Football' && (
                  <>
                    <TextField
                      label="Total Interclub Matches"
                      name="totalInterclubMatches"
                      type="number"
                      value={editedPlayer.totalInterclubMatches || ''}
                      onChange={handleInputChange}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                    <br /><br />

                    <TextField
                      label="Goals"
                      name="goals"
                      type="number"
                      value={editedPlayer.goals || ''}
                      onChange={handleInputChange}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                    <br /><br />

                    <TextField
                      label="Assists"
                      name="assists"
                      type="number"
                      value={editedPlayer.assists || ''}
                      onChange={handleInputChange}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                    <br /><br />
                  </>
                )}

                {/* Delete button
                <Button onClick={handleDeletePlayer} color="secondary">
                  Delete
                </Button>     */}
              </DialogContentText>
            </>
          ) : (
            <DialogContentText>
              {/* Display all player details here */}
              {Object.entries(selectedPlayer || {}).map(([key, value]) => (
                <p key={key}>
                  <strong>{key}:</strong> {value}
                </p>
              ))}
            </DialogContentText>
          )}
        </DialogContent>
        <DialogActions>
          {editMode ? (
            <>
              <Button onClick={handleSaveChanges} color="primary">
                Save Changes
              </Button>
              
            </>
          ) : (
            <Button onClick={handleUpdateClick} color="primary">
              Update
            </Button>
            

          )}
          <Button onClick={handleDeletePlayer} color="secondary">
          Delete
        </Button>

          <Button onClick={handleDialogClose}>Close</Button>
        </DialogActions>
      </Dialog>
      <Footer/>
    </div>
  );
}

export default UpdateStatistics;
