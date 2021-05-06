import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
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
import SearchIcon from "@material-ui/icons/Search";

import DeleteNote from "../Components/Notes/DeleteNote";
import UpdateNote from "../Components/Notes/UpdateNote";
import Note from "../Components/Notes/Note";

import Header from "../Components/Header";
import Loading from "../Components/Loading"

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

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
    borderColor: "#d3d3d3",
    borderColor: "#d3d3d3",
    borderRadius: "0.25rem",
    backgroundColor: "#d3d3d3",
    marginTop: "0.6em",
  },
  title: {
    width: "100%",
    marginTop: "1em",
    marginBottom: "1em",
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

const Search = () => {
  const [repositories, setRepositories] = useState([]);
  const [notes, setNotes] = useState([]);
  const [modalDelete, setModalDelete] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);
  const [modalOpenDetail, setModalOpenDetails] = useState(false);
  const [note, setNote] = useState([]);

  const { search } = useParams();
  const classes = useStyles();
  const history = useHistory();
  const [loading, setLoading] = useState(true);

  const handleShowDetails = (note) => {
    setModalOpenDetails(true);
    setNote(note);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    async function getData() {
      if (token) {
        try {
          api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
          const result = await api.post("/api/search", { search });
          setRepositories(result.data.repositories);
          setNotes(result.data.notes);
          setLoading(false);
        } catch {
          history.push("/login");
        }
      } else {
        history.push("/login");
      }
    }

    getData();
  }, [search]);

  if (loading) {
    <Loading/>
  }

  return (
    <>
      <Header />
      <Typography
        variant="h3"
        component="h2"
        className={classes.title}
        align="center"
      >
        Resultado busca: {search}
      </Typography>

      {repositories.length > 0 ? (
        <Typography
          variant="h4"
          component="h2"
          className={classes.title}
          align="center"
        >
          Repositórios
        </Typography>
      ) : (
        ""
      )}

      <div className={classes.root}>
        <List className={classes.list}>
          {repositories.map((item) => (
            <Link className={classes.link} to={`/notes/${item.id}`}>
              <ListItemLink key={item.id} className={classes.item}>
                <Typography
                  variant="h4"
                  component="h2"
                  className={classes.title}
                >
                  {item.title}
                </Typography>

                <Typography variant="spam">{item.description}</Typography>
              </ListItemLink>
            </Link>
          ))}
        </List>
      </div>

      {notes.length > 0 ? (
        <Typography
          variant="h4"
          component="h2"
          className={classes.title}
          align="center"
        >
          Notas
        </Typography>
      ) : (
        ""
      )}

      <div className={classes.root}>
        <List className={classes.list}>
          {notes.map((item) => (
            <Link className={classes.link} to={`/notes/${item.repository_id}`}>
              <ListItemLink key={item.id} className={classes.item}>
                <Typography
                  variant="h4"
                  component="h2"
                  className={classes.title}
                >
                  {item.title}
                </Typography>

                <Typography variant="spam">{item.description}</Typography>

                <Button
                  onClick={(event) => {
                    event.preventDefault();
                    handleShowDetails(item);
                  }}
                >
                  <SearchIcon />
                </Button>
              </ListItemLink>
            </Link>
          ))}
        </List>
      </div>

      <DeleteNote
        option={modalDelete}
        note={note}
        setModalDelete={setModalDelete}
      />

      <UpdateNote
        option={modalUpdate}
        note={note}
        setModalUpdate={setModalUpdate}
      />

      <Note
        option={modalOpenDetail}
        note={note}
        setModalOpenDetails={setModalOpenDetails}
        setModalDelete={setModalDelete}
        setModalUpdate={setModalUpdate}
      />
    </>
  );
};

export default Search;
