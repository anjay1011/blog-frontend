import React, { useState } from 'react'

const LoginForm = ({ handleLogin }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const onSubmit = (event) => {
        event.preventDefault()
        console.log('Login form submitted', { username, password })
        handleLogin({ username, password })
    }

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Welcome back</h2>
            <form onSubmit={onSubmit} style={styles.form}>
                <div>
                    <input
                        type="text"
                        value={username}
                        name="Username"
                        placeholder="Username"
                        onChange={({ target }) => setUsername(target.value)}
                        className="input-field"
                    />
                </div>
                <div>
                    <input
                        type="password"
                        value={password}
                        name="Password"
                        placeholder="Password"
                        onChange={({ target }) => setPassword(target.value)}
                        className="input-field"
                    />
                </div>
                <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                    Login
                </button>
            </form>
        </div>
    )
}

const styles = {
    container: {
        padding: '2rem',
        backgroundColor: 'var(--card-bg)',
        borderRadius: '12px',
        boxShadow: 'var(--shadow)',
        maxWidth: '400px',
        margin: '4rem auto',
        textAlign: 'center',
    },
    heading: {
        marginBottom: '2rem',
        color: 'var(--text-color)',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
    }
}

export default LoginForm
