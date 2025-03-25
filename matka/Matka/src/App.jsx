import {AppBar, Box, Button, Container, createTheme, CssBaseline, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, ThemeProvider, Typography} from '@mui/material';
import { useState } from 'react';

function App() {

  const [on, setOn] = useState(false);
  
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar position='static'>
        <Container fixed>
        <Typography component=""h1 variant="h6">Matka app</Typography>
        </Container>
      </AppBar>
      <Container fixed>
      <CssBaseline/>
      <Stack direction="row" gap={1} mt={3}>
        <TextField label="Kohde" variant='outlined'/>
        <TextField label="Kesto" variant='outlined'/>
        <Button variant='outlined' onClick={() => setOn(!on)}>Lisää</Button>
      </Stack>

      <Box sx={{marginTop: {xs: 1, sm: 6}}}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Kohde</TableCell>
                <TableCell>Kesto</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Tampere</TableCell>
                <TableCell>2</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Espoo</TableCell>
                <TableCell>4</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  </ThemeProvider>
  )
}

export default App
