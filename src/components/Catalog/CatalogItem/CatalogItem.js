import {Link} from "react-router-dom";

export const CatalogItem=({gameOne})=>{
    return (
        <div className="allGames">
            <div className="allGames-info">
                <img src={gameOne.imageUrl}/>
                <h6>{gameOne.category}</h6>
                <h2>{gameOne.title}</h2>

                <Link to={`/catalog/${gameOne._id}`} className="details-button">
                    Details
                </Link>
            </div>
        </div>
    )
}