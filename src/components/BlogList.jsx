import React from 'react'
import Blog from './Blog'

const BlogList = ({ blogs, updateBlog, likeBlog, addComment, deleteBlog, currentUser }) => {
    // Sorted by recency (newest first)
    return (
        <div style={styles.list}>
            {blogs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map(blog => (
                <Blog
                    key={blog.id}
                    blog={blog}
                    updateBlog={updateBlog}
                    likeBlog={likeBlog}
                    addComment={addComment}
                    deleteBlog={deleteBlog}
                    currentUser={currentUser}
                    showDelete={false}
                />
            ))}
        </div>
    )
}

const styles = {
    list: {
        paddingBottom: '80px', // Space for FAB
    }
}

export default BlogList
