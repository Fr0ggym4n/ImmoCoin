import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { authenticate } from 'store/actions'
import './SignIn.css'


const SignIn = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch()
    const history = useHistory();

    const handleEmail = (e) => {
        setEmail(e.target.value)
    }

    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    const fetchSignIn = async (e) => {
        const dataUser = {
            user: {
                email: email,
                password: password
            }
        }
        e.preventDefault();
        const response = await fetch("http://localhost:3000/api/login", {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataUser)
        })

        if (response.status !== 200) {
            alert("Something wrong during sign in!")
            return
        }

        const token = response.headers.get('Authorization').split('Bearer ')[1]
        const data = await response.json()
        const userId = data.data.id
        const userEmail = data.data.attributes.email

        dispatch(authenticate({
            id: userId,
            email: userEmail,
        }, token))

        history.push('/')
    }

    return (
        <div class="container">
        <div className="text-center my-2">
                <h3>Sign In</h3>
            </div>
            <form>
                <div className="form-group">
                    <label className="mb-1" type="text" name="email">Email</label>
                    <input className="form-control mb-2" type="text" name="email" onChange={handleEmail} />
                    <label className="mb-1" type="text" name="password">Password</label>
                    <input className="form-control mb-3" rows='4' type="password" name="password" onChange={handlePassword} />
                    <button className="btn btn-outline-secondary" type="submit" onClick={fetchSignIn}>Sign in</button>
                </div>
            </form>
        </div>
    )

}


export default SignIn