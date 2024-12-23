const InfoContainer = ({game_details}) => {
  return (
    <div className="infocontainer">
        <img src={game_details.main_image} alt="main_image" />
        <p>{game_details.description}</p>
        <p style={{textTransform:'uppercase'}}>Category : <span> {game_details.category}</span></p>
        <p style={{textTransform:'uppercase'}}>Release Date : <span>{game_details.releaseDate}</span></p>
        <p style={{textTransform:'uppercase'}}>ReleasedBy : <span>{game_details.seller}</span></p>
    </div>
  )
}

export default InfoContainer