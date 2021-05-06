import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";

import trashImage from "../../Assets/Trash.svg";
import editImage from "../../Assets/Edit.svg";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  description: {
    backgroundColor: "#d3d3d3",
  },
  annotation: {
    marginTop: "5vw",
    textAlign: "center",
    maxWidth: "1100px",
    margin: "auto",
  },
  imageButtons: {
    width: 30,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog({
  option,
  note,
  setModalOpenDetails,
  setModalUpdate,
  setModalDelete
}) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setModalOpenDetails(false);
    
  };

  useEffect(() => {
    setOpen(option);
  });

  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              {note.title}
            </Typography>
            <Button  onClick={() => {
                setModalUpdate(true)
              }}>
              <img src={editImage} className={classes.imageButtons} />
            </Button>
            <Button  onClick={() => {
                setModalDelete(true)
              }}>
              <img src={trashImage} className={classes.imageButtons} />
            </Button>
          </Toolbar>
        </AppBar>

        <List>
          {note.description !== null ? (
            <ListItem className={classes.description}>
              <ListItemText primary={note.description} />
            </ListItem>
          ) : (
            ""
          )}
          <Divider />
          <div className={classes.annotation}>
            <div
              dangerouslySetInnerHTML={{
                __html: note.annotation,
              }}
            ></div>
          </div>
        </List>
      </Dialog>
    </div>
  );
}
