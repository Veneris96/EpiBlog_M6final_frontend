import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    const navigate = useNavigate()

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("loggedIn"))
        if (user && user?.email > 0) {
            navigate("../homepage", { replace: true })
        }
    }, [navigate])

    const handleChange = (event) => {
        setFormData((prev) => ({
            ...prev,
            [event.target.name]: event.target.value
        }))
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        const response = await fetch("http://localhost:5050/login", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(formData)
        })

        const user = await response.json()
        if (response.ok) {
            localStorage.setItem("loggedIn", JSON.stringify(user))
            navigate("/homepage")
        } else {
            alert("Wrong e-mail or password")
        }
        return user
    }


    const gitHubLogin = async () => {
        window.location.href = (`${process.env.REACT_APP_BASE_URL}/auth/github`);
    }

    return (
        <div className='w-screen h-screen flex items-center justify-center bg-gradient-to-tr from-purple-400 to-blue-200 bg-opacity-25 backdrop-blur-sm'>
            <div className='bg-gradient-to-bl from-purple-400 to-blue-200 w-[35%] p-4 rounded-2xl shadow-sm flex items-center justify-center flex-col'>
                <h2 className='font-bold text-4xl mb-10 mt-2'>Login</h2>
                <div>
                    <img
                        className='h-72 mb-10'
                        src='https://cdn-icons-png.flaticon.com/512/1053/1053364.png'
                        alt='login-img' />
                </div>
                <form
                    className='form w-[55%]'
                    onSubmit={handleSubmit}>
                    <div className='flex flex-col justify-center items-center w-auto'>
                        <input
                            className='p-2 rounded-lg mb-2 w-[100%]'
                            type='email'
                            name='email'
                            onChange={handleChange}
                            value={formData.email}
                            placeholder='Insert e-mail'
                        />
                        <input
                            className='p-2 rounded-lg mb-2 w-[100%]'
                            type='password'
                            name='password'
                            onChange={handleChange}
                            value={formData.password}
                            placeholder='Insert password'
                        />
                    </div>
                    <div className='login-buttons flex flex-wrap justify-between mt-5'>
                        <button
                            type='submit'
                            className=' rounded-lg p-2 w-[25%] h-fit bg-green-400 hover:bg-blue-400 text-lg font-semibold'>
                            Log in
                        </button>
                        <button
                            type='button'
                            className='git-login flex justify-evenly p-2 w-[55%] h-fit rounded-lg bg-black text-white text-lg font-semibold hover:brightness-50'
                            onClick={gitHubLogin}>
                            <img
                                className='icon w-[25px] h-[25px] relative top-[2px] '
                                src="https://icon-library.com/images/github-icon-png/github-icon-png-29.jpg"
                                alt="github-logo" />
                            Login with GitHub
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login