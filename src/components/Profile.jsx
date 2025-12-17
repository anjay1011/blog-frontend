import React from 'react'
import Blog from './Blog'

const Profile = ({ user, blogs, deleteBlog, updateBlog, likeBlog, addComment }) => {
    if (!user) return null

    // Filter blogs created by the user
    // Adapting to population: user.username vs user (id)
    const myBlogs = blogs.filter(b => {
        if (!b.user) return false // Orphan blog
        if (typeof b.user === 'string') return b.user === user.username
        // Usually backend returns user object with username/name/id
        // Let's check against what we have. API usually returns b.user.username.
        // But safe check:
        return (b.user.username === user.username) || (b.user.name === user.name)
    })

    return (
        <div className="container" style={{ marginTop: '2rem' }}>
            <div style={styles.header}>
                <div style={styles.avatarLarge}>{(user.name || user.username || 'U')[0].toUpperCase()}</div>
                <h2 style={styles.name}>{user.name || user.username}</h2>
                <p style={styles.handle}>@{user.username}</p>
            </div>

            <h3 style={{ marginBottom: '1rem' }}>My Teas ({myBlogs.length})</h3>

            {myBlogs.length === 0 ? (
                <p style={{ color: 'var(--secondary-color)' }}>No teas brewed yet.</p>
            ) : (
                <div>
                    {myBlogs.map(blog => (
                        <Blog
                            key={blog.id}
                            blog={blog}
                            updateBlog={updateBlog}
                            likeBlog={likeBlog}
                            addComment={addComment}
                            deleteBlog={deleteBlog}
                            currentUser={user}
                            showDelete={true}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}

const styles = {
    header: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: '3rem',
        borderBottom: '1px solid var(--border-color)',
        paddingBottom: '2rem',
    },
    avatarLarge: {
        width: '100px',
        height: '100px',
        borderRadius: '50%',
        backgroundColor: 'var(--primary-color)',
        color: 'white',
        fontSize: '3rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        marginBottom: '1rem',
    },
    name: {
        fontSize: '2rem',
        color: 'var(--text-color)',
    },
    handle: {
        color: 'var(--secondary-color)',
        fontSize: '1.2rem',
    }
}

export default Profile
