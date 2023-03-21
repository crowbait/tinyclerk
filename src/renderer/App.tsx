import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import blue from '@mui/material/colors/blue';
import './App.css';
import RootComponent from './RootComponent';

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: blue
  }
});

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RootComponent />
    </ThemeProvider>
  )
}

export default App;
