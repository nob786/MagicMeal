import React from 'react';
import '../Footer/FAQ.css'
import TitleTag from "../SpecialComp/TitleTag"





const FAQ = () => {
    return ( 
        <div className="faq">
            <TitleTag title="FAQ's"/>
            <div className="faq-list">
                <h3 className="faq-questions">
                    Do we charge commission for orders on Eatsabyte?
                </h3>
                <h3 className="faq-answers">
                    No, only Registered Chef Partners will pay for monthly subscription.
                </h3>

                <h3 className="faq-questions">
                   Can we connect third party applications to Eatsabyte?
                </h3>
                <h3 className="faq-answers">
                    No, we donot allow any third-party software connection to our web-app.
                </h3>

                <h3 className="faq-questions">
                    Where can i see my orders?
                </h3>
                <h3 className="faq-answers">
                    Once Logged-in, user can see orders on Header or at "/user/orders-history".
                </h3>

                <h3 className="faq-questions">
                    Does Chef Partnership has subscription fee?
                </h3>
                <h3 className="faq-answers">
                    Partnership program is free for first three months. After that, a monthly subscription fee will be charged.
                </h3>

                <h3 className="faq-questions">
                    Can we order using mobile?
                </h3>
                <h3 className="faq-answers">
                    Yes, users can use both our Web-App and Android App for order Placing. While, Chefs are limited to use our Web-App.
                </h3>

                <h3 className="faq-questions">
                    Will I be able to put menu on my own?
                </h3>
                <h3 className="faq-answers">
                    Yes, only registered Chef partners are allowed to add menus, take orders and give services using our application.
                    <br /> Foodies can only place orders and book table.
                </h3>

                <h3 className="faq-questions">
                    What are features of Eatsabyte?
                </h3>
                <h3 className="faq-answers">
                    Eatsabyte is a food ordering application. Its features include Take-away orders booking, table booking and Dine-in ordering(Dine-in orders is a QR code based order feature which is limited to our Android App)
                </h3>
                
            </div>
        </div>
     );
}
 
export default FAQ;
<div>
    FAQ
</div>