import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { TextField } from '@mui/material';
import Logo from '../../../img/iguana_logo.png';

export default function FormSignIn() {    
  return (
    <Card sx={{ maxWidth: 345, backgroundColor:"rgb(45, 45, 45)" }}>
      <CardMedia
        component="img"
        height="140"
        image={Logo}
        alt="octopus"
        classes="logo-imagem"
      />
      <CardContent>
        <Grid xs={12}>
              <TextField id="standard-basic" color="primary" fullWidth label="Email" variant="standard" />            
              <TextField id="standard-basic" fullWidth label="Senha" variant="standard" />
            </Grid>
      </CardContent>
      <CardActions>
        <Button size="large">Entrar</Button>
      </CardActions>
    </Card>
  );
}
