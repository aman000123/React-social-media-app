import { Link } from 'react-router-dom'
import './register.scss'
import { useState } from 'react'
import axios from 'axios'

const Register = () => {

    const [inputs, setInput] = useState({ username: "", email: "", password: "", name: "" })
    const [err, setErr] = useState(null)
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);



    const handleChange = (e) => {
        //every input value take by name field  ==  e.target.name
        setInput(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }
    // console.log(inputs)


    const handleClick = async (e) => {

        e.preventDefault();

        // Simple client-side validation
        if (!inputs.name || !inputs.email || !inputs.password || !inputs.username) {
            setErr("Please fill all fields.");
            return;
        }

        // Validate name and username fields to contain only alphabets
        const nameRegex = /^[A-Za-z]+$/;
        if (!nameRegex.test(inputs.name) || !nameRegex.test(inputs.username)) {
            setErr("Name and Username should contain only alphabet characters.");
            return;
        }
        // Email validation using a regular expression
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(inputs.email)) {
            setErr("Please enter a valid email address.");
            return;
        }



        try {
            setIsSubmitting(true);
            await axios.post("http://localhost:4000/api/auth/register", inputs)
            setInput({ username: "", email: "", password: "", name: "" })
            setSubmitSuccess(true);

        }
        catch (err) {
            if (err.response && err.response.data && err.response.data.message) {
                // If the server responds with an error message, display it to the user
                setErr(err.response.data.message);
                setIsSubmitting(false);
                setSubmitSuccess(false);
            } else {
                // If there is no specific error message from the server, show a generic error
                setIsSubmitting(false);
                setSubmitSuccess(false);
                setErr(err.response.data);
            }

        }
    }
    return (
        <>

            <div className="register">
                <div className="card">
                    <div className="left">
                        <h1>Aman Social</h1>
                        <p>This is my social media website. To see website please do Registration and Login and go ahead Thanks </p>
                        <span>Do you have an account?</span>
                        <Link to="/login"> <button>Login</button></Link>


                    </div>
                    <div className="right">
                        <h1>Registration</h1>
                        <form>
                            <input type="email" placeholder="Username" name="username" onChange={handleChange} value={inputs.username} />
                            <input type="text" placeholder="Email" name="email" onChange={handleChange} value={inputs.email} />
                            <input type="password" placeholder="Password" name="password" onChange={handleChange} value={inputs.password} />

                            <input type="text" placeholder="Name" name="name" onChange={handleChange} value={inputs.name} />
                            {err && <div className="error-message">***{err}</div>}
                            {submitSuccess && <div className="success-message">Your data is submitting and now you can login!</div>}
                            <button onClick={handleClick} disabled={isSubmitting}

                                style={{
                                    backgroundColor: isSubmitting ? 'red' : '#938eef',
                                    cursor: isSubmitting ? 'not-allowed' : 'pointer'
                                }}

                            >Register</button>

                        </form>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Register