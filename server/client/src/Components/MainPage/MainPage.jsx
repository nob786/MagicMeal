import React from 'react';


/*=========================Importing CSS File=========================*/
import '../MainPage/MainPage.css'
import NewsLetter from '../SpecialComp/NewsLetter/NewsLetter';


/**=============================Importing Components====================== */
import PartenerImage from '../SpecialComp/PartenerImage/PartenerImage.jsx';




const MainPage = () => {

    return (  
        <div className="MainPage">
            <PartenerImage/>
            <img className="main-page-image-gallery" style={{ width: "100%"}} src="./Pictures/Gr1.jpg" alt="" />
            <img className="main-page-image-gallery" style={{ width: "100%"}} src="./Pictures/Gr2.jpg" alt="" />
            <img className="main-page-image-gallery" style={{width: "100%"}} src="./Pictures/Gr3.jpg" alt="" />
            <img className="main-page-image-gallery" style={{ width: "100%"}} src="./Pictures/Gr4.jpg" alt="" />
            <img className="main-page-image-gallery" style={{ width: "100%"}} src="./Pictures/Gr5.jpg" alt="" />
            <img className="main-page-image-gallery" style={{ width: "100%"}} src="./Pictures/Gr6.jpg" alt="" />
            <NewsLetter/>
        </div>
    );
}
 
export default MainPage;