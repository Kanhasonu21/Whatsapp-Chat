import React, { useState, useRef, useEffect } from 'react';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
// import Alert from '@material-ui/lab/Alert';
import CodeIcon from '@material-ui/icons/Code';

import './App.css';
import { Typography } from '@material-ui/core';
const App = props => {
  const [query, setQuery] = useState('');
  const [errors, setError] = useState({
    phone: ''
  });
  const searchInput = useRef(null);

  useEffect(() => {
    searchInput.current.focus();
  }, [query]);
  const validateField = () => {
    let errorMsg = '';
    if (!query) errorMsg = 'Please input a number';
    if (query.length < 10) errorMsg = 'Please input a valid number';
    if (query.length > 10) errorMsg = 'Please input a valid number';

    return errorMsg;
  };
  const search = e => {
    e.preventDefault();
    let data = validateField();
    setError({ phone: data });
    if (query.length === 10) {
      window.location = `https://api.whatsapp.com/send/?phone=91${query}&text&app_absent=0`;
      // } else {
      //   return (
      //     <Alert severity="success" color="info">
      //       This is a success alert — check it out!
      //     </Alert>
      //   );
    }
  };

  return (
    <div className="main-container">
      <form onSubmit={e => search(e)}>
        <div className="search__input">
          <Input
            type="number"
            fullWidth={true}
            disableUnderline={true}
            placeholder="Enter phone number"
            inputRef={searchInput}
            value={query}
            onChange={e => {
              setQuery(e.target.value);
              setError({ phone: '' });
            }}
            error={query.length > 10 ? 'max ' : null}
          />
        </div>
        <div className="search">
          <Button className="search_button" variant="contained" color="primary" type="submit">
            <WhatsAppIcon /> &nbsp; &nbsp; <Typography style={{ font: 'message-box' }}>CHAT</Typography>
          </Button>
        </div>
        {errors.phone && (
          <div className="error">
            <span>{errors.phone}</span>
          </div>
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
