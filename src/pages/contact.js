import { useState } from "react";
import MenuNav from '../components/menu-nav';
import TarotIcon from "@/components/tarot-icon";


export default function ContactPage() {
    const [user, setUser] = useState("");
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState("");

    async function sendMail() {
        try {
            const response = await fetch(`/api/email?user=${user}&emailAddress=${email}&subject=${subject}&message=${message}`);
            
            setUser("");
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
    
    function handleClick() {
        sendMail();
        console.log('Sending email with:', { user, email, subject, message });
    }

    function changeHandler(event) {
        const input = event.target.value;
        console.log(event);
        setUser(input);
    }

    function emailChangeHandler(event) {
        console.log(event);
        const emailInput = event.target.value;
        setEmail(emailInput);
    }

    function messageChangeHandler(event) {
        console.log(event);
        const messageInput = event.target.value;
        setMessage(messageInput);
    }
    
    function subjectChangeHandler(event) {
        console.log(event);
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
            <div className= "text-yellow-500 py-2 px-10 justify-stretch">
            <MenuNav menuItems={["HOME",  "ABOUT", "CONTACT"]} />
                <div className="flex container">
                <TarotIcon /><h3 className="ml-0 mt-0 font-mono hover:text-yellow-200">The Daily Tarot App!</h3>
                </div>
                <div className="container max-w-xl justify-self-center opacity-90 bg-black text-yellow-500 mt-20 mx-auto font-mono">
                    <h1 className="text-3xl mt-1 mb-3 ml-3 font-semibold">Contact Me</h1>
                        <form className="justify-self-center max-w-auto">
                        Name:<input id="user-name" className="px-1 ml-1 mb-2 text-black flex" type="text" value={user} 
                        onChange={changeHandler} /> 

                        Email:<input id="emailAddress" className="px-1 ml-1 mb-2 text-black flex" type="text" value={email}
                        onChange={emailChangeHandler} />

                        Subject: <input id="subject" className="px-1 ml-1 mb-2 text-black flex" type="text" value={subject} 
                        onChange={subjectChangeHandler} />
            
                        Message: <textarea id="message" className="border-blue-900 px-2 ml-1 mb-1 text-black flex" value={message} 
                        type="text" onChange={messageChangeHandler} /> 

                            <button id="send-message-button" className="bg-yellow-500 text-black mt-3 mb-4 mx-auto font-bold px-5 
                            py-2.5 hover:bg-[#F7BE38]/90 focus:ring-4 focus:outline-none focus:ring-[#F7BE38]/50 rounded-lg 
                            text-m text-center me-2 ml-2" 
                            type="button" onClick={handleClick}> Send Message 
                            </button>

                        </form>
                        {/* Feedback message */}
                        {status && <p className="mt-2 mb-2 text-center">{status}</p>}

                </div>
    
            </div>
        </div>

)
}