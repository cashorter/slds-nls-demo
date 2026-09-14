async function runSearch() {
  const queryInput = document.getElementById('query');
  const resultBox = document.getElementById('result');
  const query = queryInput.value.trim();

  if (!query) {
    resultBox.textContent = 'Enter a question to continue.';
    return;
  }

  resultBox.textContent = 'Loading...';

  try {
    const res = await fetch('/api/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query })
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data?.error || 'Request failed.');
    }

    resultBox.textContent = data?.answer || 'No answer found.';
  } catch (err) {
    resultBox.textContent = 'Unable to complete the request. Please try again.';
    console.error(err);
  }
}
