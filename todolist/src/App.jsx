import './App.css'
import { Outlet } from "react-router-dom";
import { AppBar, Box, Container, CssBaseline, Toolbar, Tabs, Tab, Typography } from '@mui/material';
import { useState } from 'react';

function App() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <AppBar position="fixed" sx={{ width: "100%", backgroundColor: "white" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "center", gap: 3 }}>
          <Tabs value={value} onChange={handleChange} indicatorColor="secondary" sx={{ "& .MuiTabs-indicator": { backgroundColor: "pink" } }}>
            <Tab label="Home"/>
            <Tab label="Todos"/>
          </Tabs>
        </Toolbar>
      </AppBar>

      <Box sx={{ marginTop: 8, padding: 2 }}>
        <Container maxWidth="xl">
          <CssBaseline />
          {value === 0 && (
            <Typography variant="h4" align="center">Welcome</Typography>
          )}
          {value === 1 && <Outlet />}
        </Container>
      </Box>
    </>
  );
}

export default App;
