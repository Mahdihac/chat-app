import React, { useState, useRef, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Avatar from "@mui/material/Avatar";
import Fab from "@mui/material/Fab";
import SendIcon from "@mui/icons-material/Send";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db,rdb, logout, sendMessage } from "../firebase";
import { query, collection, getDocs, where, orderBy } from "firebase/firestore";
import { ref, onValue} from "firebase/database";
import firebase from "firebase/compat/app";

const ChatApp = () => {
  const current = new Date();
  const ctime = current.toLocaleString();
  const StyledBadge = styled(Badge)(({ theme, stat }) => ({
    "& .MuiBadge-badge": {
      backgroundColor: stat ? "#44b700" : "silver",
      color: "#44b700",
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      "&::after": {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        borderRadius: "50%",
      },
    },
  }));

  const [mesg, setMsg] = useState([]);
  const [user, loading, error] = useAuthState(auth);
  const [userData, setuserData] = useState("");
  const navigate = useNavigate();
  const msgRef = ref(rdb, 'messages/');

  useEffect(() => {
    onValue(msgRef, (snapshot) => {
      const Data = snapshot.val();
      console.log(Data)
      let array=[]
      Object.keys(Data).map((item,index)=>(
        array.push(Data[item])
      ))
      setMsg(array);
    
    })
  }, []);

  const handleClick = () => {
    // value != "" &&
    //   setMsg((current) => [
    //     ...current,
    //     { message: value, time: ctime, userId: userData?.id },
    //   ]);
    sendMessage(value, ctime, userData?.id,userData.fname,userData.lname);
    setValue(() => "");
  };
  const [value, setValue] = useState("");
  // const scrl = useRef();
  // useEffect(() => {
  //   scrl.current.scrollIntoView({ behavior: "smooth" });
  // }, [mesg]);

  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setuserData({ ...data, id: doc.docs[0].id });
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
    fetchUserName();
  }, [user, loading]);

  return (
    <Box>
      <Grid
        container
        component={Paper}
        style={{ backgroundColor: "#add8e680", padding: 5 }}
      >
        <Grid item xs={6}>
          <Typography
            variant="h5"
            className="header-message"
            align="left"
            color="primary"
          >
            Chat App
          </Typography>
        </Grid>

        <Grid item xs={6} align="right">
          <Grid item xs={1} />
          <PopupState variant="popover" popupId="demo-popup-menu">
            {(popupState) => (
              <React.Fragment>
                <Button variant="" {...bindTrigger(popupState)} align="right">
                  <MoreVertIcon align="right" style={{ color: "darkblue" }} />
                </Button>
                <Menu {...bindMenu(popupState)}>
                  <Link
                    to=""
                    style={{ textDecoration: "none", color: "darkblue" }}
                  >
                    <MenuItem>My account</MenuItem>
                  </Link>
                  <Link
                    to=""
                    style={{ textDecoration: "none", color: "darkblue" }}
                  >
                    <MenuItem onClick={logout}>Logout</MenuItem>
                  </Link>
                </Menu>
              </React.Fragment>
            )}
          </PopupState>
        </Grid>
      </Grid>
      <Grid container component={Paper}>
        {/*  <Grid item xs={3} component={Paper}>
          <Grid
            item
            xs={12}
            style={{ padding: "10px", backgroundColor: "#add8e680" }}
            component={Paper}
          >
            <TextField label="Search" variant="outlined" fullWidth />
          </Grid>
          <div>
            <List
              component={Paper}
              style={{
                backgroundColor: "#f5f5f5",
                display: "flex",
                flexDirection: "column",
                maxHeight: "85.5vh",
                minHeight: "85.5vh",
                overflowY: "scroll",
              }}
            >
              {friends.map((itm) => (
                <ListItem
                  button
                  key={itm.userId}
                  style={{
                    backgroundColor:
                      itm.userId === openConv ? "#add8e680" : "#ffffff80",
                    borderRadius: 20,
                  }}
                >
                  <ListItemIcon>
                    <StyledBadge
                      overlap="circular"
                      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                      variant="dot"
                      stat={itm.stat}
                    >
                  
                    </StyledBadge>
                  </ListItemIcon>
                  <div>
                    <Typography>{itm.fname + " " + itm.lname}</Typography>
                    <div
                      style={{
                        color: "#777777",
                        fontSize: 13,
                        whiteSpace: "nowrap",
                        maxWidth: "200px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {itm.lastmsg}
                    </div>
                  </div>
                </ListItem>
              ))}
              ;
            </List>
            <Divider />
          </div>
        </Grid> */}
        <Grid item xs={12} style={{ height: "100%" }}>
          <List
            component={Paper}
            style={{
              backgroundImage:
                "url(https://i.pinimg.com/736x/8c/98/99/8c98994518b575bfd8c949e91d20548b.jpg)",
              maxHeight: "86vh",
              minHeight: "86vh",
              overflowY: "scroll",
            }}
          >
            {mesg.map((item, index) => (
              <ListItem key={index} style={{ display: "flex",alignItems:"flex-start" }}>
                 { item.userId !== userData?.id  &&   <Avatar style={{marginRight:10}} >{item?.fname?.charAt(0)?.toUpperCase()}{item?.lname?.charAt(0)?.toUpperCase()}</Avatar>}
                <div
                  style={{
                    display: "Flex",
                    justifyContent:
                      item.userId === userData?.id ? "flex-end" : "flex-start",
                    flex: 1,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      maxWidth: "70%",
                    }}
                  >
                    <div
                      xs={4}
                      component={Paper}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        backgroundColor:
                          item.userId === userData?.id ? "skyblue" : "silver",
                        borderRadius: 15,
                        padding: 10,
                      }}
                    >
                      <Typography className="message">
                        {item.message}
                      </Typography>
                    </div>
                    <Grid item>
                      <Typography
                        style={{
                          textAlign:
                            item.userId === userData?.id ? "right" : "left",
                          variant: "overline",
                          fontSize: "12px",
                        }}
                      >
                        {item.time}
                      </Typography>
                    </Grid>
                  </div>
                  {/* <span ref={scrl}></span> */}
                </div>
              </ListItem>
            ))}
          </List>
          <Divider />
          <Grid
            container
            style={{ padding: "8px", backgroundColor: "#f5f5f5" }}
          >
            <Grid item xs={11}>
              <TextField
                value={value}
                onChange={(e) => {
                  setValue(e.target.value);
                }}
                label="Message"
                fullWidth
              />
            </Grid>
            <Grid item xs={1} align="center">
              <Fab color="primary" aria-label="add" onClick={handleClick}>
                <SendIcon />
              </Fab>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ChatApp;
