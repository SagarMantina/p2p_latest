import '../../pages/GamePage.css'
import ReactStars from "react-rating-stars-component";
import { useNavigate } from 'react-router-dom';
    const CompareGames = ({games}) => {

     

        const navigate = useNavigate();
   
    
            const fetchGamePage = (game_name) => {
                navigate(`/game/${game_name}`);
              };

        console.log(games)
          
    return (
        <div className="comparisoncontainer">
            <h1>Compare Similar Games</h1>
            <table className="comparison-table">
                <thead>
                
                    <tr>
                        <th></th>
                        {games && games.length>0 ?
                           games.map((game,index) => (
                            <th key={index}>
                                <img src={game.main_image} alt={game.game_name} className="game-image" onClick={() => fetchGamePage(game.game_name)}/>
                            </th>
                        )): (
                            <td>No games available</td>
                          )}
                    </tr>
                </thead>

                <tbody>
                   
                    <tr>
                    <td>Price</td>
                    {games && games.length>0 ? 
                    games.map((game, index) => (
                        <td key={index} onClick={() => fetchGamePage(game.game_name)}>${game.price}</td>
                    )):
                    (
                        <td>No games available</td>
                      )
                    }
                    </tr>

                    <tr>
                    <td>Category</td>
                    {games && games.length>0 ? 
                    games.map((game, index) => (
                        <td key={index} onClick={() => fetchGamePage(game.game_name)}>{game.category}</td>
                    )): (
                        <td>No games available</td>
                    )}
                    </tr>

                    <tr>
                    <td>Rating</td>
                    {games && games.length>0 ? 
                    games.map((index) => (
                        <td key={index}>
                            <ReactStars
                                size={24}
                                count={5}
                                value={index.rating}
                                activeColor="#D4AF37"
                                color="#C0C0C0"
                                edit={false}
                            />
                        </td>
                    )): (
                        <td>No games available</td>
                    )}
                    </tr>

                    <tr>
                    <td>Release Date</td>
                    {games && games.length>0 ? 
                    games.map((game, index) => (
                        <td key={index}>{game.releaseDate}</td>
                    )): (
                        <td>No games available</td>
                    )}
                    </tr>

                    <tr>
                    <td>Released By</td>
                    {games && games.length>0 ? 
                    games.map((game, index) => (
                        <td key={index}>{game.seller}</td>
                    )): (
                        <td>No games available</td>
                    )}
                    </tr>
                    <tr>
                    <td>Game Name</td>
                    {games && games.length>0 ? 
                    games.map((game, index) => (
                        <td key={index} onClick={() => fetchGamePage(game.game_name)}>{game.game_name}</td>
                    )): (
                        <td>No games available</td>
                    )}
                    </tr>
                </tbody>
            </table>
        </div>
    )
    }

    export default CompareGames