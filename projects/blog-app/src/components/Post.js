import React from 'react' ;
import Comment from './Comment' ;
export default function Post() {
    return (
        <div>
            <h2>Post Title</h2>
            <p>This is the content of the post.</p>
            <Comment/>
        </div>
    ) ;
}