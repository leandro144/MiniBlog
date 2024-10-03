import { Button, Divider } from "antd";
import React, { useState } from "react";
import { useAuth } from "../context/context";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";
import { useNavigate } from "react-router-dom";
import { addDoc, collection, doc } from "firebase/firestore"; 
import { db } from "../firebase/config";

const About = () => {
  const [addPost, setAddPost] = useState({
    title: '',
    content: '',
    Urlimage: '',
    tags: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddPost((prevAdd) => ({
      ...prevAdd,
      [name]: value
    }));
  };

  const [apper, setToApper] = useState(false);
  const navigate = useNavigate();
  const user = useAuth();
  const handleToogle = () => {
    setToApper(!apper);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert("Usuário deslogado com sucesso!");
      navigate("/login");
    } catch (error) {
      console.error("Erro ao fazer logout:", error.message);
    }
  };

  const handleAddPost = async () => {
    try {
      console.log('passando os dados', addPost)
      const docRef = await addDoc(collection(db, "posts"), {
        title: addPost.title,
        content: addPost.content,
        urlImage: addPost.Urlimage,
        tags: addPost.tags,
        createdAt: new Date(),
      });
      setAddPost({
        title: '',
        content: '',
        Urlimage: '',
        tags: ''
      })
      console.log("Documento adicionado com ID: ", docRef.id);
      navigate('/home')
    } catch (error) {
      console.error("Erro ao adicionar documento: ", error.message);
      console.error("Detalhes do erro: ", error); 
    }
  };

  return (
    <div style={{ padding: "2%" }}>
      <div>
        {user ? (
          <span style={{ display: "flex", justifyContent: "space-between" }}>
            <h3>Bem-vindo, {user.user.displayName || user.user.email}!</h3>
            <button style={{ cursor: "pointer" }} onClick={handleLogout}>
              Sair
            </button>
          </span>
        ) : (
          <h1>Você não está logado.</h1>
        )}
      </div>
      <br />
      <br />
      <h1 style={{ textAlign: "center" }}>Sobre o Mini Blog</h1>
      <p style={{ textAlign: "center" }}>
        Este projeto consiste em um blog feito com React no front-end e Firebase
        no back-end
      </p>
      <br />
      <Button
        onClick={handleToogle}
        style={{ margin: "0 auto", display: "flex", cursor: "pointer" }}
      >
        Criar Post
      </Button>
      {apper ? (
        <>
          <div style={{ margin: "20px 0" }}>
            <label>Título do Post</label>
            <input
              type="text"
              value={addPost.title}
              name="title"
              onChange={handleChange}
              placeholder="Digite o título do post"
              style={{
                width: "100%",
                padding: "8px",
                outline: "none",
                border: "none",
                borderBottom: "1px solid #ccc",
                transition: "border-color 0.3s",
              }}
              onFocus={(e) => (e.target.style.borderBottom = "1px solid #1890ff")}
              onBlur={(e) => (e.target.style.borderBottom = "1px solid #ccc")}
            />
          </div>
          <div style={{ margin: "20px 0" }}>
            <label>URL da Imagem</label>
            <input
              type="text"
              value={addPost.Urlimage}
              onChange={handleChange}
              name="Urlimage"
              placeholder="Insira a URL da imagem"
              style={{
                width: "100%",
                padding: "8px",
                outline: "none",
                border: "none",
                borderBottom: "1px solid #ccc",
                transition: "border-color 0.3s",
              }}
              onFocus={(e) => (e.target.style.borderBottom = "1px solid #1890ff")}
              onBlur={(e) => (e.target.style.borderBottom = "1px solid #ccc")}
            />
          </div>
          <div style={{ margin: "20px 0" }}>
            <label>Conteúdo do Post</label>
            <textarea
              placeholder="Escreva o conteúdo do post"
              value={addPost.content}
              onChange={handleChange}
              name="content"
              style={{
                width: "100%",
                padding: "8px",
                outline: "none",
                border: "none",
                borderBottom: "1px solid #ccc",
                transition: "border-color 0.3s",
                minHeight: "100px",
              }}
              onFocus={(e) => (e.target.style.borderBottom = "1px solid #1890ff")}
              onBlur={(e) => (e.target.style.borderBottom = "1px solid #ccc")}
            />
          </div>
          <div style={{ margin: "20px 0" }}>
            <label>Tags</label>
            <input
              type="text"
              placeholder="Digite as tags separadas por vírgula"
              name="tags"
              value={addPost.tags}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "8px",
                outline: "none",
                border: "none",
                borderBottom: "1px solid #ccc",
                transition: "border-color 0.3s",
              }}
              onFocus={(e) => (e.target.style.borderBottom = "1px solid #1890ff")}
              onBlur={(e) => (e.target.style.borderBottom = "1px solid #ccc")}
            />
          </div>
          <Button
            type="primary"
            style={{
              width: "100%",
              padding: "10px",
              backgroundColor: "#1890ff",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
            onClick={handleAddPost}
          >
            Criar Post
          </Button>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default About;
