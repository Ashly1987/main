import React, { useState ,useEffect, use } from 'react';
import { createPost, updatePost } from '../services/postService';

export default function PostForm({posts,setPosts,editingPost,setEditingPost}) {
    const [title, settitle] = useState('');
    const [body, setBody] = useState('');

    useEffect(() => {
        if (editingPost) {
            settitle(editingPost.title);
            setBody(editingPost.body);
        }
        else {
            settitle('');
            setBody('');
        }
    }, [editingPost]);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (editingPost) {
            editPost();
        } else {
            addPost();
        }
        settitle('');
        setBody('');
    };
    
const addPost = () => {
    createPost({ title, body }).then((response) => {
        setPosts([...posts, response.data]);
    }).catch((error) => {
        console.error('Error creating post:', error);
    });
};

const editPost = () => {
    updatePost(editingPost.id, { title, body }).then((response) => {
        setPosts(posts.map((post) => (post.id === editingPost.id ? response.data : post)));
        setEditingPost(null);
    }).catch((error) => {
        console.error('Error updating post:', error);
    });
};

    return (
        <form onSubmit={handleSubmit}>
            <div>
                title
            </div>
                
                <input
                    type="text"
                    value={title}
                    onChange={(e) => settitle(e.target.value)}
                />
                
            <div>Body</div>
                <textarea
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                />
           
            <div>
            <button type="submit">{editingPost ? 'Update Post' : 'Add Post'}</button>
            </div>
        </form>
    );
}