import React, { useState } from 'react'

const Blog = ({ blog, updateBlog, likeBlog, addComment, deleteBlog, currentUser, showDelete = true }) => {
    const [visible, setVisible] = useState(false)
    // Check if current user has liked
    // blog.likedBy follows population or array of IDs.
    // If populated: check ID. If just IDs: check ID. 
    // Safely handle if likedBy is undefined (old blogs).
    // Ensure currentUser has id (fixed in login controller).
    const isLiked = blog.likedBy && currentUser && blog.likedBy.some(u =>
        (typeof u === 'string' ? u === currentUser.id : u.id === currentUser.id)
    )

    const [comment, setComment] = useState('')

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    const handleLike = () => {
        likeBlog(blog.id)
    }

    const handleComment = (e) => {
        e.preventDefault()
        addComment(blog.id, comment)
        setComment('')
    }

    const handleDelete = () => {
        // window.confirm message adjusted as per user manual edit history
        if (window.confirm(`Remove blog ?`)) {
            deleteBlog(blog.id)
        }
    }

    // Check ownership
    // blog.user can be populated object, id string, or null (if user deleted)
    const isOwner = currentUser && blog.user && (
        (blog.user.username && blog.user.username === currentUser.username) ||
        (blog.user.name && blog.user.name === currentUser.name) ||
        (typeof blog.user === 'string' && blog.user === currentUser.id)
    )

    return (
        <div style={styles.card}>
            <div style={styles.header}>
                <div style={styles.avatar}>{blog.author?.[0]?.toUpperCase() || 'A'}</div>
                <div style={styles.info}>
                    <span style={styles.author}>{blog.author}</span>
                    <span style={styles.date}>Just now</span> {/* Placeholder timestamp */}
                </div>
            </div>

            <div style={styles.content}>
                <h3 style={styles.title}>{blog.title}</h3>
                {/* URL removed as requested */}
            </div>

            <div style={styles.actions}>
                <button onClick={handleLike} style={{ ...styles.actionBtn, color: isLiked ? '#e91e63' : 'var(--text-color)' }}>
                    {isLiked ? '❤️' : '🤍'} {blog.likes}
                </button>
                <button onClick={toggleVisibility} style={styles.actionBtn}>
                    💬 {blog.comments ? blog.comments.length : 0}
                </button>
                {isOwner && showDelete && (
                    <button onClick={handleDelete} style={styles.deleteBtn}>
                        🗑️
                    </button>
                )}
            </div>

            {visible && (
                <div style={styles.commentsSection}>
                    <h4>Comments</h4>
                    <ul style={styles.commentList}>
                        {blog.comments && blog.comments.map((c, i) => (
                            <li key={i} style={styles.commentItem}>
                                <strong>{c.username || 'Anonymous'}: </strong>
                                {c.text}
                            </li>
                        ))}
                    </ul>
                    <form onSubmit={handleComment} style={styles.commentForm}>
                        <input
                            value={comment}
                            onChange={({ target }) => setComment(target.value)}
                            placeholder="Add a comment..."
                            style={styles.commentInput}
                        />
                        <button type="submit" style={styles.commentBtn}>Post</button>
                    </form>
                </div>
            )}
        </div>
    )
}

const styles = {
    card: {
        backgroundColor: 'var(--card-bg)',
        border: '1px solid var(--border-color)',
        borderRadius: '12px',
        padding: '1.5rem',
        marginBottom: '1.5rem',
        boxShadow: 'var(--shadow)',
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '1rem',
    },
    avatar: {
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        backgroundColor: 'var(--secondary-color)',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: '10px',
        fontWeight: 'bold',
    },
    info: {
        display: 'flex',
        flexDirection: 'column',
    },
    author: {
        fontWeight: '600',
        color: 'var(--text-color)',
    },
    date: {
        fontSize: '0.8rem',
        color: 'var(--secondary-color)',
    },
    content: {
        marginBottom: '1rem',
    },
    title: {
        fontSize: '1.2rem',
        marginBottom: '0.5rem',
        color: 'var(--text-color)',
    },
    link: {
        color: 'var(--primary-color)',
        wordBreak: 'break-all',
    },
    actions: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '1rem',
        paddingTop: '1rem',
        borderTop: '1px solid var(--border-color)',
    },
    actionBtn: {
        background: 'transparent',
        color: 'var(--text-color)',
        display: 'flex',
        alignItems: 'center',
        gap: '5px',
        fontSize: '0.9rem',
    },
    deleteBtn: {
        background: 'transparent',
        color: '#e74c3c',
    },
    commentsSection: {
        marginTop: '1rem',
        paddingTop: '1rem',
        borderTop: '1px solid var(--border-color)',
    },
    commentList: {
        listStyle: 'none',
        padding: 0,
        marginBottom: '1rem',
    },
    commentItem: {
        fontSize: '0.9rem',
        marginBottom: '0.5rem',
        color: 'var(--text-color)',
    },
    commentForm: {
        display: 'flex',
        gap: '0.5rem',
    },
    commentInput: {
        flex: 1,
        padding: '0.5rem',
        borderRadius: '20px',
        border: '1px solid var(--border-color)',
        outline: 'none',
        backgroundColor: 'var(--bg-color)',
        color: 'var(--text-color)',
    },
    commentBtn: {
        padding: '0.5rem 1rem',
        borderRadius: '20px',
        border: 'none',
        backgroundColor: 'var(--primary-color)',
        color: 'white',
        cursor: 'pointer',
        fontWeight: 'bold',
    }
}

export default Blog
