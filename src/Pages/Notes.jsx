import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../Components/Header";
import { Link } from "react-router-dom";
import plusImage from "../Assets/Plus.svg";
import trashImage from "../Assets/Trash.svg";
import editImage from "../Assets/Edit.svg";

import DeleteNote from "../Components/Notes/DeleteNote";
import AddNote from "../Components/Notes/AddNote"

import {
  makeStyles,
  List,
  ListItemText,
  ListItem,
  Typography,
  Button,
  Switch,
  FormControlLabel,
} from "@material-ui/core";

import api from "../Services/api";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 800,
    backgroundColor: theme.palette.background.paper,
    margin: "auto",
    marginTop: "1em",
  },
  item: {
    border: "solid 1.2px",
    marginTop: "0.6em",
    backgroundColor: "#e5e4e2",
    borderColor: "#d3d3d3",
  },
  title: {
    width: "100%",
    marginBottom: "1em",
  },
  plus: {
    backgroundColor: "#3f51b5",
  },
  link: {
    textDecoration: "none",
    color: "black",
  },
  firstButtons: {
    display: "flex",
    justifyContent: "space-around",
  },
}));

const Notes = () => {
  const { id } = useParams();
  const [notes, setNotes] = useState([]);
  const [note, setNote] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDescription, setShowDescription] = useState(false);
  const[modalDelete,setModalDelete] = useState(false);
  const[modalAdd,setModalAdd] = useState(false)

  function handleShowDescription() {
    setShowDescription(!showDescription);
  }

  function handleModalDelete(id, title, description,annotation) {
    setNote({ id: [id], title: [title], description: [description], annotation:[annotation] });
    setModalDelete(true);
  }

  function handleModalAddOpen() {
    setModalAdd(true);
  }

  const classes = useStyles();

  useEffect(() => {
    async function getNotes() {
      const token = localStorage.getItem("token");
      //console.log(id);
      try {
        if (token) {
          api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
          const data = await api.get(`/api/notes/${id}`);
          setNotes(data.data);
          console.log(note);
          setLoading(false);
        }
      } catch (err) {
        console.log(err);
      }
    }

    getNotes();
  }, [id]);

  if (loading) {
    return <h1>Carregando</h1>;
  }

  function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
  }

  return (
    <>
      <Header />
      <div className={classes.root}>
        <Typography
          variant="h5"
          component="h2"
          className={classes.title}
          align="center"
        >
          Total Anotações: {notes.length}
        </Typography>

        <div className={classes.firstButtons}>
          <FormControlLabel
            label="Adicionar"
            onClick={() => handleModalAddOpen()}
            control={
              <Button primary>
                <img src={plusImage} className={classes.plus} />
              </Button>
            }
          />
          <FormControlLabel
            label={"Descrições"}
            control={
              <Switch
                onChange={handleShowDescription}
                name="checkedB"
                color="primary"
              />
            }
          />
        </div>
        <List className={classes.list}>
          {notes.map((item) => (
            <Link className={classes.link} to={`/notes/${item.id}`}>
              <ListItemLink key={item.id} className={classes.item}>
                <Typography
                  variant="h4"
                  component="h2"
                  className={classes.title}
                >
                  {item.title}
                </Typography>
                <Button
                  primary
                  onClick={(event) => {
                     handleModalDelete(item.id, item.title, item.description,item.annotation);
                    event.preventDefault();
                  }}
                >
                  <img src={trashImage} className={classes.trash} />
                </Button>
                <Button
                  primary
                  onClick={(event) => {
                    // handleModalUpdate(item.id, item.title, item.description);
                    event.preventDefault();
                  }}
                >
                  <img src={editImage} className={classes.edit} />
                </Button>
              </ListItemLink>
              {showDescription ? (
                <Typography variant="spam">
                  {("\n", item.description)}{" "}
                </Typography>
              ) : (
                ""
              )}
            </Link>
          ))}
        </List>
        <DeleteNote
        option={modalDelete}
        note={note}
        setModalDelete={setModalDelete}
      />
        
         <AddNote option={modalAdd} setModalAdd={setModalAdd} repId={id} />
     
      {/* <UpdateRepository
        option={modalUpdate}
        rep={rep}
        setModalUpdate={setModalUpdate}
      />  */}
      </div>
    </>
  );
};

export default Notes;
