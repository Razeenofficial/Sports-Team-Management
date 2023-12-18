// Newsletter.jsx
import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { ColorLens } from '@mui/icons-material';

function Newsletter() {
  // State for newsletter details
  const [newsletterDetails, setNewsletterDetails] = useState({
    date: '',
    subject: '',
    description: '',
    // Add more fields as needed
  });

  // State for stored newsletters
  const [storedNewsletters, setStoredNewsletters] = useState([]);

  // Fetch newsletters from local storage on component mount
  useEffect(() => {
    const storedNewsletters = JSON.parse(localStorage.getItem('newsletters')) || [];
    setStoredNewsletters(storedNewsletters);
  }, []);

  // Function to handle form submission
  const handleWriteNewsletter = (e) => {
    e.preventDefault();

    // Create a new newsletter object
    const newNewsletter = {
      date: newsletterDetails.date,
      subject: newsletterDetails.subject,
      description: newsletterDetails.description,
      // Add more fields as needed
    };

    // Save the new newsletter to local storage
    const updatedNewsletters = [...storedNewsletters, newNewsletter];
    localStorage.setItem('newsletters', JSON.stringify(updatedNewsletters));

    // Update the state with the new newsletters
    setStoredNewsletters(updatedNewsletters);

    // Reset the form
    setNewsletterDetails({
      date: '',
      subject: '',
      description: '',
    });
  };

  // Function to handle delete newsletter
  const handleDeleteNewsletter = (index) => {
    const updatedNewsletters = [...storedNewsletters];
    updatedNewsletters.splice(index, 1);

    // Update the local storage and state
    localStorage.setItem('newsletters', JSON.stringify(updatedNewsletters));
    setStoredNewsletters(updatedNewsletters);
  };

  // Function to handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewsletterDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  return (
    <div>
      <form onSubmit={handleWriteNewsletter}>
        <label htmlFor="date"  className="text">Date:</label>
        



        <Box
        sx={{
          width: 500,
          maxWidth: '100%',
          backgroundColor:'white',
          borderRadius: '10px'
        }}
      >
        <TextField
         fullWidth 
         type="date"
         id="subject"
         name="subject"
         value={newsletterDetails.subject}
         onChange={handleInputChange}
         required  
         
          />
      </Box>








        <label htmlFor="subject"  className="text">Subject:</label>
       


        <Box
        sx={{
          width: 500,
          maxWidth: '100%',
          backgroundColor:'white',
          borderRadius: '10px'
        }}
      >
        <TextField
         fullWidth 
         type="text"
         id="subject"
         name="subject"
         value={newsletterDetails.subject}
         onChange={handleInputChange}
         required  
         
          />
      </Box>

        <label htmlFor="description"  className="text">Description:</label><br/>
        {/*<textarea
          id="description"
          name="description"
          value={newsletterDetails.description}
          onChange={handleInputChange}
          required
  ></textarea>*/}

  <Box
  component="form"
  sx={{
    '& .MuiTextField-root': { m: 1, width: '55ch' },
 
  }}
  noValidate
  autoComplete="off"
>
  <TextField
    id="description"
    name="description"
    value={newsletterDetails.description}
    onChange={handleInputChange}
    multiline
    rows={6}
    sx={{
      backgroundColor: 'white',
      borderRadius: '10px'


      // Add any additional styles for the TextField
    }}
  />
</Box>

        
        <br/>

        {/* Add more input fields as needed */}

        <button type="submit">Write Newsletter</button>
      </form>

      <div>
        <h2>Newsletters</h2>
        {storedNewsletters.map((newsletter, index) => (
          <Card key={index} sx={{ maxWidth: 400, margin: '10px 0' }}>
            <CardContent>
              <Typography variant="h6">{newsletter.subject}</Typography>
              <Typography variant="body2">{newsletter.date}</Typography>
              <Typography variant="body1">{newsletter.description}</Typography>
              <Button
                onClick={() => handleDeleteNewsletter(index)}
                variant="contained"
                color="error"
              >
                Delete
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Newsletter;
