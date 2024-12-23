import { useState } from "react";
import MenuNav from '../components/menu-nav';
import TarotIcon from "@/components/tarot-icon";
import SocialIcons from "@/components/contact-social";


export default function ContactPage() {
    const [user, setUser] = useState("");
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState("");

    async function sendMail() {
        try {
            const response = await fetch('/api/email', { 
                method: 'POST',
                headers: { 'Content-Type': 'application/json',},
                body: JSON.stringify({ user, email, subject, message }), 
            });

            
            setUser(""); // clear form after sending message
            setEmail("");
            setSubject("");
            setMessage("");
        
            if (response.ok) {
                alert("Message sent successfully!");
            } else {
                setStatus("Failed to send the message.");
            }
        } catch (error) {
            console.error("Error sending mail:", error);
            setStatus("An error occurred while sending the message.");
        }
    }
//function handleClick() {
   // sendMail();
    console.log('Sending email with:', { user, email, subject, message });
//}

function changeHandler(event) { 
    const input = event.target.value;
    setUser(input);
}

function emailChangeHandler(event) {
    const emailInput = event.target.value;
    setEmail(emailInput);
}

function messageChangeHandler(event) {
    const messageInput = event.target.value;
    setMessage(messageInput);
}

function subjectChangeHandler(event) {
    const subjectInput = event.target.value;
    setSubject(subjectInput);
}

const divStyle = {
    backgroundImage: 'url(imgs/capstone-tarot-bg.jpg)',
    backgroundSize: 'cover', 
    backgroundPosition: 'center',
    height: '100vh', 
    color: 'black', 
};

return (
    <div style={divStyle}>
        <div className="text-yellow-500 py-2 px-10 justify-stretch">
            <MenuNav menuItems={["HOME", "ABOUT", "CONTACT"]} />
            <div className="flex container">
                <h3 className="text-lg ml-0 mt-4 font-mono flex text-yellow-200 hover:text-yellow-500">
                    <TarotIcon />The Daily Tarot App!
                </h3>
            </div>
            <br />
            <div className="flex container">
                <SocialIcons />
                <h3 className="text-lg ml-1 mt-2 font-mono hover:text-yellow-200 font-bold">
                    <a href="https://www.linkedin.com/in/raquel-marie-8856a320b/" target="_blank">Click to Follow Me!</a>
                </h3>
            </div>
            <div className="container ml-auto mr-auto mt-20 font-mono max-w-80 justify-self-center opacity-90 rounded-lg bg-black text-yellow-500">
                <h1 className="text-center text-3xl mt-1 mb-3 ml-3 font-mono font-semibold">Contact Me</h1>
                <p className="mb-5 ml-3 mr-3 font-light text-auto text-gray-300 sm:text-med">Interested in a personal tarot reading? Let me know!</p>
                <form className="justify-self-center px-4 mt-2 ml-auto mr-auto max-w-auto font-semibold">
                    Name
                    <input
                        id="user-name"
                        className="mt-1 ml-10 mb-2 mr-auto text-black flex"
                        type="text"
                        value={user}
                        onChange={changeHandler}
                    />
                    Email
                    <input
                        id="emailAddress"
                        className="mt-1 ml-10 mb-2 mr-auto text-black flex"
                        type="text"
                        value={email}
                        onChange={emailChangeHandler}
                    />
                    Subject
                    <input
                        id="subject"
                        className="mt-1 ml-10 mr-auto mb-2 text-black flex"
                        type="text"
                        value={subject}
                        onChange={subjectChangeHandler}
                    />
                    Message
                    <textarea
                        id="message"
                        className="border-blue-900 mt-1 ml-10 mr-auto mb-2 text-black flex"
                        value={message}
                        onChange={messageChangeHandler}
                    />
                    <button
                        id="send-message-button"
                        className="bg-yellow-500 text-black ml-16 mt-3 mb-4 mr-auto font-serif font-bold px-5 py-2.5 
                        hover:bg-[#F7BE38]/90 focus:ring-4 focus:outline-none focus:ring-[#F7BE38]/50 rounded-lg text-m text-center me-2"
                        type="button"
                        onClick={sendMail}
                    >
                    Send Message
                    </button>
                </form>
                {/* Feedback message */}
                {status && <p className="mt-2 mb-2 text-center">{status}</p>}
            </div>
        </div>
    </div>
);
}