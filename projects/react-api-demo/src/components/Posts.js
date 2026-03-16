import React , { useState, useEffect } from 'react';
import { getPosts ,deletePost,updatePost} from '../services/postService';
import PostForm from './PostForm';

export default function Posts() {
    const [posts, setPosts] = useState([]);
    const [editingPost, setEditingPost] = useState(null);

    const handleDeletePost = (id) => {
        deletePost(id).then((result) => {
            setPosts(posts.filter(post => post.id !== id));
        }).catch((error) => {
            console.error('Error deleting post:', error);
        });
    };
    const startEditing=(post) => {
        setEditingPost(post);
    };

    useEffect(() => {
        getPosts().then((response) => {
            setPosts(response.data);
        }).catch((error) => {
            console.error('Error fetching posts:', error);
        });
    }, []);

return (
    <div>
        <h1>Posts</h1>
        <PostForm posts={posts} setPosts={setPosts} editingPost={editingPost} setEditingPost={setEditingPost} />
        <ul>
            {posts.map((post) => (
                <li key={post.id}>
                    <h2>{post.title}</h2>
                    <p>{post.body}</p>
                    <button onClick={() => startEditing(post)}>Edit</button>
                    <button onClick={() => handleDeletePost(post.id)}>Delete</button>
                </li>
            ))}
        </ul>
    </div>
);  
}