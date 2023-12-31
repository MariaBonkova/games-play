import {Link} from "react-router-dom";
import * as autService from "../../service/authService";
import {useContext} from "react";
import {AuthContext} from "../../context/AuthContex";
import {useNavigate} from "react-router-dom";


export const Register = () => {
    const {userLogin} = useContext(AuthContext);
    const navigate = useNavigate();

    const onSubmit = (e) => {

        e.preventDefault();

        const formData = (new FormData(e.target));
        const email = formData.get('email');
        const password = formData.get('password');
        const confirmPassword = formData.get('confirm-password');

        if (password !== confirmPassword) {
            return;
        }

        autService.register(email, password)
            .then(authData => {
                console.log(authData)
                userLogin(authData);
                navigate('/')
            })
    };

    return (
        <section id="register-page" className="content auth">
            <form id="register" onSubmit={onSubmit}>
                <div className="container">
                    <div className="brand-logo"/>
                    <h1>Register</h1>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="maria@email.com"
                    />
                    <label htmlFor="pass">Password:</label>
                    <input type="password" name="password" id="register-password"/>
                    <label htmlFor="con-pass">Confirm Password:</label>
                    <input type="password" name="confirm-password" id="confirm-password"/>
                    <input className="btn submit" type="submit" defaultValue="Register"/>
                    <p className="field">
          <span>
              If you already have profile click <Link to={'/login'}>here</Link>
          </span>
                    </p>
                </div>
            </form>
        </section>
    )
}