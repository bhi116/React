import './App.css'
import { Outlet, Link, useLocation } from "react-router-dom";
import { AppBar, Box, Container, CssBaseline, Toolbar, Tabs, Tab} from '@mui/material';


function App() {

  const location = useLocation();
  const tabValue = location.pathname === "/" ? 0 : location.pathname === "/todos" ? 1 : false;

  return (
    <>
      <AppBar position="fixed" sx={{ width: "100%", backgroundColor: "white" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "center", gap: 3 }}>
          <Tabs value={tabValue} indicatorColor="secondary" sx={{ "& .MuiTabs-indicator": { backgroundColor: "pink" } }}>
          <Tab label="Home" component={Link} to="/" />
          <Tab label="Todos" component={Link} to="/todos" />
          </Tabs>
        </Toolbar>
      </AppBar>

      <Box sx={{ marginTop: 8, padding: 2 }}>
        <Container maxWidth="xl">
          <CssBaseline />
          <Outlet/>
        </Container>
      </Box>
    </>
  );
}

export default App;
