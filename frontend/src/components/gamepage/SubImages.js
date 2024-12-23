import React from "react"
const SubImages = ({sub_images,handleMouseEnter,handleMouseLeave}) => {
  return (
    <div className="subImages">
      {
        sub_images.map((image,index) => (
          <img 
          key={index}
          src={image} 
          alt="" 
          onMouseEnter={()=>handleMouseEnter(image)}
          onMouseLeave={handleMouseLeave}
          />
        ))
      }
    </div>
  )
}

export default SubImages