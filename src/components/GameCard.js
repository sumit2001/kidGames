import React from 'react'
import { Link } from 'react-router-dom'
const GameCard = (props) => {

    return (
        <div>
            <div className="card" >
                <img src={props.game.imageUrl} className="card-img-top" alt="game" style={{ height: "250px" }} />
                <div className="card-body">
                    <h5 className="card-title">{props.game.gameName}</h5>
                    <Link to={props.game.ref} className="btn btn-primary">Play Game</Link>
                </div>
            </div>
        </div >
    )
}

export default GameCard
