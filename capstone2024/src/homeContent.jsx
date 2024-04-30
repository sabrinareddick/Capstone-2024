import React from 'react';
import './home.css';

const HomeContent = () => {
  return (
    <div className="home-content-container">
      <h1 id="title" style={{ backgroundColor: "rgba(255, 255, 255, 0.5)" }}>Gwyneveres Medow Manor Estate</h1>
      <div>
        <h3 style={{ backgroundColor: "rgba(255, 255, 255, 0.5)" }}>Unity in Sophistication ~ A Vision for Elevated Living</h3>
        <p style={{ backgroundColor: "rgba(255, 255, 255, 0.5)" }}>Welcome to Gwyneveres Medow Manor Estate, where elegance meets purpose, and where the pursuit of excellence is not merely a goal but a way of life. 
        At Gwyneveres Medow Manor Estate, we epitomize the essence of refined living and community cohesion. We stand as a beacon of exclusivity, 
        embodying a shared commitment to fostering a profound sense of belonging and support amongst our esteemed residents. With an unwavering dedication to excellence, 
        we endeavor to elevate not only our individual lives but also the fabric of society at large. Our ethos revolves around cultivating a culture of sophistication, 
        where success, education, and impeccable upbringing are celebrated and esteemed. Together, we aspire to create an environment where every member thrives, where bonds are forged through mutual respect, 
        and where our collective pursuit of betterment enriches both our lives and the world around us.</p>
      </div><br></br><br></br>
      
     <SlideShow/>
     
      <div><br></br><br></br>
        <h3 style={{ backgroundColor: "rgba(255, 255, 255, 0.5)" }}>Our Mission</h3>
        <p style={{ backgroundColor: "rgba(255, 255, 255, 0.5)" }}>Our Mission at Gwyneveres Medow Manor Estate is to curate an exceptional living experience that transcends the boundaries of luxury. 
        Rooted in sophistication and camaraderie, we pride ourselves on fostering an atmosphere where fun, generosity, and community spirit thrive. 
        Through a calendar brimming with fundraisers and events tailored for our esteemed members and residents, 
        we aim to not only elevate social enjoyment but also to extend our philanthropic reach, supporting causes that resonate with our collective values. 
        With a commitment to blending opulence with altruism, we endeavor to leave a lasting legacy of joy, unity, and meaningful impact within and beyond our gates.</p>
      </div><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
    </div>
  );
}
import image1 from './uploads/Screenshot 2024-04-11 at 9.47.57 PM.png';

const SlideShow = () => {
  let currentImageIndex; 
    const slideImage = document.getElementById("slideImage");
    const images = [
      'Screenshot 2024-04-11 at 9.47.57 PM.png',
      'Screenshot 2024-04-11 at 9.48.03 PM.png',
      'Screenshot 2024-04-11 at 9.50.32 PM.png',
      'Screenshot 2024-04-11 at 9.51.14 PM.png',
      'Screenshot 2024-04-11 at 9.51.28 PM.png',
      'Screenshot 2024-04-11 at 9.51.44 PM.png',
      'Screenshot 2024-04-11 at 9.52.14 PM.png',
      'Screenshot 2024-04-10 at 8.44.14 PM.png',
      'Screenshot 2024-04-11 at 9.47.33 PM.png',
      'Screenshot 2024-04-11 at 9.47.41 PM.png',
      'Screenshot 2024-04-11 at 9.47.52 PM.png',
    ];

    const plusSlides = (idx) => {
      let newIndex = currentImageIndex + idx;
      if (newIndex < 0) {
        newIndex = images.length - 1;
      } else if (newIndex >= images.length) {
        newIndex = 0;
      }
      currentImageIndex=newIndex;
      //setCurrentImageIndex(newIndex);
      slideImage.src = "./uploads/" + images[newIndex];
    };

    // Attach event listeners
   

    // Cleanup
    
  

  return (
    <div>
      <h1>IMAGES</h1>
      <div className="slideshow-container">
        <div className="slide fade">
          <img id="slideImage" src={`./uploads/${images[currentImageIndex]}`} />
        </div>
        <a className="prev" onClick={() => plusSlides(-1)}>&#10094;</a>
        <a className="next" onClick={() => plusSlides(1)}>&#10095;</a>
      </div>
    </div>
  );
}

export default HomeContent;
