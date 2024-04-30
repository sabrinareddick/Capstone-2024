import React, { useState } from 'react';
import "./blog.css";

function Blog() {
    const [posts, setPosts] = useState([]);

    const handleCreatePost = (event) => {
        event.preventDefault(); 

        const newPost = {
            id: posts.length + 1,
            title: event.target.postTitle.value,
            content: event.target.postContent.value,
            comments: [] 
        };
        setPosts([...posts, newPost]);

        event.target.postTitle.value = "";
        event.target.postContent.value = "";
    };

    const handleAddComment = (event, postId) => {
        event.preventDefault();

        const commentContent = event.target.commentContent.value;

        const updatedPosts = posts.map(post =>
            post.id === postId ? { ...post, comments: [...post.comments, commentContent] } : post
        );
        setPosts(updatedPosts);

        event.target.commentContent.value = "";
    };

    return (
        <div class="background-photo"><br></br><br></br><br></br>
        <div className="blog-container">
            <h1>Blog</h1>
            
            <form onSubmit={handleCreatePost}>
                <h2>Create New Post</h2>
                <label htmlFor="postTitle">Title:</label><br />
                <input type="text" id="postTitle" name="postTitle" required /><br />
                <label htmlFor="postContent">Content:</label><br />
                <textarea id="postContent" name="postContent" rows="4" required></textarea><br />
                <button type="submit">Create Post</button>
            </form>

            <hr />

            <div id="existingPosts">
                <h2>Existing Posts</h2>
                {posts.map(post => (
                    <div key={post.id} className="post">
                        <h3>{post.title}</h3>
                        <p>{post.content}</p>
                        <form onSubmit={(e) => handleAddComment(e, post.id)}>
                            <input type="text" name="commentContent" placeholder="Add a comment" required />
                            <button type="submit">Comment</button>
                        </form>
                        <div className="comments">
                            {post.comments.map((comment, index) => (
                                <div key={index} className="comment">{comment}</div>
                            ))}
                        </div>
                    </div>
                ))}
            </div><br></br><br></br><br></br><br></br><br></br><br></br>
        </div><br></br><br></br><br></br><br></br><br></br><br></br>
        </div>
    );
}

export default Blog;
