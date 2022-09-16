import React from "react";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Box } from "@mui/system";
import { useState, useEffect } from "react";
import GoogleIcon from "@mui/icons-material/Google";
import { Link, useNavigate } from "react-router-dom";
import { auth, logInWithEmailAndPassword, signInWithGoogle } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      return;
    }
    if (user) navigate("/chatapp");
  }, [user, loading]);

  const paperStyle = { margin: "25% auto", display: "flex" };
  const avatarStyle = { backgroundColor: "#2196f3" };
  const btnStyle = { margin: "3px 3px" };
  const txtStyle = { margin: "3px 3px" };
  const theme = createTheme();
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
              "url(https://media.wired.com/photos/600f12796a02aa6825bba609/master/pass/Science_telegram_1220060398.jpg) ",
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
                <LockOutlinedIcon />
              </Avatar>
              <h2>Sign In</h2>
            </Grid>
            <form>
              <TextField
                label="Email"
                placeholder="Email"
                type="email"
                variant="outlined"
                style={txtStyle}
                color="primary"
                fullWidth
                required
                autoComplete="current-email"
                value={email}
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
                value={password}
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                type="button"
                color="primary"
                variant="contained"
                style={btnStyle}
                fullWidth
                onClick={() => logInWithEmailAndPassword(email, password)}
              >
                Sign In
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
              <Link
                to="/forgotpassword"
                style={{ textDecoration: "none", color: "#2196f3" }}
              >
                Forgot password ?
              </Link>
            </Typography>

            <Typography>
              {" "}
              You don't have an account ?
              <Link
                to="/signup"
                style={{ textDecoration: "none", color: "#2196f3" }}
              >
                {" "}
                Sign Up{" "}
              </Link>
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default SignIn;
