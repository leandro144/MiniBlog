import React, { useState } from "react";
import { Divider } from "antd";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase/config";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [login, setLogin] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const [error, setError] = useState("");

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setLogin((prevLogin) => ({
      ...prevLogin,
      [name]: value,
    }));
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    return emailRegex.test(email);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const { name, email, password, passwordConfirm } = login;

    setError("");

    if (!validateEmail(email)) {
      setError("Por favor, insira um email válido.");
      return;
    }

    if (password !== passwordConfirm) {
      setError("As senhas não coincidem.");
      return;
    }

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(res.user, {
        displayName: name,
      });

      console.log("Usuário criado com nome:", res.user);

      navigate('/login');
    } catch (error) {
      console.log("Erro ao registrar usuário:", error.message);
      setError("Erro ao criar conta. Por favor, tente novamente.");
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
      <h1>Cadastre-se para postar</h1>
      <p>Crie seu usuário e compartilhe suas histórias</p>
      <form style={{ width: "300px" }} onSubmit={handleRegister}>
        <div style={{ marginBottom: "16px" }}>
          <label>Nome</label>
          <input
            type="text"
            name="name"
            value={login.name}
            onChange={handleOnChange}
            placeholder="Seu nome"
            style={{ width: "100%", padding: "8px", marginTop: "8px" }}
          />
          <Divider />
        </div>
        <div style={{ marginBottom: "16px" }}>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={login.email}
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
            placeholder="Sua senha"
            value={login.password}
            onChange={handleOnChange}
            style={{ width: "100%", padding: "8px", marginTop: "8px" }}
          />
          <Divider />
        </div>
        <div style={{ marginBottom: "16px" }}>
          <label>Confirme a Senha</label>
          <input
            type="password"
            name="passwordConfirm"
            value={login.passwordConfirm}
            onChange={handleOnChange}
            placeholder="Confirme sua senha"
            style={{ width: "100%", padding: "8px", marginTop: "8px" }}
          />
          <Divider />
        </div>
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
          Cadastrar
        </button>
      </form>
    </div>
  );
};

export default Register;
