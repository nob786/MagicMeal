import React from 'react'
import axios from "../../../axios"
import Button from '../Button/Button';
import './NewsLetter.css'

//=================React  Notification
import {toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'

toast.configure();


<<<<<<< HEAD
=======
  const subscribeNewsletter = () => {
    axios
      .post("/public/subscribe-to-newsletter", { email })
      .then((res) => {
        const success = res.data.success;
        if (success === true) {
          toast.success(`Successfully Subscribed to Our NewsLetter Service`, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
          });
        } else {
          toast.success(
            `You have already subscribed for our newletter. Stay tuned for updates.`,
            {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 2000,
            }
          );
        }
      })
      .catch((req) => {
        window.alert(req.message);
      });
  };
>>>>>>> aaf81a1785b6f0c03ee74a3978312725e02a85dc

const NewsLetter = () => {
    const [email, setEmail]= React.useState();

    const subscribeNewsletter =()=>{


<<<<<<< HEAD
        axios.post("/public/subscribe-to-newsletter", {email})
        .then((res) => {
          toast.success(`Successfully Subscribed to Our NewsLetter Service`, {position: toast.POSITION.TOP_CENTER ,
          autoClose: 2000});
        })
        .catch((req) => {
          window.alert(req.message);
        });
    }


    const handleChangeEmail=(event)=>{

        console.log(event.target.value);
         setEmail(  event.target.value );
       console.log(email);
    };
   

    return ( 
        <section class="newsletter">
            <div class="newsletter-cont">
		            <h2 className="newsletter-title">Subscribe to our Newsletter</h2>
                    
                    <div className="newsletter_cont">
                        <input value={email} onChange={handleChangeEmail} className="newsletter-field" type="email" autoComplete="email" placeholder="Enter your email"/>
                        
                    </div>


                    <div className="subscribe_button"> 
                        <button className="newsletter-submit-button" onClick={subscribeNewsletter} >
                            Subscribe
                        </button>
                    </div>
                    

            </div>
        </section>
     );
}
 
export default NewsLetter;
=======
        <div className="subscribe_button">
          <button
            className="newsletter-submit-button"
            onClick={subscribeNewsletter}
          >
            Subscribe
          </button>
        </div>
      </div>
    </section>
  );
};

export default NewsLetter;
>>>>>>> aaf81a1785b6f0c03ee74a3978312725e02a85dc
