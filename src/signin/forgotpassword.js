import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { auth, sendPasswordReset } from "../firebase";
import "./reset.css";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
function Reset() {
  const [email, setEmail] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) return;
    if (user) navigate("/dashboard");
  }, [user, loading]);
  return (
    <div className="reset">
      <div component={Paper} className="reset__container">
        <Grid>
        <TextField
          type="email"
          label="E-mail Address"
          className="reset__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
          fullWidth
        />
        </Grid>
        <Grid padding={1}/>
        <Grid>
        <Button
          className="reset__btn"
          onClick={() => sendPasswordReset(email)}
          color="primary"
          variant="contained"
          fullWidth
        >
          Send password reset email
        </Button>
        </Grid>
        <div>
          Don't have an account? <Link to="/signup" style={{ textDecoration: "none", color: "#2196f3" }}>Sign Up</Link> now.
        </div>
      </div>
    </div>
  );
}
export default Reset;