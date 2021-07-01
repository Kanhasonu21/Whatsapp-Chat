import React, { useState, useRef, useEffect } from 'react';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
// import Alert from '@material-ui/lab/Alert';

import './App.css';
const App = props => {
  const [query, setQuery] = useState('');
  const searchInput = useRef(null);

  useEffect(() => {
    searchInput.current.focus();
  }, [query]);

  const search = e => {
    e.preventDefault();
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
            onChange={e => setQuery(e.target.value)}
            error={query.length > 10 ? 'max ' : null}
          />
        </div>
        <div className="search">
          <Button className="search_button" variant="contained" color="primary" type="submit">
            <WhatsAppIcon /> &nbsp; &nbsp; CHAT
          </Button>
        </div>
      </form>
    </div>
  );
};

export default App;
