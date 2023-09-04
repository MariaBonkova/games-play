import {useParams} from "react-router-dom";
import {useState} from "react";

export const Details = ({games, addComment}) => {
    const {gameId} = useParams();
    const game = games.find(x => x._id === gameId);

    const [comment, setComment] = useState({
         username: '',
         comment: '',
    });

    const submitHandler = (e) => {
        e.preventDefault();
        addComment(gameId, `${comment}`);
        console.log(comment);

    }
    const commentChangeHandler = (e) => {
        setComment(state => ({
            ...state,
            [e.target.name]: e.target.value
        }))

    }

    return (<section id="game-details">
        <h1>Game Details</h1>
        <div className="info-section">
            <div className="game-header">
                <img className="game-img" src={game.imageUrl}/>
                <h1>{game.title}</h1>
                <span className="levels">MaxLevel: {game.maxLevel}</span>
                <p className="type">{game.categories}</p>
            </div>
            <p className="text">
                {game.summary}
            </p>
            {/* Bonus ( for Guests and Users ) */}
            <div className="details-comments">
                <h2>Comments:</h2>
                <ul >

                    {game.comments?.map(x=>
                        <li key={comment._id} className="comment" >
                            <p>{x}</p>
                        </li>
                    )}

                    {!game.comments &&
                        <p className="no-comment">No comments.</p>
                    }

                </ul>

            </div>
            {/* Edit/Delete buttons ( Only for creator of this game )  */}
            <div className="buttons">
                <a href="#" className="button">
                    Edit
                </a>
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
                    onChange={commentChangeHandler}
                    value={comment.username}

                />
                <textarea
                    name="comment"
                    placeholder="text..."
                    onChange={commentChangeHandler}
                    value={comment.comment}
                />


                <input
                    className="btn submit"
                    type="submit"
                    value="Add Comment"
                />

            </form>
        </article>
    </section>)
}