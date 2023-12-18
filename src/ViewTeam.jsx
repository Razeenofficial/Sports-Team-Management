import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import AdminNavbar from './AdminNavbar';
import Navbar from './Navbar';

function ViewTeam() {
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);

  useEffect(() => {
    // Fetch teams from local storage or API
    const storedTeams = JSON.parse(localStorage.getItem('teams')) || [];
    setTeams(storedTeams);
  }, []);

  const handleTeamClick = (team) => {
    // Set the selected team for detailed view
    setSelectedTeam(team);
  };

  const closeTeamDetails = () => {
    // Close the team details view
    setSelectedTeam(null);
  };

  const TeamCard = ({ team }) => (
    <Card
      sx={{ maxWidth: 200, cursor: 'pointer', margin: '10px',
    backgroundColor:'#B0926A' }}
      onClick={() => handleTeamClick(team)}
      className='team1'
    >
      <CardContent>
        <Typography variant="h6">{team.teamName}</Typography>
        {/* Add more details as needed */}
        <Typography variant="subtitle1">Sport: {team.selectedSport}</Typography>
      </CardContent>
    </Card>
  );

  const DetailedTeamCard = ({ team }) => (

    <div         className='gridt'
    >
    <Card sx={{ maxWidth: 600, padding: '20px', margin: '20px',
  backgroundColor:'#B99470', justifyItems:'center' }}
    className='c1'
    >
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Team name : <strong>{team.teamName}</strong>
        </Typography>
        {/* Add more details as needed */}
        <Typography variant="subtitle1">Sport: {team.selectedSport}</Typography>
        <Typography variant="h6" style={{ marginTop: '20px' }}>
          Players
        </Typography>
        <Grid container spacing={2}
        >
          {team.selectedPlayers.map((player) => (
            <Grid item key={player.uniqueId} xs={12} sm={4}>
              <Card sx={{ maxWidth: 200, marginBottom: '10px',
            backgroundColor:'#EBE3D5' }}
              className='c2'>
                <CardContent>
                  <Typography variant="subtitle1">{player.name}</Typography>
                  {player.isCaptain && <Typography variant="caption">Captain</Typography>}
                  {player.isViceCaptain && <Typography variant="caption">Vice Captain</Typography>}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Button variant="contained" onClick={closeTeamDetails} style={{ marginTop: '20px' }}>
          Close
        </Button>
      </CardContent>
    </Card></div>
  );

  return (
    <div>
<Navbar/>
    <div>
        <h3 className="text">Available Teams</h3>
        <Grid container spacing={2} 
        className='gridt'>
          {teams.map((team) => (
            <Grid item key={team.teamName} xs={12} sm={4}>
              <TeamCard team={team} />
            </Grid>
          ))}
        </Grid>
      </div>

      {selectedTeam && (
        <div>
          <DetailedTeamCard team={selectedTeam} />
        </div>
      )}
    </div>
  );
}

export default ViewTeam;
