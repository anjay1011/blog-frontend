import React, { useState } from 'react'
import userService from '../services/users'

const SignupForm = ({ handleLogin, setView }) => {
    const [username, setUsername] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)

    const handleSignup = async (event) => {
        event.preventDefault()
        console.log('Signup form submitted')
        try {
            await userService.register({ username, name, password })
            // Auto-login after signup or redirect to login
            alert('Signup successful! Please login.')
            // Optionally could auto-login here if API returns token, usually it doesn't.
            setView('home') // Actually should go to login state, but App control is 'user' state. 
            // If we don't hold state here, we can't trigger login. 
            // Let's just switch view to home which will show Login form in App.jsx logic
            // Or better, let App handle "Signup Success"
            window.location.reload() // Quick reset to show login
        } catch (exception) {
            setError('Error signing up. Username might be taken.')
            setTimeout(() => setError(null), 5000)
        }
    }

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Join the Tea Party</h2>
            {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}
            <form onSubmit={handleSignup} style={styles.form}>
                <div>
                    <label style={styles.label}>Full Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={({ target }) => setName(target.value)}
                        className="input-field"
                        placeholder="e.g. Alice Wonderland"
                        required
                    />
                </div>
                <div>
                    <label style={styles.label}>Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={({ target }) => setUsername(target.value)}
                        className="input-field"
                        placeholder="Unique handle"
                        required
                    />
                </div>
                <div>
                    <label style={styles.label}>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={({ target }) => setPassword(target.value)}
                        className="input-field"
                        placeholder="Secret..."
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
                    Sign Up
                </button>
            </form>
            <p style={{ marginTop: '1rem', color: 'var(--secondary-color)' }}>
                Already have an account? <span style={styles.link} onClick={() => window.location.reload()}>Login</span>
            </p>
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
        gap: '0.5rem',
        textAlign: 'left',
    },
    label: {
        fontSize: '0.9rem',
        fontWeight: '600',
        marginBottom: '0.2rem',
        display: 'block',
        color: 'var(--text-color)'
    },
    link: {
        color: 'var(--primary-color)',
        cursor: 'pointer',
        fontWeight: 'bold',
    }
}

export default SignupForm
