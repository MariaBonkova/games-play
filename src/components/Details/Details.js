import {Link, useNavigate, useParams} from "react-router-dom";
import {useState} from "react";

export const Details = ({games, addComment}) => {
    const {gameId} = useParams();
    const navigate=useNavigate()
    const game = games.find(x => x._id === gameId);

    const [comment, setComment] = useState({
        username: '',
        comment: '',
    });
    const [error, setError] = useState({
        username: '',
        comment: '',
    })

    const submitHandler = (e) => {
        e.preventDefault();
        addComment(gameId, `${comment.username} ${comment.comment}`);
        console.log(comment);

    }
    const commentChangeHandler = (e) => {
        setComment(state => ({
            ...state,
            [e.target.name]: e.target.value
        }))

    }

    const validate = (e) => {
        let message = "";
        let value = e.target.value
        if (value.length < 4) {
            message = "must be more than 4 characters"
        } else if (value.length > 8) {
            message = "must by less than 8"
        }

        setError(err => ({
            ...err,
            username: message,
        }));
    }
    const  validateComment=(e)=>{
        let message = "";
        let value = e.target.value
        if(value.length<5){
            message="must be more than 5 characters"
        }else if(value.length>10){
            message="must by less than 10"
        }
        setError(err=>({
            ...err,
            [e.target.name]:message,
        }));
    }

    return (<section id="game-details">
        <h1>Game Details</h1>
        <div className="info-section">
            <div className="game-header">
                <img className="game-img" src={game.imageUrl}/>
                <h1>{game.title}</h1>
                <span className="levels">MaxLevel: {game.maxLevel}</span>
                <p className="type">{games.categories}</p>
            </div>
            <p className="text">
                {game.summary}
            </p>
            <div className="details-comments">
                <h2>Comments:</h2>
                <ul>
                    {game.comments?.map(x =>
                        <li key={comment._id} className="comment">
                            <p>{x}</p>
                        </li>
                    )}
                    {!game.comments &&
                        <p className="no-comment">No comments.</p>
                    }
                </ul>

            </div>

            <div className="buttons">
                <Link to={`/catalog/${game._id}/edit`} className="button">
                    Edit
                </Link>
                <a href="#" className="button">
                    Delete
                </a>
            </div>
        </div>

        <article className="create-comment">
            <label>Add new comment:</label>
            <form className="form" onSubmit={submitHandler}>
                <input
                    type="text"
                    name="username"
                    placeholder="Mara"
                    onBlur={validate}
                    onChange={commentChangeHandler}
                    value={comment.username}
                />
                {error.username &&
                    <div style={{color:"red"}}>{error.username}</div>}

                <textarea
                    name="comment"
                    placeholder="text..."
                    onChange={commentChangeHandler}
                    value={comment.comment}
                    onBlur={validateComment}
                />
                {error.comment &&
                    <div style={{color:"red"}}>{error.comment}</div>}

                <input
                    className="btn submit"
                    type="submit"
                    value="Add Comment"

                />

            </form>
        </article>
    </section>)
}