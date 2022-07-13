import { Button, Card, Grid, TextField,Avatar, CardHeader, IconButton, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import React  from 'react';
import './App.css';
import SignIn from './shared/components/pages/SignIn';
import {  theme as appTheme } from './theme';

const projectTheme = createTheme(appTheme);

function App() {
  return (
    <>
    <ThemeProvider theme={projectTheme}>
      <CssBaseline />      
      <SignIn/>
    </ThemeProvider>
    </>
  );
}

export default App;
