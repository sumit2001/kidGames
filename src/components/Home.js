import React from 'react'
import GameCard from './GameCard'
const Home = (props) => {
    const allGames = [{
        gameName: "Snake Game",
        imageUrl: "https://i.ytimg.com/vi/o5vf6xY9QPA/maxresdefault.jpg",
        ref: "snake"
    }, {
        gameName: "Dragon Game",
        imageUrl: "https://images.crazygames.com/dragon-world.png?auto=format,compress&q=75&cs=strip",
        ref: "dragon"
    }, {
        gameName: "Tic Tac Toe",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Tic_tac_toe.svg/1200px-Tic_tac_toe.svg.png",
        ref: "tictactoe"
    }, {
        gameName: "2048",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/2048_logo.svg/1200px-2048_logo.svg.png",
        ref: "2048"
    },]

    return (
        <div>
            <div className="container">
                <div className="row">
                    {
                        allGames.map((game) => {
                            return <div className="my-3 col-md-6 col-lg-4 col-xl-3 col-sm-6 col-xs-12" key={game.imageUrl} >
                                <GameCard game={game}></GameCard>
                            </div>
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Home