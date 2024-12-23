import React from "react";
import styles from '../styles/About.module.css'
import Header from './Header'
import Footer from "./Footer";

const About = () => {
  return (
    <div className={styles['aboutpage']}>
      <Header />
      <div className={styles['firstpart']}>
        <div className={styles['firstpartcontent']}>
        <img
          src="/images/design_a_logo_with_word__P2P__p2p_with_high_-removebg-preview-transformed.png"
          alt=""
        />
        <h1>
          PAY TO PLAY<sup style={{ fontSize: "20px" } }>&reg;</sup>
        </h1>
        <p>
          Your premier hub for all things gaming, offering unparalleled
          selection and unbeatable deals. Dive into a world of endless
          excitement and discover your next gaming adventure today!
        </p>
        </div>

      <div className={styles["firstpartvideo"]}>
        <video
        className={styles["myvideo"]}
         src="/Blue & White Futuristic Gaming Channel Youtube Intro .mp4"
         autoPlay
         loop
         muted
         />
      </div>
      </div>


      <div className={styles["secondpart"]}>
         <div className={styles["secondpartcontent"]}> 
         <h1>what we believe in</h1>
        <ul class={styles["believes"]}>
          <li>Highlight the sense of community and belonging that gaming fosters. Mention how games bring people
            together,
            whether it's through cooperative play, competitive matches, or shared experiences.</li>
          <li>We believe games can let you do extraordinary things. They bring you this pure moment of escapism that
            just
            makes you happy.</li>
          <li>We believe that everyone should be able to enjoy games. Wherever you are, whenever you want, whatever you
            like.</li>
          <li> Emphasize your dedication to diversity and inclusivity within gaming. Discuss initiatives aimed at making
            gaming accessible to people of all backgrounds, abilities, and identities.</li>
        </ul>
         </div>
      </div>


      <div className={styles['thirdpart']}>
      <div class={styles['games_col']} id={styles["games_col_left"]}> 
      <div class={styles["game_image"]} style={{position:'relative', left:'90%' }}>
          <img src="https://cdn.akamai.steamstatic.com/steam/apps/553850/capsule_231x87.jpg?t=1707955699" alt="image" className={styles['visible']} />
      </div>
      <div class={styles["game_image"]} style={{position:'relative', left:'60%' }}>
          <img src="https://cdn.akamai.steamstatic.com/steam/apps/899770/capsule_231x87.jpg?t=1708534852" alt="image" className={styles['visible']} />
      </div>
      <div class={styles["game_image"]}>
          <img src="https://cdn.akamai.steamstatic.com/steam/apps/1675200/capsule_231x87.jpg?t=1699990406" alt="image" className={styles['visible']} />
      </div>
      <div class={styles["game_image"]} style={{position:'relative', left:'60%' }}>
          <img src="https://cdn.akamai.steamstatic.com/steam/apps/1172470/capsule_231x87.jpg?t=1707925485" alt="image" className={styles['visible']} />
      </div>
      <div class={styles["game_image"]} style={{position:'relative', left:'90%'} }>
          <img src="https://cdn.akamai.steamstatic.com/steam/apps/1623730/capsule_231x87.jpg?t=1707904340" alt="image" className={styles['visible']} />
      </div>
      </div>

      <div class={styles["thirdpartcontent"]}>
        <h1>Access Games Instantly</h1>
        <p>With hundreds of games from AAA to indie and everything in-between. Enjoy exclusive deals, automatic game
          updates, and other great perks.</p>
        <a href="/">Browse the Store <span id="arrow">-</span></a>
      </div>


      <div class={styles['games_col']} id={styles["games_col_right"]}> 
      <div class={styles["game_image"]} style={{position:'relative', right:'90%' }}>
          <img src="https://4kwallpapers.com/images/wallpapers/red-dead-redemption-3840x2160-10885.jpg" alt="image" className={styles['visible']} />
      </div>
      <div class={styles["game_image"]} style={{position:'relative', right:'60%' }}>
          <img src="https://images.shopcdn.co.uk/86/38/8638a710f067c10c8d117d1956eb67ce/1400x787/webp/resize" alt="image" className={styles['visible']} />
      </div>
      <div class={styles["game_image"]}>
          <img src="https://c4.wallpaperflare.com/wallpaper/489/876/39/elden-ring-from-software-fromsoftware-hd-wallpaper-preview.jpg" alt="image" className={styles['visible']} />
      </div>
      <div class={styles["game_image"]} style={{position:'relative', right:'60%' }}>
          <img src="https://wallpaperset.com/w/full/8/c/5/439976.jpg" alt="image" className={styles['visible']} />
      </div>
      <div class={styles["game_image"]} style={{position:'relative', right:'90%' }}>
          <img src="https://i.pinimg.com/originals/9a/2c/1c/9a2c1c428752523b0a8c6a5cb65a386e.jpg" alt="image" className={styles['visible']} />
      </div>
      </div>

      </div>
      <Footer />
    </div>
  );
};

export default About;
