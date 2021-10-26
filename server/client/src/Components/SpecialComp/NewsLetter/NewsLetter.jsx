import React from 'react'
import Button from '../Button/Button';
import '../NewsLetter/NewsLetter.css'


const NewsLetter = () => {
    return ( 
        <section class="newsletter">
            <div class="newsletter-cont">
		            <h2 className="newsletter-title">Subscribe to our Newsletter</h2>
                    
                    <div className="newsletter_cont">
                        <input className="newsletter-field" type="email" autoComplete="email" placeholder="Enter your email"/>
                        
                    </div>


                    <div className="subscribe_button"> 
                        <button className="newsletter-submit-button">
                            Subscribe
                        </button>
                    </div>
                    

            </div>
        </section>
     );
}
 
export default NewsLetter;