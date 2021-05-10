import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../Components/Header";
import { Link, useHistory } from "react-router-dom";
import plusImage from "../Assets/Plus.svg";
import trashImage from "../Assets/Trash.svg";
import editImage from "../Assets/Edit.svg";
import SearchIcon from '@material-ui/icons/Search';

import DeleteNote from "../Components/Notes/DeleteNote";
import AddNote from "../Components/Notes/AddNote";
import UpdateNote from "../Components/Notes/UpdateNote";
import Note from "../Components/Notes/Note";

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
  const [repository, setRepository] = useState([]);
  const [note, setNote] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDescription, setShowDescription] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [modalAdd, setModalAdd] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);
  const [modalOpenDetail, setModalOpenDetails] = useState(false);
  const[refresh, setRefresh] = useState(false);
  let testModals = true;

  function handleShowDescription() {
    setShowDescription(!showDescription);
  }

  function handleModalDelete(id, title, description, annotation) {
    setNote({ id, title, description, annotation });
    setModalDelete(true);
  }

  function handleModalAddOpen() {
    setModalAdd(true);
  }

  function handleModalUpdate(id, title, description, annotation) {
    setNote({ id, title, description, annotation });
    setModalUpdate(true);
    testModals = false
  }

  function handleOpenNoteDetails(id, title, description, annotation) {
    setNote({ id, title, description, annotation });
    
    if(testModals){
      setModalOpenDetails(true);
    }
      
  }

  const history = useHistory();
  const classes = useStyles();

  useEffect(() => {
    async function getData() {
      const token = localStorage.getItem("token");
      try {
        api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
        const notes = await api.get(`/api/notes/${id}`);
        const repository = await api.get(`/api/repositories/${id}`);


        setRepository(repository.data)
        setNotes(notes.data);
        setLoading(false);
        setRefresh(false);
      } catch (err) {
        history.push("/login");
      }
    }

    getData();
  }, [id, refresh]);

 

  if (loading) {
    return <h1>Carregando</h1>;
  }

  function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
  }

  return (
    <>
      <Header  data={notes}/>
      <div className={classes.root}>
      <Typography
          variant="h2"
          component="h1"
          className={classes.title}
          align="center"
        >
          {repository.title}
        </Typography>

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
            <Link
              className={classes.link}
              onClick={() => {
                handleOpenNoteDetails(
                  item.id,
                  item.title,
                  item.description,
                  item.annotation
                );
              }}
            >
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
                    event.preventDefault();
                    handleModalUpdate(
                      item.id,
                      item.title,
                      item.description,
                      item.annotation
                    );
                  }}
                >
                  <img src={editImage} className={classes.edit} />
                </Button>
                <Button
                  primary
                  onClick={() => {
                    handleModalDelete(
                      item.id,
                      item.title,
                      item.description,
                      item.annotation
                    );

                    testModals= false;
                  }}
                >
                  <img src={trashImage} className={classes.trash} />
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
          setRefresh = {setRefresh}
          setNote={setNote}
        />

        <UpdateNote
          option={modalUpdate}
          note={note}
          setModalUpdate={setModalUpdate}
          setRefresh = {setRefresh}
           setNote={setNote}
        />

        <AddNote option={modalAdd} setModalAdd={setModalAdd} repId={id} setRefresh={setRefresh}/>
      </div>

      <Note
        option={modalOpenDetail}
        note={note}
        setModalOpenDetails={setModalOpenDetails}
        setModalDelete={setModalDelete}
        setModalUpdate={setModalUpdate}
        setRefresh={setRefresh}
      />
    </>
  );
};

export default Notes;
