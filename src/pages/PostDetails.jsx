// PostDetails.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import axios from "axios";

const PostDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const docRef = doc(db, "posts", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setPost({ id: docSnap.id, ...docSnap.data() });
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching post: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return <p>Carregando...</p>;
  }


  return (
    <div style={{display: 'flex', justifyContent: "center", alignItems: 'center', flexDirection: 'column', gap: '1rem', height: '80vh', width: '80%', margin: '0 auto'}}>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <img src={post.urlImage} alt="" />
    </div>
  );
};

export default PostDetails;
