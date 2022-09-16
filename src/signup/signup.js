import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import GoogleIcon from "@mui/icons-material/Google";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import {
  auth,
  registerWithEmailAndPassword,
  signInWithGoogle,
} from "../firebase";

const SignUp = () => {
  const paperStyle = { margin: "25% auto", display: "flex" };
  const avatarStyle = { backgroundColor: "#2196f3" };
  const btnStyle = { margin: "3px 3px" };
  const txtStyle = { margin: "3px 3px" };
  const theme = createTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const register = () => {
    registerWithEmailAndPassword(fname, lname, email, password);
  };
  useEffect(() => {
    if (loading) return;
    if (user) navigate("/chatapp");
  }, [user, loading]);
  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={5}
          md={6}
          sx={{
            backgroundImage:
              "url(https://media.wired.com/photos/600f12796a02aa6825bba609/master/pass/Science_telegram_1220060398.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></Grid>
        <Grid item xs={12} sm={8} md={6} elevation={6}>
          <Box
            elevation={10}
            style={paperStyle}
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Grid item align="center">
              <Avatar style={avatarStyle}>
                <AssignmentIndIcon />
              </Avatar>
              <h2>Sign Up</h2>
            </Grid>
            <form>
              <Grid container>
                <Grid item xs={6} sm={8} md={6} elevation={6}>
                  <TextField
                    label="First Name"
                    placeholder="First Name"
                    variant="outlined"
                    style={txtStyle}
                    color="primary"
                    fullWidth
                    required
                    onChange={(e) => setFname(e.target.value)}
                  />
                </Grid>
                <Grid item xs={6} sm={8} md={6} elevation={6}>
                  <TextField
                    label="Last Name"
                    placeholder="Last Name"
                    variant="outlined"
                    style={txtStyle}
                    color="primary"
                    fullWidth
                    required
                    onChange={(e) => setLname(e.target.value)}
                  />
                </Grid>
              </Grid>
              <Grid item>
                <TextField
                  label="Email"
                  placeholder="Email"
                  type="email"
                  variant="outlined"
                  style={txtStyle}
                  color="primary"
                  fullWidth
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                  label="Password"
                  placeholder="Password"
                  type="password"
                  variant="outlined"
                  style={txtStyle}
                  color="primary"
                  fullWidth
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>

              <Button
                type="button"
                color="primary"
                variant="contained"
                style={btnStyle}
                fullWidth
                onClick={register}
              >
                {" "}
                Sign Up{" "}
              </Button>
              <Typography align="center">OR</Typography>
              <Button
                type="button"
                color="primary"
                variant="outlined"
                style={btnStyle}
                fullWidth
                onClick={signInWithGoogle}
              >
                Sign In with Google{" "}
                <GoogleIcon sx={{ fontSize: 20, padding: "2px" }} />
              </Button>
            </form>

            <Typography>
              {" "}
              You do have an account ?
              <Link to="/" style={{ textDecoration: "none", color: "#2196f3" }}>
                {" "}
                Sign In{" "}
              </Link>
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default SignUp;
