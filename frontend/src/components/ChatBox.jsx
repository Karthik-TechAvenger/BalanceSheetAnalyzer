import React, { useState } from "react";
import axios from "axios";
import "./ChatBox.css";

function ChatBox({ context }) {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false); // State to toggle chat visibility

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = { sender: "user", text: message };
    setChatHistory((prev) => [...prev, userMessage]);
    setMessage("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:11434/api/generate", {
        model: "mistral", // or llama2, llama3, etc.
        prompt: `${
          typeof context === "string" ? context + "\n" : ""
        }${message}`,
        stream: false,
      });

      const aiMessage = { sender: "ai", text: res.data.response };
      setChatHistory((prev) => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage = {
        sender: "ai",
        text: "⚠️ AI failed to respond. Please check Ollama is running.",
      };
      setChatHistory((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const toggleChat = () => {
    setIsChatOpen((prev) => !prev); // Toggle the visibility of the chatbox
  };

  return (
    <div>
      {/* Help Button (Only visible when the chat is closed) */}
      {!isChatOpen && (
        <button className="help-button" onClick={toggleChat}>
          Help
        </button>
      )}

      {/* Chat Box */}
      {isChatOpen && (
        <div className="chat-box">
          <h3>Hey, I am your balance sheet assistant!</h3>

          <div className="chat-history">
            {chatHistory.map((msg, idx) => (
              <div key={idx} className={`chat-message ${msg.sender}`}>
                <strong>{msg.sender === "user" ? "You" : "AI"}:</strong>{" "}
                {msg.text}
              </div>
            ))}
            {loading && <div className="chat-message ai">🧠 Thinking...</div>}
          </div>

          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask me anything about your balance sheet..."
          />
          <br />
          <button onClick={sendMessage} disabled={loading}>
            Ask
          </button>
        </div>
      )}
    </div>
  );
}

export default ChatBox;
