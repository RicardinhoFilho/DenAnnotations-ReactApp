import React, { useState, useEffect,useRef } from "react";

import checkDescription from "../../Utils/CheckDescription";
import checkTitle from "../../Utils/CheckTitle";
import api from "../../Services/api";

import { makeStyles } from "@material-ui/core/styles";
import { Modal, TextField, Typography, Button,TextareaAutosize } from "@material-ui/core";


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
  }
}));

export default function AddNote({ option, setModalAdd, repId,setRefresh }) {

    const editor = useRef(null)
	const [content, setContent] = useState('')
	
	const config = {
		readonly: false // all options from https://xdsoft.net/jodit/doc/
	}

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
    if(description.length == 0){
        api.post(`/api/notes/${repId}`, {title,annotation});
    }else
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
          Adicionar Anotações!
        </Typography>
        <form  className={classes.form}
        onSubmit={(event)=>{
            if (
              checkTitle(title).isValid == true &&
              checkDescription(description).isValid == true && annotation.length > 0
            ) {
              handleSubmit();
              event.preventDefault();
              setRefresh(true);
              setTitle("");
              setAnnotation("");
              setDescription("");
              handleClose()
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
        <br/><br/><br/><br/>
      
        <JoditEditor
        required
            	ref={editor}
                value={content}
                config={config}
		tabIndex={1} // tabIndex of textarea
		onBlur={newContent => setAnnotation(newContent)} // preferred to use only this option to update the content for performance reasons
                
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
