import { Button, Modal, Form, Input } from "antd";
import React, { useEffect, useState } from "react";
import { collection, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "posts"));
        const postsData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setPosts(postsData);
      } catch (error) {
        console.error("Error fetching posts: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "posts", id));
      setPosts(posts.filter(post => post.id !== id));
    } catch (error) {
      console.error("Error deleting post: ", error);
    }
  };

  const handleEdit = (post) => {
    setCurrentPost(post);
    setIsModalVisible(true);
  };

  const handleOk = async (values) => {
    if (currentPost) {
      try {
        const postRef = doc(db, "posts", currentPost.id);
        await updateDoc(postRef, values); 
        setPosts(posts.map(post => (post.id === currentPost.id ? { ...post, ...values } : post)));
        setIsModalVisible(false);
        setCurrentPost(null);
      } catch (error) {
        console.error("Error updating post: ", error);
      }
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setCurrentPost(null);
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height: "80vh",
      }}
    >
      <h2>Dashboard</h2>
      <p>Gerencie os seus posts</p>
      <br />
      <br />
      <div style={{ width: "80%" }}>
        <p>Título</p>
        <hr />
        {posts.map((post) => (
          <div key={post.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem 0' }}>
            <span><p>{post.title}</p></span>
            <span style={{ display: 'flex', gap: '1rem' }}>
              <Button onClick={() => navigate(`/post/${post.id}`)}>Ver</Button>
              <Button onClick={() => handleEdit(post)}>Editar</Button>
              <Button onClick={() => handleDelete(post.id)}>Excluir</Button>
            </span>
          </div>
        ))}
      </div>

      {/* Modal para editar o post */}
      <Modal
        title="Editar Post"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          initialValues={currentPost}
          onFinish={handleOk}
          layout="vertical"
        >
          <Form.Item
            label="Título"
            name="title"
            rules={[{ required: true, message: 'Por favor, insira o título!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Conteúdo"
            name="content"
            rules={[{ required: true, message: 'Por favor, insira o conteúdo!' }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item
            label="urlImage"
            name="urlImage"
            rules={[{ required: true, message: 'Por favor, insira o título!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">Salvar</Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Dashboard;
