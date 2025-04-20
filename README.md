Balance Sheet Analyzer & Tax Estimator (with AI-Powered Chat Assistant)


Problem Statement:
Taxpayers, especially small businesses and freelancers, struggle to understand financial documents like balance sheets, estimate their tax liabilities (like GST, TDS), and find it hard to get quick insights without professional help or advanced tools.

✅ My Approach:
Identified User Pain Point:
Many users don't know how to interpret uploaded balance sheets.
They're unsure about taxes like GST or TDS without help from a professional.
Manual rule-based systems for categorizing transactions are error-prone.

Designed an AI-Integrated System:
Built a web app where users can upload Excel-based balance sheets.
Used a backend parser to extract key financial metrics (like sales, purchases, GST paid/collected).
Passed this data as context to a local LLM (Mistral via Ollama) to allow intelligent, natural-language Q&A.

Built an AI-Powered Chatbot Assistant:
Integrated a chatbot using React on the frontend and FastAPI as the backend.
Used Mistral running locally via Ollama to avoid cloud costs and allow offline capability.
Enabled the chatbot to respond to natural queries like:
“Do I owe any GST this quarter?”
“What is TDS?”
“How much profit did I make?”

Enhanced UX:
Added features like chat history, “Thinking…” spinner, and a collapsible help box.
Ensured real-time interaction with accurate financial summaries and tax insights.

🔧 Tech Stack Used:
Frontend: React.js
Backend: FastAPI (Python)
AI Model: Mistral (via Ollama, running locally)
File Parsing: Custom Excel parser in Python
API Communication: Axios
Middleware: CORS for cross-origin requests
Deployment Ready: Fully local setup, no need for cloud APIs

🧠 How AI Helped:
Instead of manually coding tax rules and calculations, I used a local language model to:

Interpret financial data contextually
Answer personalized tax-related queries
Provide insights based on the user’s actual balance sheet
This reduces manual rule-based logic, improves scalability, and makes the system user-friendly for non-finance professionals.


