import React, { useState, useEffect, useRef } from "react";

import checkDescription from "../../Utils/CheckDescription";
import checkTitle from "../../Utils/CheckTitle";
import api from "../../Services/api";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core/styles";
import {
  Modal,
  TextField,
  Typography,
  Button,
  MuiTabScrollButton,
  Tabs,
} from "@material-ui/core";

import CheckIcon from "@material-ui/icons/Check";
import JoditEditor from "jodit-react";
const useStyles = makeStyles((theme) => ({
  modal: {
    textAlign: "center",
    justifyContent: "right",
    display: "block",
  },

  paper: {
    maxWidth: 1000,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    margin: "auto",
    marginTop: "8vw",
    overflowY: "initial",
  },
  form: {
    maxHeight: "30vw",
    overflowY: "auto",
  },
  button: {
    position: "flex",
    backgroundColor: "#FFFF00",
    opacity: ["0.8"].join(","),
    "&:hover": {
      backgroundColor: "#FFFF00",
      opacity: "1",
    },
  },
}));

export default function UpdateNote({
  option,
  note,
  setModalUpdate,
  setRefresh,
  setNote,
}) {
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
      setContent(note.annotation);
    }
  });
  const handleSubmit = async () => {
    try {
      if (titleError.isValid != false && descriptionError.isValid != false) {
        const response = await api.patch(`/api/note/${note.id}`, {
          title,
          description,
          annotation,
          setRefresh,
        });
        handleClose();
        setRefresh(true);

        const id = note.id;
        console.log(response.data);
        setNote({ id, title, description, annotation, id });
        setTitle("");
        setAnnotation("");
        setDescription("");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setModalUpdate(false);
  };
  const editorRef = useRef(null);

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        className={classes.modal}
        disableBackdropClick="false"
      >
        <div className={classes.paper}>
          <Typography variant="h6" align="right" id="title">
            <Button
              type="submit"
              variant="contained"
              id="button"
              className={classes.button}
              onClick={handleSubmit}
            >
              Confirmar
              <CheckIcon />
            </Button>
            <Button onClick={handleClose}>
              Cancelar
              <CloseIcon />
            </Button>
          </Typography>
          <Typography variant="h6" align="center" id="title">
            Editar Repositório!
          </Typography>
          <form className={classes.form}>
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
              //ref={editor}
              value={content}
              //config={this.config}
              tabIndex={-1} // tabIndex of textarea
              onChange={(newContent) => {
                const text = newContent + " "; //Como o Jodit não percebe diferença em uma colagem toda vez que houver colagem ele irá adicionar um espaço, desta forma perceberá a diferença
                setAnnotation(text);
              }} // preferred to use only this option to update the content for performance reasons
              // onChange={(newContent) => setAnnotation(newContent + "")}
              className={classes.editor}
            />
            <br />
            <br />
            <br /> <br />
          </form>
        </div>
      </Modal>
    </>
  );
}
