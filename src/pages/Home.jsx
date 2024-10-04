import React, { useEffect, useState } from 'react';
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";
import { Divider } from 'antd';

const Home = () => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const postsCollection = collection(db, "posts");
      const postSnapshot = await getDocs(postsCollection);
      const postList = postSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(postList);
    } catch (error) {
      console.error("Erro ao buscar posts: ", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className='container' style={{ textAlign: 'center', padding: '20px' }}>
      <h2>Bem Vindo ao MiniBlog</h2>
      <p>Aqui estão todas as noticias criadas.</p>

      {posts.length === 0 ? (
        <p>Nenhum post encontrado.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
          <ul style={{ padding: '0', width: '80%', listStyleType: 'none' }}>
            {posts.map((listPost) => (
              <div key={listPost.id} style={{ width: '100%' }}>
                <br />
                <li style={{ 
                  padding: '20px', 
                  borderRadius: '8px', 
                  background: '#ccc', 
                  boxShadow: '0 2px 5px rgba(0,0,0,0.1)', 
                  width: '50%', 
                  margin: '0 auto',
                  maxHeight: '200px', // Limita a altura do post
                  overflow: 'hidden' // Esconde o conteúdo que ultrapassar a altura
                }}>
                  <h3 style={{ marginBottom: '10px' }}>{listPost.title}</h3>
                  <img 
                    src={listPost.urlImage} 
                    alt={listPost.title} 
                    style={{ width: '200px', height: 'auto', marginBottom: '10px' }} 
                  />
                  <p style={{ maxHeight: '100px', overflow: 'hidden' }}>{listPost.content}</p> {/* Limita a altura do conteúdo */}
                  <p style={{ fontStyle: 'italic' }}>Tags: {listPost.tags}</p>
                </li>
                <Divider style={{ color: '#fff' }} />
              </div>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Home;
