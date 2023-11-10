import {useState} from "react";

export const CreateGame=({addGameHandler,})=>{
    const [createGame,setCreateGame]=useState({
        title:'',
        category:'',
        maxLevel:'',
        imageUrl:'',
        summary:'',

    })
    const submitHandler =(e)=>{
        e.preventDefault();
        //това отдолу е за неконтролирано вземане на информацият
     //  const gameData = Object.fromEntries(new FormData(e.target));

        console.log(createGame);
       addGameHandler(createGame);
     

    }

    const change =(e)=>{
        setCreateGame(state=>({
            ...state,
            [e.target.name]:e.target.value

        }))

    }
    return (
        <section id="create-page" className="auth">
            <form id="create" onSubmit={submitHandler}>
                <div className="container">
                    <h1>Create Game</h1>
                    <label htmlFor="leg-title">Legendary title:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        placeholder="Enter game title..."
                      onChange={change}
                       value={createGame.title}
                    />
                    <label htmlFor="category">Category:</label>
                    <input
                        type="text"
                        id="category"
                        name="category"
                        placeholder="Enter game category..."
                        onChange={change}
                        value={createGame.category}
                    />
                    <label htmlFor="levels">MaxLevel:</label>
                    <input
                        type="number"
                        id="maxLevel"
                        name="maxLevel"
                        min={1}
                        placeholder={1}
                        onChange={change}
                        value={createGame.maxLevel}
                    />
                    <label htmlFor="game-img">Image:</label>
                    <input
                        type="text"
                        id="imageUrl"
                        name="imageUrl"
                        placeholder="Upload a photo..."
                        onChange={change}
                        value={createGame.imageUrl}
                    />
                    <label htmlFor="summary">Summary:</label>
                    <textarea name="summary" id="summary"
                              onChange={change}
                              value={createGame.summary} />
                    <input
                        className="btn submit"
                        type="submit"
                        value="Create Game"

                    />
                </div>
            </form>
        </section>
    )
}