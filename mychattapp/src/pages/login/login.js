import { Link, useNavigate } from 'react-router-dom'
import './login.scss'
import { useContext, useState } from 'react'
import { AuthContext } from '../../context/authcontext';
import axios from 'axios'



const Login = () => {

    const { login } = useContext(AuthContext)

    const [inputs, setInput] = useState({ username: "", password: "", })

    const [err, setErr] = useState(null)

    const Navigate = useNavigate()

    const handleChange = (e) => {

        //every input value take by name field  ==  e.target.name
        setInput(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            await login(inputs)
            Navigate('/')
        }
        catch (err) {


            if (err.response && err.response.data && err.response.data.message) {
                setErr(err.response.data.message); // Set the error message from the server response
            } else {
                setErr(err.response.data); // If no specific error message, show a generic error
            }
        }
    }

    return (
        <>

            <div className="login">
                <div className="card">
                    <div className="left">
                        <h1>Hello World</h1>
                        <p>This is my social media website. To see website plese login and go ahead Thanks </p>
                        <span>Don't have an account?</span>
                        <Link to="/register"> <button>Register</button></Link>


                    </div>
                    <div className="right">
                        <h1>Login</h1>
                        <form>
                            <input type="text" placeholder="Username" name="username"
                                onChange={handleChange} value={inputs.username} />
                            <input type="password" placeholder="Password" name="password"
                                onChange={handleChange} value={inputs.password} />
                            {err && <div className="error-message">***{err}</div>}
                            <button onClick={handleLogin}>Login</button>

                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login