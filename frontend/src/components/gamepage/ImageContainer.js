import MainFrame from "./MainFrame"
import SubImages from "./SubImages"



const ImageContainer = ({game_details,currentImage,handleMouseEnter,handleMouseLeave}) => {
  return (
    <div className="image_container">
    <MainFrame main_image={currentImage} />
    <SubImages  
    sub_images={game_details.sub_images} 
    handleMouseEnter={handleMouseEnter}
    handleMouseLeave={handleMouseLeave} />
    </div>
  )
}

export default ImageContainer