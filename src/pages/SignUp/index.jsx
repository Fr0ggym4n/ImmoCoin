import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { authenticate } from 'store/actions'
import Alert from '@material-ui/lab/Alert';
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    formContainer: {
        padding: "10%",
    },
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        
    }
  }));




const SignUp = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch()
    const history = useHistory();

    const [alert, setAlert] = useState(false); 

    const handleEmail = (e) => {
        setEmail(e.target.value)
    }

    const handlePassword = (e) => {
        setPassword(e.target.value)
    }


    const fetchSignUp = async (e) => {

        const dataUser = {
            user: {
                email: email,
                password: password
            }
        }
        e.preventDefault();
        const response = await fetch("https://immocoin-backend.herokuapp.com/api/signup", {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataUser)
        })

        if (response.status !== 200) {
            setAlert(true); 
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
    const classes = useStyles();
    return (
        <Container maxWidth="md" className={classes.container} >
            <div>
                <h3>Sign Up</h3>
            </div>
            <form className={classes.formContainer}>
                <div>
                    <label type="text" name="email">Email</label>
                    <input type="text" name="email" onChange={handleEmail} />
                    <label type="text" name="password">Password</label>
                    <input rows='4' type="password" name="password" onChange={handlePassword} />
                    <button type="submit" onClick={fetchSignUp}>Sign up</button>
                </div>
                <div> {alert ? <Alert severity="error">This is an error alert — check your info</Alert> : <></> } 
                </div>
            </form>
            </Container>
    )
}


export default SignUp