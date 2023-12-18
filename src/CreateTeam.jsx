import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/system';

import AdminNavbar from './AdminNavbar';

const Container = styled('div')({
  display: 'flex',
});

const PlayerCard = styled('div')({
  border: '1px solid #ccc',
  padding: '10px',
  margin: '5px',
  cursor: 'pointer',
  width: '50%', // Two cards in a row
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column', // Stack stats below the name
  position: 'relative',
});

const CoachCard = styled('div')({
  border: '1px solid #ccc',
  padding: '10px',
  margin: '5px',
  cursor: 'pointer',
  width: '50%', // Two cards in a row
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column', // Stack stats below the name
  position: 'relative',
});

const StatsCard = ({ player, selectedSport }) => (
  <Card sx={{ minWidth: 275, position: 'absolute', top: '100%', left: 0 }}
  className='gridt'
  >
    <CardContent>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        Player Stats
      </Typography>
      {selectedSport === 'Cricket' ? (
        <Typography variant="body2">
          Total Runs: {player.totalRuns}
          <br />
          Wickets: {player.wickets}
          <br />
          Average Run: {player.avgRun}
          <br />
          Highest Run: {player.highestRun}
          <br />
          Bowling Economy: {player.bowlingEconomy}
          <br />
          Total Wickets: {player.totalWickets}
        </Typography>
      ) : (
        <Typography variant="body2">
          Total Interclub Matches: {player.totalInterclubMatches}
          <br />
          Goals: {player.goals}
          <br />
          Assists: {player.assists}
        </Typography>
      )}
    </CardContent>
  </Card>
);

const CoachStatsCard = ({ coach }) => (
  <Card sx={{ minWidth: 275, position: 'absolute', top: '100%', left: 0 }}
  className='gridt'
  >
    <CardContent 
    >
      <Typography sx={{ fontSize: 14 }} 
      color="text.secondary" gutterBottom>
        Coach Details
      </Typography>
      <Typography variant="body2">
        Sport: {coach.sportsName}
        <br />
        Experience: {coach.experience} years
      </Typography>
    </CardContent>
  </Card>
);


function CreateTeam() {
  const [selectedSport, setSelectedSport] = useState('');
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [selectedCoach, setSelectedCoach] = useState(null);
  const [players, setPlayers] = useState([]);
  const [coaches, setCoaches] = useState([]);
  const [teamName, setTeamName] = useState('');

  useEffect(() => {
    // Fetch players, coaches, and sports from local storage or API
    const storedPlayers = JSON.parse(localStorage.getItem('players')) || [];
    const storedCoaches = JSON.parse(localStorage.getItem('coaches')) || [];

    setPlayers(storedPlayers);
    setCoaches(storedCoaches);
  }, []);

  const handlePlayerSelection = (player) => {
    // Logic to handle player selection
    if (!selectedPlayers.find((selectedPlayer) => selectedPlayer.uniqueId === player.uniqueId)) {
      setSelectedPlayers([...selectedPlayers, { ...player, uniqueId: Date.now() }]);
    }
  };

  const handleCoachSelection = (coach) => {
    // Logic to handle coach selection
    if (selectedCoach === null) {
      setSelectedCoach(coach);
    } else {
      alert('Select only one coach.');
    }
  };

  const handleDeletePlayer = (uniqueId) => {
    // Logic to handle player deletion
    const updatedPlayers = selectedPlayers.filter((player) => player.uniqueId !== uniqueId);
    setSelectedPlayers(updatedPlayers);
  };

  const handleToggleCaptain = (uniqueId) => {
    // Logic to toggle captain status
    const updatedPlayers = selectedPlayers.map((player) => {
      return {
        ...player,
        captain: player.uniqueId === uniqueId ? !player.captain : false,
      };
    });
    setSelectedPlayers(updatedPlayers);
  };

  const handleToggleViceCaptain = (uniqueId) => {
    // Logic to toggle vice-captain status
    const updatedPlayers = selectedPlayers.map((player) => {
      return {
        ...player,
        viceCaptain: player.uniqueId === uniqueId ? !player.viceCaptain : false,
      };
    });
    setSelectedPlayers(updatedPlayers);
  };

  const groupPlayersByRole = (players, selectedSport) => {
    return players.reduce((grouped, player) => {
      if (selectedSport === 'Cricket') {
        const cricketRoles = ['Batsman', 'Bowler', 'All-Rounder', 'Wicket Keeper'];
        if (cricketRoles.includes(player.roles[0])) {
          grouped[player.roles[0]] = [...(grouped[player.roles[0]] || []), player];
        }
      } else if (selectedSport === 'Football') {
        const footballRoles = ['Forward', 'Defender', 'Goal Keeper'];
        if (footballRoles.includes(player.roles[0])) {
          grouped[player.roles[0]] = [...(grouped[player.roles[0]] || []), player];
        }
      }
      return grouped;
    }, {});
  };

  const PlayersList = () => {
    const availablePlayersByRole = groupPlayersByRole(players, selectedSport);
    const selectedPlayersByRole = groupPlayersByRole(selectedPlayers, selectedSport);

    return (
      <Container>
        <div style={{ width: '50%' }}
        className='gridt'
        >
          <h3 className="text">Available Players</h3>
          {Object.entries(availablePlayersByRole).map(([role, rolePlayers]) => (
            <div key={role}>
              <h4>{role}</h4>
              <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {rolePlayers.map((player) => (
                  <PlayerCard
                    key={player.id}
                    onClick={() => handlePlayerSelection(player)}
                    className='inputs'
                  >
                    <span>{player.name}</span>
                    {selectedSport === 'Cricket' && (
                      <span>
                      Roles: {player.roles.join(', ')}</span>
                    )}
                    {selectedSport === 'Football' && (
                      <span>Position: {player.roles[0]}</span>
                    )}
                    <span>Total Interclub Matches: {player.totalInterclubMatches}</span>
                    {selectedSport === 'Cricket' && (
                      <>
                        <span>Average Run: {player.avgRun}</span>
                        <span>Highest Run: {player.highestRun}</span>
                        <span>Bowling Economy: {player.bowlingEconomy}</span>
                        <span>Total Wickets: {player.totalWickets}</span>
                      </>
                    )}
                    {selectedSport === 'Football' && (
                      <>
                        <span>Goals: {player.goals}</span>
                        <span>Assists: {player.assists}</span>
                      </>
                    )}
                  </PlayerCard>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{ width: '50%' }}>
          <h3 className="text">Selected Players</h3>
          {Object.entries(selectedPlayersByRole).map(([role, rolePlayers]) => (
            <div key={role}>
              <h4>{role}</h4>
              {rolePlayers.map((player) => (
                <Card key={player.uniqueId} style={{ margin: '5px', position: 'relative' }}>
                  <CardContent>
                    <Typography variant="body1">{player.name}</Typography>
                    {/* You can add more details here if needed */}
                    <StatsCard player={player} selectedSport={selectedSport} />
                  </CardContent>
                  <div>
                    <Button onClick={() => handleDeletePlayer(player.uniqueId)}>Remove</Button>
                    <Button onClick={() => handleToggleCaptain(player.uniqueId)}>
                      {player.captain ? 'Remove Captain' : 'Make Captain'}
                    </Button>
                    <Button onClick={() => handleToggleViceCaptain(player.uniqueId)}>
                      {player.viceCaptain ? 'Remove Vice Captain' : 'Make Vice Captain'}
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          ))}
          <h3 className="text">Selected coach:</h3>
          {selectedCoach && (
            <Card style={{ margin: '5px', position: 'relative' }}>
              <CardContent>
                <Typography variant="body1">{selectedCoach.coachName}</Typography>
                {/* You can add more details here if needed */}
                <CoachStatsCard coach={selectedCoach} />
              </CardContent>
            </Card>
          )}     

        </div>
      </Container>
    );
  };

  const CoachesList = () => {
    return (
      <div style={{ width: '50%' }}
      className='gridt'
      >
        <h3 className="text">Available Coaches</h3>
        {coaches.map((coach) => (
          <CoachCard key={coach.coachName} onClick={() => handleCoachSelection(coach)}
          className='inputs'>
            <span>{coach.coachName}</span>
            <span>Sport: {coach.sportsName}</span>
            <span>Experience: {coach.experience} years</span>
          </CoachCard>
        ))}
        
      </div>
    );
  };
  

  return (
    <div>
    <AdminNavbar/>
<br/>
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, minWidth: 320 },
        }}
        noValidate
        autoComplete="off"
        className='formc'

      >
        <TextField
          label="Team Name"
          variant="outlined"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          style={{ marginBottom: '10px' }}
        />
        <br/>

        <Button variant="contained" onClick={() => setSelectedSport('Cricket')}>
          Create Cricket Team
        </Button><br/>
        <Button variant="contained" onClick={() => setSelectedSport('Football')}>
          Create Football Team
        </Button><br/>

</Box>

<Box
component="form"
sx={{
  '& > :not(style)': { m: 1, minWidth: 320 },
}}
noValidate
autoComplete="off"

>
        {selectedSport && (
          <>
            <PlayersList />
            <CoachesList />
          </>
        )}
        {selectedCoach && (
          <Button
            variant="contained"
            onClick={() => {
              const newTeam = {
                teamName: teamName,
                selectedSport: selectedSport,
                selectedPlayers: selectedPlayers,
                selectedCoach: selectedCoach,
              };
        
              // Save the new team to local storage
              const storedTeams = JSON.parse(localStorage.getItem('teams')) || [];
              const updatedTeams = [...storedTeams, newTeam];
              localStorage.setItem('teams', JSON.stringify(updatedTeams));
        
              console.log('Submit Team:', newTeam);
            }}
          >
            Submit Team
          </Button>
        )}
      </Box>

    </div>
  );
}

export default CreateTeam;
