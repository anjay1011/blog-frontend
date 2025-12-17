import React, { useState } from 'react'

const CreateBlog = ({ createBlog, onClose, user }) => {
    const [title, setTitle] = useState('')
    const [isAnonymous, setIsAnonymous] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        createBlog({
            title,
            author: isAnonymous ? 'Anonymous' : (user.name || user.username),
            isAnonymous // Pass the boolean flag
        })
        setTitle('')
        setIsAnonymous(false)
        onClose()
    }

    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>
                <div style={styles.header}>
                    <h3>Brew a new Tea</h3>
                    <button onClick={onClose} style={styles.closeBtn}>&times;</button>
                </div>

                <form onSubmit={handleSubmit} style={styles.form}>
                    <div style={styles.group}>
                        <label style={styles.label}>What's brewing?</label>
                        <input
                            type="text"
                            value={title}
                            onChange={({ target }) => setTitle(target.value)}
                            placeholder="Title or thought..."
                            className="input-field"
                            required
                        />
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                        <input
                            type="checkbox"
                            id="anon"
                            checked={isAnonymous}
                            onChange={() => setIsAnonymous(!isAnonymous)}
                        />
                        <label htmlFor="anon" style={{ color: 'var(--text-color)', fontWeight: '500' }}>Brew Anonymously 👻</label>
                    </div>



                    <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '1rem' }}>
                        Post Tea
                    </button>
                </form>
            </div>
        </div>
    )
}

const styles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal: {
        backgroundColor: 'var(--card-bg)',
        width: '90%',
        maxWidth: '500px',
        borderRadius: '16px',
        padding: '2rem',
        boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
        animation: 'slideUp 0.3s ease-out',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1.5rem',
    },
    closeBtn: {
        fontSize: '2rem',
        background: 'transparent',
        color: 'var(--text-color)',
        lineHeight: 0.5,
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
    },
    label: {
        display: 'block',
        marginBottom: '0.5rem',
        fontWeight: '500',
        color: 'var(--text-color)',
    }
}

export default CreateBlog
