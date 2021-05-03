import React, { useState } from "react";
import { Card, Typography, TextField, Button, makeStyles } from "@material-ui/core";
import api from "../Services/api";


const useStyles = makeStyles((theme) => ({
  root: {
    width: '40%',
    margin:"auto",
    marginTop:"2rem"

  },
  input:{
    width: '100%',
    margin:"auto",
    marginTop:"0.8em",
    marginBottom:"0.8em"
  },
  button:{
    marginTop:"1em"
  },
  negativeFeedback:{
    color:"#ff6961",
  }
 
}));

const Login = () => {
  const styles = useStyles();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState(false);

  const handleLogIn = async () => {

    try{

    
    const {data:{token}} = await api.post("/api/user/login", { email, password });

    
    localStorage.setItem("token", JSON.stringify(token));

    api.defaults.headers.Authorization = `Bearer ${token}`;
    window.location.href = "http://localhost:3000/repositories";
  }catch(err){
    setError(true)
  }
  };

  return (
    
      <form className={styles.root}
        onSubmit={(event) => {
          handleLogIn();
          event.preventDefault();
          //
        }}
      >
        <TextField className={styles.input}
          margin="normal"
          label="Usuário"
          value={email}
          required
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <br />
        <TextField className={styles.input}
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
        {error? <Typography className={styles.negativeFeedback}>Dados Inválidos!</Typography>:"" }
        <Button type="submit" variant="contained" color="primary" className={styles.button}>
          Entrar
        </Button>
      </form>
   
  );
};

export default Login;
