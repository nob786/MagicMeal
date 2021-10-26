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
            <NewsLetter/>
        </div>
    );
}
 
export default MainPage;