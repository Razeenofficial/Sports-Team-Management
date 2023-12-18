import React, { useState, useEffect } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import './Card.css';
import AdminNavbar from './AdminNavbar';
import Footer from './Footer';


function AddPlayer() {
  const [sportsName, setSportsName] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [players, setPlayers] = useState([]);
  const [sportsList, setSportsList] = useState([]);

  useEffect(() => {
    const storedPlayers = JSON.parse(localStorage.getItem('players')) || [];
    setPlayers(storedPlayers);

    const storedSports = JSON.parse(localStorage.getItem('sports')) || [];
    setSportsList(storedSports);
  }, []);

  const savePlayersToLocalStorage = (updatedPlayers) => {
    localStorage.setItem('players', JSON.stringify(updatedPlayers));
  };

  const getRolesForSports = () => {
    switch (sportsName) {
      case 'Cricket':
        return ['Bowler', 'Batsman', 'Wicket Keeper', 'All Rounder'];
      case 'Football':
        return ['Forward', 'Defender', 'Goal Keeper'];
      default:
        return [];
    }
  };

  const getAdditionalInputs = () => {
    if (sportsName === 'Cricket') {
      return (
        <>
          <TextField
            label="Total Interclub Matches"
            type="number"
            id="totalInterclubMatches"
            InputLabelProps={{
              shrink: true,
            }}
            // Add value and onChange props as needed
          />
          <br />

          <TextField
            label="Average Run"
            type="number"
            id="avgRun"
            InputLabelProps={{
              shrink: true,
            }}
            // Add value and onChange props as needed
          />
          <br />

          <TextField
            label="Highest Run"
            type="number"
            id="highestRun"
            InputLabelProps={{
              shrink: true,
            }}
            // Add value and onChange props as needed
          />
          <br />

          <TextField
            label="Bowling Economy"
            type="number"
            id="bowlingEconomy"
            InputLabelProps={{
              shrink: true,
            }}
            // Add value and onChange props as needed
          />
          <br />

          <TextField
            label="Total Wickets"
            type="number"
            id="totalWickets"
            InputLabelProps={{
              shrink: true,
            }}
            // Add value and onChange props as needed
          />
        </>
      );
    } else if (sportsName === 'Football') {
      return (
        <>
          <TextField
            label="Total Interclub Matches"
            type="number"
            id="totalInterclubMatches"
            InputLabelProps={{
              shrink: true,
            }}
            // Add value and onChange props as needed
          />
          <br />

          <TextField
            label="Goals"
            type="number"
            id="goals"
            InputLabelProps={{
              shrink: true,
            }}
            // Add value and onChange props as needed
          />
          <br />

          <TextField
            label="Assists"
            type="number"
            id="assists"
            InputLabelProps={{
              shrink: true,
            }}
            // Add value and onChange props as needed
          />
        </>
      );
    }

    return null; // Default case
  };

  const handleAddPlayer = () => {
    if (name.trim() === '' || sportsName.trim() === '') {
      return;
    }

    // Ensure the additional fields are correctly set
    let additionalFields = {};

    if (sportsName === 'Cricket') {
      additionalFields = {
        totalInterclubMatches: parseInt(document.getElementById('totalInterclubMatches').value, 10) || 0,
        avgRun: parseInt(document.getElementById('avgRun').value, 10) || 0,
        highestRun: parseInt(document.getElementById('highestRun').value, 10) || 0,
        bowlingEconomy: parseInt(document.getElementById('bowlingEconomy').value, 10) || 0,
        totalWickets: parseInt(document.getElementById('totalWickets').value, 10) || 0,
      };
    } else if (sportsName === 'Football') {
      additionalFields = {
        totalInterclubMatches: parseInt(document.getElementById('totalInterclubMatches').value, 10) || 0,
        goals: parseInt(document.getElementById('goals').value, 10) || 0,
        assists: parseInt(document.getElementById('assists').value, 10) || 0,
      };
    }

    const newPlayer = {
      sportsName,
      name,
      age,
      phoneNumber,
      roles: selectedRoles,
      ...additionalFields,
    };

    const updatedPlayers = [newPlayer, ...players];

    setPlayers(updatedPlayers);
    savePlayersToLocalStorage(updatedPlayers);

    // Clear input fields and selected roles after adding a player
    setSportsName('');
    setName('');
    setAge('');
    setPhoneNumber('');
    setSelectedRoles([]);
  };

  const handleDeletePlayer = (index) => {
    const updatedPlayers = [...players];
    updatedPlayers.splice(index, 1);

    setPlayers(updatedPlayers);
    savePlayersToLocalStorage(updatedPlayers);
  };

  const handleRoleChange = (event) => {
    setSelectedRoles(event.target.value);
  };

  return (
    <div>
    <AdminNavbar/>
      
      <div className="parent-container">
        <form className='formc'>
          <FormControl sx={{ m: 1, minWidth: 320 }} size="medium">
            <InputLabel id="sportsName-label">Select Sports Name:</InputLabel>
            <Select
              labelId="sportsName-label"
              id="sportsName"
              value={sportsName}
              onChange={(e) => setSportsName(e.target.value)}
              className='inputs'

            >
              <MenuItem value="Cricket">Cricket</MenuItem>
              <MenuItem value="Football">Football</MenuItem>
            </Select>
          </FormControl>
          <br />

          <Box
            component="form"
            sx={{
              '& > :not(style)': { m: 1, minWidth: 320 },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              label="Name"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='inputs'

            />
            <br />

            <TextField
              label="Age"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              value={age}
              className='inputs'

              onChange={(e) => setAge(e.target.value)}
            />
            <br />

            <TextField
              label="Phone Number"
              type="tel"
              InputLabelProps={{
                shrink: true,
              }}
              className='inputs'

              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <br />

            {sportsName && (
              <FormControl sx={{ m: 1, minWidth: 320 }} size="medium">
                <InputLabel id="roles-label">Select Roles:</InputLabel>
                <Select
                  labelId="roles-label"
                  id="roles"
                  multiple
                  value={selectedRoles}
                  onChange={handleRoleChange}
                  input={<Input />}
                  renderValue={(selected) => selected.join(', ')}
                >
                  {getRolesForSports().map((role) => (
                    <MenuItem key={role} value={role}>
                      <FormControlLabel
                        control={<Checkbox checked={selectedRoles.includes(role)} />}
                        label={role}
                      />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}

            <br />
            <br />

            {getAdditionalInputs()}
            <br />

            <Button variant="contained" onClick={handleAddPlayer}>
              Add Player
            </Button>
          </Box>
        </form>
      </div>

      <br />

      <div style={{ display: 'flex', flexWrap: 'wrap' ,paddingLeft:'15vh'}}
      className="card-container"
      >
        {players.map((player, index) => (
          <div
            key={index}
            style={{
              width: 'calc(30% - 20px)',
              margin: '10px',
              border: '1px solid #ccc',
              padding: '10px',
            }}
            className="card"
          >
            <h4>{player.name}</h4>
            <p>Sports Name: {player.sportsName}</p>
            <p>Age: {player.age}</p>
            <p>Phone Number: {player.phoneNumber}</p>
            <p>Roles: {player.roles && player.roles.length > 0 ? player.roles.join(', ') : 'No Roles'}</p>

            {/* Display additional details based on sportsName */}
            {player.sportsName === 'Cricket' && (
              <>
                <p>Total Interclub Matches: {player.totalInterclubMatches}</p>
                <p>Average Run: {player.avgRun}</p>
                <p>Highest Run: {player.highestRun}</p>
                <p>Bowling Economy: {player.bowlingEconomy}</p>
                <p>Total Wickets: {player.totalWickets}</p>
              </>
            )}

            {player.sportsName === 'Football' && (
              <>
                <p>Total Interclub Matches: {player.totalInterclubMatches}</p>
                <p>Goals: {player.goals}</p>
                <p>Assists: {player.assists}</p>
              </>
            )}

            <IconButton
              aria-label="delete"
              size="large"
              onClick={() => handleDeletePlayer(index)}
              sx={{ color: 'red' }}
            >
              <DeleteIcon />
            </IconButton>
          </div>
        ))}
      </div>
      <Footer/>
    </div>
  );
}

export default AddPlayer;
