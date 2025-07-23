
const GEMINI_API_KEY = 'YOUR_GEMINI_API_KEY_HERE'; // <-- Replace with your key
const useMockResults = false;

async function runSearch() {
  const query = document.getElementById("query").value;
  const resultBox = document.getElementById("result");
  resultBox.innerHTML = "<em>Loading...</em>";

  if (useMockResults) {
    setTimeout(() => {
      resultBox.innerHTML = "Mock result: Graduation rates increased by 6% in northern districts in 2023.";
    }, 1000);
    return;
  }

  try {
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: query }] }]
      })
    });

    const data = await res.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "No answer found.";
    resultBox.innerHTML = text;
  } catch (err) {
    resultBox.innerHTML = "Error fetching response. Please try again.";
    console.error(err);
  }
}
