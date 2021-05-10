import React, { useEffect, useState } from "react";

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

import ModalFile from "./ModalFile";

import { useHistory } from "react-router-dom";
import AddFile from "./AddFile";
import api from "../../Services/api";
import checkExtension from "../../Utils/CheckExtension";

import trashImage from "../../Assets/Trash.svg";
import editImage from "../../Assets/Edit.svg";
import plusImage from "../../Assets/Plus.svg";

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
  wrapper: {
    minHeight: "100%",
    marginBottom: "-50px",
  },
  push: {
    height: "50px",
  },
  footer: {
    marginTop: "50px",
    backgroundColor: "#d3d3d3",
  },
  linkDiv: {
    display: "inline",
    marginTop: "20px",
  },

  buttonFile: {
    margin: "5px",
  },
  fileTitle: {
    fontSize: "12px",
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
  setModalDelete,
}) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [modalAddFile, setModalAddFile] = useState(false);
  const [modalFile, setModalFile] = useState(false);
  const [files, setFiles] = useState([]);
  const [file, setFile] = useState([]);
  const [refresh, setRefresh] = useState(true);
  const history = useHistory();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setModalOpenDetails(false);
  };

  async function getData() {
    const token = localStorage.getItem("token");
    if (token) {
      api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
      const result = await api.get(`/api/files/${note.id}`);
      // console.log("teste",result);
      setFiles(result.data);
      //console.log(files)
    } else {
      history.push("/login");
    }
  }
 
  useEffect(() => {
    setOpen(option);
    setRefresh(false);
    if (option) {
      getData();
    }
  }, [option,refresh]);

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
            <Button
              onClick={() => {
                setModalUpdate(true);
              }}
            >
              <img src={editImage} className={classes.imageButtons} />
            </Button>
            <Button
              onClick={() => {
                setModalDelete(true);
              }}
            >
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
         
          <ListItem className={classes.footer}>
            <ListItemText
              primary={
                <div>
                  {" "}
                  <Button
                    onClick={() => {
                      setModalAddFile(true);
                    }}
                  >
                    <img src={plusImage} className={classes.imageButtons} />
                  </Button>
                  {note.id > 0
                    ? files.map((item) => (
                        <div className={classes.linkDiv}>
                          <Button
                            variant="contained"
                            className={classes.buttonFile}
                            onClick={() => {
                              setFile(item);
                              setModalFile(true);
                            }}
                          >
                            <Typography className={classes.fileTitle}>
                              {checkExtension(item.file)}
                              {item.title}
                            </Typography>
                          </Button>
                        </div>
                      ))
                    : ""}
                </div>
              }
            />
          </ListItem>
        </List>
      </Dialog>
      <AddFile
        option={modalAddFile}
        noteId={note.id}
        setModalFile={setModalAddFile}
        setRefresh={setRefresh}
      />
      <ModalFile
        option={modalFile}
        file={file}
        setRefresh={setRefresh}
        setModalFile={setModalFile}
      />
    </div>
  );
}
