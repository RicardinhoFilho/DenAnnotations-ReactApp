import React, { useState, useEffect } from "react";

import checkDescription from "../../Utils/CheckDescription";
import checkTitle from "../../Utils/CheckTitle";
import api from "../../Services/api";

import { makeStyles } from "@material-ui/core/styles";
import { Modal, TextField, Typography, Button } from "@material-ui/core";

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
  negativeFeedback:{
    color:"#ff6961"
  },
}));

export default function DeleteRepository({ option, rep, setModalDelete }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open != option) {
      setOpen(option);
    }
  });
const handleSubmit=()=>{
    api.delete(`/api/repositories/${rep.id}`);
}

  const handleClose = () => {
    setOpen(false);
    setModalDelete(false);
  };

  return (
    <Modal open={open} onClose={handleClose} className={classes.modal}>
      <div className={classes.paper}>
        <Typography variant="h6" align="center" id="title">
          Excluir Repositório!
        </Typography>
        <form onSubmit={()=>{
            handleSubmit();
        }}>
          <TextField
            label="Título"
            margin="normal"
            value={rep.title}
            
          />
          <br />
          <TextField
            label="Descrição"
            margin="normal"
            value={rep.description}
            />
          <br/><br/>
          <Typography variant="h6" align="center" id="title" className={classes.negativeFeedback}>
          Obs:Após a exclusão de um repositório não é possível recupera-lo, está desabilitada a exclusão de repositórios povoados!
        </Typography>
        <br/><br/>
          <Button type="submit" variant="contained" color="secondary" id="button">
            Confirmar
          </Button>
        </form>
      </div>
    </Modal>
  );
}