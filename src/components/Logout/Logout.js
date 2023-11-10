import {useNavigate} from "react-router-dom";
import {useEffect,useContext} from "react";
import {logout} from '../../service/authService'
import {AuthContext} from "../../context/AuthContex";


export const Logout = () => {
    const navigate = useNavigate();
    const  {user,userLogout}=useContext(AuthContext)


    useEffect(() => {
        console.log(user.accessToken)

        logout (user.accessToken)

            .then(() => {
                userLogout();
               navigate('/')

            })
            .catch(() => {
                navigate('/')
            });


    });
    return null
}