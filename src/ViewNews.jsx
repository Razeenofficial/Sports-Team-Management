// ViewNews.jsx
import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Navbar from './Navbar';

function ViewNews() {
  const [newsletters, setNewsletters] = useState([]);

  useEffect(() => {
    // Fetch newsletters from local storage
    const storedNewsletters = JSON.parse(localStorage.getItem('newsletters')) || [];
    setNewsletters(storedNewsletters);
  }, []);

  return (
    <div>
    <Navbar/>
      {newsletters.length > 0 ? (
        <div         className='gridt'
        ><br/>
          {newsletters.map((newsletter, index) => (
            <Card key={index} sx={{ marginBottom: '16px',backgroundColor:'white',maxWidth:'60%' }}
            >
              <CardContent>
                <Typography variant="h6">{newsletter.subject}</Typography>
                <Typography variant="body2">{newsletter.date}</Typography>
                <Typography variant="body1">{newsletter.description}</Typography>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <p>No newsletters available.</p>
      )}
    </div>
  );
}

export default ViewNews;
