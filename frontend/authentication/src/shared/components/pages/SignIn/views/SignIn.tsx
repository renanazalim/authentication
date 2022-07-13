import { Grid } from "@mui/material";
import FormSignIn from "../../../organisms/form-signin";
import * as React from 'react';

const SignIn = () => {

    return (
        <>
        <Grid container direction="column" justifyContent="center" alignItems="center">
            <FormSignIn></FormSignIn>
        </Grid>
        </>
      );
}

export default SignIn;