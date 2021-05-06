import React, { useState } from "react";
import {
  Card,
  Typography,
  TextField,
  Button,
  makeStyles,
} from "@material-ui/core";
import api from "../Services/api";
import Header from "../Components/Header";
import { Link } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
  root: {
    width: "50vw",
    margin: "auto",
    marginTop: "2rem",
  },
  input: {
    width: "100%",
    margin: "auto",
    marginTop: "0.8em",
    marginBottom: "0.8em",
  },
  title: {
    marginTop: "1em"
  },
  button: {
    marginTop: "1em",
  },
  negativeFeedback: {
    color: "#ff6961",
  },
  link: {
    marginLeft: "2vw",
    textDecoration: "none",
  },
}));

const Login = () => {
  const styles = useStyles();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState(false);

  const handleLogIn = async () => {
    try {
      const {
        data: { token },
      } = await api.post("/api/user/login", { email, password });

      localStorage.setItem("token", JSON.stringify(token));

      api.defaults.headers.Authorization = `Bearer ${token}`;
      window.location.href = "http://localhost:3000/repositories";
    } catch (err) {
      setError(true);
    }
  };

  const classes = useStyles();

  return (
    <>
      <Header />
      <Typography
          variant="h2"
          component="h1"
          className={classes.title}
          align="center"
        >
          DevAnnotations
        </Typography>
      <form
        className={styles.root}
        onSubmit={(event) => {
          handleLogIn();
          event.preventDefault();
          //
        }}
      >
        <TextField
          className={styles.input}
          margin="normal"
          label="Usuário"
          value={email}
          required
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <br />
        <TextField
          className={styles.input}
          type="password"
          margin="normal"
          label="Senha"
          value={password}
          required
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <br />
        {error ? (
          <Typography className={styles.negativeFeedback}>
            Dados Inválidos!
          </Typography>
        ) : (
          ""
        )}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={styles.button}
        >
          Entrar
        </Button>
        <Link to="/singUp" className={classes.link}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={styles.button}
          >
            Não posssuo conta
          </Button>
        </Link>
      </form>
    </>
  );
};

export default Login;
