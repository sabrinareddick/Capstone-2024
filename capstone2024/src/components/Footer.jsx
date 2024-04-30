// import React, { useState, useEffect } from "react";

// const Footer = () => {
//   const [isVisible, setIsVisible] = useState(true);

//   useEffect(() => {
//     const handleScroll = () => {
//       // Calculate the scroll position
//       const scrollY = window.scrollY || window.pageYOffset;
//       // Check if the user has scrolled to the bottom of the page
//       const isAtBottom = (scrollY + window.innerHeight) >= document.body.scrollHeight;
//       // Toggle the visibility of the footer based on the scroll position
//       setIsVisible(!isAtBottom);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   return (
//     <footer className={`bg-primary py-4 fixed bottom-0 w-full transition-all ${isVisible ? '' : 'invisible'}`}>
//       <div className="container mx-auto">
//         <p className="text-white text-center">
//           Copyright &copy; Gwyneveres Medow Manor Estate 2024. All rights reserved.
//         </p>
//       </div>
//     </footer>
//   );
// };

// export default Footer;


import React, { useState, useEffect } from "react";

const Footer = () => {
  const [isHidden, setIsHidden] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const isScrolledDown = prevScrollPos < currentScrollPos;
      setIsHidden(isScrolledDown);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  return (
    <footer
      className={`bg-primary py-4 fixed bottom-0 w-full transition-all ${
        isHidden ? "invisible" : ""
      }`}
    >
      <div className="container mx-auto">
        <p className="text-white text-center">
          Copyright &copy; Gwyneveres Medow Manor Estate 2024. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;