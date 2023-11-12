import './App.css';
import {Header} from "./components/Header/Header";
import {Home} from "./components/Home/Home";
import {Login} from "./components/Login/Login";
import {Register} from "./components/Register/Register";
import {Routes, Route, useNavigate} from 'react-router-dom'
import {CreateGame} from "./components/CreateGame/CreateGame";
import {Catalog} from "./components/Catalog/Catalog";
import {Suspense, useEffect, useState} from "react";
import {getAll} from "./service/GameService";
import {Details} from "./components/Details/Details";
import uniqid from "uniqid";
import {EditGame} from "./components/EditGame/EditGame";
import {AuthContext} from "./context/AuthContex";
import {Logout} from "./components/Logout/Logout";
import {useLocalStorage} from "./hooks/useLocalStorage";

function App() {
    const [games, setGame] = useState([]);
    const [auth, setAuth] = useLocalStorage('auth',{}) //тук ползваме къстам хука вместо useState, защото реално ние правим копие на стейта в къстам хука

    const navigate = useNavigate();

    const userLogin = (authData) => {
        setAuth(authData)//тук може да се правят проверки
    }
    const userLogout =()=>{
        setAuth({});
    }

    const addComment = (gameId, comment) => {
        setGame(state => {
            const game = state.find(x => x._id === gameId);
            const comments = game.comments || [];
            comments.push(comment);
            return [
                ...state.filter(x => x._id !== gameId),
                {...game, comments},
            ];
        })

    }

    useEffect(() => {
        getAll().then(result => {
            setGame(result);
            console.log(games)
        })
    }, []);

    const addGameHandler = (createGame) => {
        setGame(state => [
            ...state,
            {
                createGame,
                _id: uniqid()
            }

        ]);

        navigate("/catalog")
    }


    return (
        // eslint-disable-next-line react/jsx-no-undef
        <AuthContext.Provider value={{user: auth, userLogin,userLogout
        }}>
            <div id="box">

                <Header/>
                <main id="main-content">
                    <Routes>
                        <Route path={"/"} element={<Home games={games}/>}/>
                        <Route path={"login"} element={<Login/>}/>
                        <Route path={"register"}
                               element={
                            <Suspense fallback={<span>Loading...</span>}>
                                <Register/>
                            </Suspense>}/>
                        <Route path={"logout"} element={<Logout/>}/>
                        <Route path={"create"} element={<CreateGame addGameHandler={addGameHandler}/>}/>
                        <Route path={"catalog"} element={<Catalog games={games}/>}/>
                        <Route path={"catalog/:gameId"} element={<Details games={games} addComment={addComment}/>}/>
                        <Route path={"catalog/:gameId/edit"} element={<EditGame/>}/>
                    </Routes>
                </main>
            </div>
        </AuthContext.Provider>


    );
}

export default App;
