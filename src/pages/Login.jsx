import React, { useState } from "react";
import { Divider } from "antd";
import { auth } from '../firebase/config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from "react-router-dom";

const Login = () => {

  const navigate = useNavigate();

  const [sigIn, setSigIn] = useState({
    email: '', 
    password: ''
  });

  const [error, setError] = useState("");

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setSigIn((prevLogin) => ({
      ...prevLogin,
      [name]: value,
    }));
  };

  const loginUser = async (e) => {
    e.preventDefault(); 
    const { email, password } = sigIn;

    setError("");

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      alert('Usuário Logado com sucesso!!');
      console.log('Usuário logado:', userCredential.user);
      const token = await userCredential.user.getIdToken();
      localStorage.setItem('token', token);
      console.log('fiquei salvo:', token)
      navigate('/about');
    } catch (error) {
      console.error('Erro ao fazer login:', error.message);
      setError("Email ou senha incorretos."); 
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexDirection: "column",
      }}
    >
      <h1>Login</h1>
      <p>Acesse sua conta para continuar</p>
      <br /><br />
      <form onSubmit={loginUser} style={{ width: "300px" }}>
        <div style={{ marginBottom: "16px" }}>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={sigIn.email}
            onChange={handleOnChange}
            placeholder="Seu email"
            style={{ width: "100%", padding: "8px", marginTop: "8px" }}
          />
          <Divider />
        </div>
        <div style={{ marginBottom: "16px" }}>
          <label>Senha</label>
          <input
            type="password"
            name="password"
            value={sigIn.password}
            onChange={handleOnChange}
            placeholder="Sua senha"
            style={{ width: "100%", padding: "8px", marginTop: "8px" }}
          />
          <Divider />
        </div>
        <small style={{marginRight: '1rem'}}>Não tem cadastro ainda?</small>
        <a href="/">Inscreva-se</a>
        <br />
        <br />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#1890ff",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Entrar
        </button>
      </form>
    </div>
  );
};

export default Login;
