import React, { useState, useEffect } from "react";

import checkDescription from "../../Utils/CheckDescription";
import checkTitle from "../../Utils/CheckTitle";
import api from "../../Services/api";

import { makeStyles } from "@material-ui/core/styles";
import { Modal, TextField, Typography, Button,TextareaAutosize } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  modal: {
    textAlign: "center",
    justifyContent: "right",
  },

  paper: {
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    margin: "auto",
    marginTop: "15vw",
  },
}));

export default function AddNote({ option, setModalAdd, repId }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [titleError, setTitleError] = useState([{ error: true }]);
  const [descriptionError, setDescriptionError] = useState([]);
  const [annotation, setAnnotation] = useState("");
  const [annotationError, setAnnotationError] = useState([]);

  useEffect(() => {
    if (open != option) {
      setOpen(option);
    }
  });
const handleSubmit=()=>{
    api.post(`/api/notes/${repId}`, {title, description,annotation});
}

  const handleClose = () => {
    setOpen(false);
    setModalAdd(false);
  };

  return (
    <Modal open={open} onClose={handleClose} className={classes.modal}>
      <div className={classes.paper}>
        <Typography variant="h6" align="center" id="title">
          Adicionar Repositório!
        </Typography>
        <form onSubmit={(event)=>{
            if (
              checkTitle(title).isValid == true &&
              checkDescription(description).isValid == true
            ) {
              handleSubmit();
            } else {
              event.preventDefault();
            }
        }}>
          <TextField
            label="Título"
            margin="normal"
            value={title}
            required
            onBlur={(event) => {
              const isValid = checkTitle(title);

              setTitleError(isValid);
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
              const isValid = checkDescription(description);

              setDescriptionError(isValid);
            }}
            error={descriptionError.error}
            helperText={descriptionError.msg}
            onChange={(event) => {
              setDescription(event.target.value);
            }}
          />
        <br/>
        <TextareaAutosize
            label="Anotação"
            margin="normal"
            
            type="textarea"
            value={annotation}
            onBlur={(event) => {
              const isValid = checkDescription(annotation);

              setAnnotationError(isValid);
            }}
            error={annotationError.error}
            helperText={annotationError.msg}
            onChange={(event) => {
              setAnnotation(event.target.value);
            }}
          />

          <br /><br /> 
          <Button type="submit" variant="contained" color="primary" id="button">
            Confirmar
          </Button>
        </form>
      </div>
    </Modal>
  );
}
