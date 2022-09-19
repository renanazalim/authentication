import {  CssBaseline} from '@mui/material';
import React  from 'react';
import './App.css';
import AlternativeSignIn from './shared/components/pages/AlternativeSignIn';
import { createTheme, ThemeProvider } from '@mui/material/styles';
const projectTheme = createTheme();

function App() {
  return (
    <ThemeProvider theme={projectTheme}>
      <CssBaseline />      
      <AlternativeSignIn/>
    </ThemeProvider>
  );
}

export default App;
