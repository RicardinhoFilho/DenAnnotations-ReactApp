import React, { useState, useEffect, useRef } from "react";

import checkDescription from "../../Utils/CheckDescription";
import checkTitle from "../../Utils/CheckTitle";
import api from "../../Services/api";

import { makeStyles } from "@material-ui/core/styles";
import { Modal, TextField, Typography, Button,MuiTabScrollButton,Tabs } from "@material-ui/core";

import JoditEditor from "jodit-react";
const useStyles = makeStyles((theme) => ({
  modal: {
    textAlign: "center",
    justifyContent: "right",
    display:"block"
  },

  paper: {
    maxWidth:1000,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    margin: "auto",
    marginTop: "8vw",
    overflowY: "initial"
  },
  form:{
    maxHeight: "30vw",
    overflowY: "auto"
  },
  button: {
    backgroundColor: "#FFFF00",
    opacity: ["0.8"].join(","),
    "&:hover": {
      backgroundColor: "#FFFF00",
      opacity: "1",
    },
  }
}));

export default function UpdateNote({ option, note, setModalUpdate, setRefresh,
  setNote}) {
  const editor = useRef(null);
  const [content, setContent] = useState("");

  const config = {
    readonly: false, // all options from https://xdsoft.net/jodit/doc/
  };

  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [annotation, setAnnotation] = useState("");
  const [titleError, setTitleError] = useState([]);
  const [descriptionError, setDescriptionError] = useState([]);
  const [annotationError, setAnnotationError] = useState([]);

  useEffect(() => {
    if (open != option) {
      setOpen(option);
      setTitle(note.title);
      setDescription(note.description);
      setAnnotation(note.annotation);
      setContent((note.annotation))
    }
  });
  const handleSubmit = async() => {
    await api.patch(`/api/note/${note.id}`, { title, description, annotation,setRefresh });
    const id= note.id;
    setNote({id,title, description, annotation, id})
  };

  const handleClose = () => {
    setOpen(false);
    setModalUpdate(false);
  };

  return (
    <>
    <Modal open={open} onClose={handleClose} className={classes.modal} disableScrollLock={true}>
      <div className={classes.paper}>
        <Typography variant="h6" align="center" id="title">
          Editar Repositório!
        </Typography>
        <form className={classes.form}
          onSubmit={(event) => {
            if (
              titleError.isValid != false &&
              descriptionError.isValid != false
            ) {
              handleSubmit();
              event.preventDefault();
              handleClose()
              setRefresh(true);
              setTitle("");
              setAnnotation("");
              setDescription("");
            } else {
              event.preventDefault();
            }
          }}
        >
          <TextField
            label="Título"
            margin="normal"
            value={title}
            required
            onBlur={(event) => {
              if (typeof title !== "object") {
                const isValid = checkTitle(title);

                setTitleError(isValid);
              }
            }}
            error={titleError.error}
            helperText={titleError.msg}
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
          <br />
          <TextField
            label="Descrição"
            margin="normal"
            value={description}
            onBlur={(event) => {
              if (typeof description !== "object") {
                const isValid = checkDescription(description);
                setDescriptionError(isValid);
              }
            }}
            error={descriptionError.error}
            helperText={descriptionError.msg}
            onChange={(event) => {
              setDescription(event.target.value);
            }}
          />
          <br />
          <br />
          <br />
          <br />
          
          <JoditEditor
            ref={editor}
            value={content}
            config={config}
            tabIndex={0} // tabIndex of textarea
            onBlur={(newContent) => setAnnotation(newContent)} // preferred to use only this option to update the content for performance reasons
            className={classes.editor}
          />
          
          <br />
          <br />
          <br /> <br />
          <Button
            type="submit"
            variant="contained"
            id="button"
            className={classes.button}
          >
            Confirmar
          </Button>
        </form>
      </div>
     
      
    </Modal>
    </>
  );
}
