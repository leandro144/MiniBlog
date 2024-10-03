import React from 'react';
import { useAuth } from '../context/context';
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const token = localStorage.getItem('token'); 

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('token'); 
      alert("Usuário deslogado com sucesso!");
      navigate("/login");
    } catch (error) {
      console.error("Erro ao fazer logout:", error.message);
    }
  };

  return (
    <header style={{ background: '#fff', width: '100%', padding: '2rem 2%' }}>
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div className="log">Mini BLOG</div>
        <ul style={{ display: 'flex', gap: '1rem' }}>
          {(user || token) ? ( 
            <>
              <li><a style={{ color: '#000' }} href="/">Home</a></li>
              <li><a style={{ color: '#000' }} href="/dashboard">Dashboard</a></li>
              <li><a style={{ color: '#000', cursor: 'pointer' }} onClick={handleLogout}>Sair</a></li>
            </>
          ) : (
            <>
              <li><a style={{ color: '#000' }} href="/">Home</a></li>
              <li><a style={{ color: '#000' }} href="/login">Entrar</a></li>
              <li><a style={{ color: '#000' }} href="/register">Cadastrar</a></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
