import React, { useState, useRef, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import CodeIcon from '@material-ui/icons/Code';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import './App.css';
import { Typography } from '@material-ui/core';
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const App = props => {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [errors, setError] = useState({
    phone: ''
  });
  const searchInput = useRef(null);

  useEffect(() => {
    searchInput.current.focus();
  }, [query]);
  useEffect(() => {
    if (errors.phone.length > 0) setOpen(true);
  }, [errors]);
  const validateField = () => {
    console.log(query.length);
    let errorMsg = '';
    if (query.length === 0) errorMsg = 'Please input a number';
    if (query.length < 10 && query.length > 0) errorMsg = 'Please input a valid number';
    if (query.length > 10) errorMsg = 'Please input a valid number';

    return errorMsg;
  };
  const search = e => {
    e.preventDefault();
    let data = validateField();
    setError({ phone: data });
    if (query.length === 10) {
      window.location = `https://api.whatsapp.com/send/?phone=91${query}&text&app_absent=0`;
    }
  };
  const handleChange = e => {
    let { value, min, max } = e.target;
    if (value.length < 11) {
      setQuery(value);
      setError({ phone: '' });
    }
  };
  return (
    <div className="main-container">
      <form onSubmit={e => search(e)}>
        <div className="search__input">
          <input
            type="number"
            placeholder="Enter phone number"
            ref={searchInput}
            value={query}
            onChange={e => {
              handleChange(e);
            }}
            max="10000000000"
          />
        </div>
        <div className="search">
          <Button className="search_button" variant="contained" color="primary" type="submit">
            <WhatsAppIcon /> &nbsp; &nbsp; <Typography style={{ font: 'message-box' }}>CHAT</Typography>
          </Button>
        </div>
        {errors.phone && (
          <Snackbar
            autoHideDuration={2000}
            open={open}
            key={{ vertical: 'top', horizontal: 'center' }}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            onClose={() => setOpen(false)}
          >
            <Alert severity="error">{errors.phone}</Alert>
          </Snackbar>
        )}
      </form>
      <footer style={{ position: 'absolute', bottom: '0.5rem', fontSize: '0.5rem' }}>
        <b>
          <CodeIcon />
          <span>by Kanhaiya</span>
        </b>
      </footer>
    </div>
  );
};

export default App;
