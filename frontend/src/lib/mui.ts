import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#134a21', 
    },
    secondary: {
      main: '#dc004e', 
    },
    background: {
     default:'#fffaf2',
     paper:'#e7e3d9',
     light:'#ffffff',
    },
    text:{
      primary: '#134a21',
      secondary: '#debe48',
    }
  },
  typography: {
    fontFamily: 'fontVictorSerif, "fontVictorSerif Fallback", serif, system-ui',
  },
});

export default theme;