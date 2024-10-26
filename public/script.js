async function getAnswer() {
    const symptoms = document.getElementById("inputBox").value;
    const outputDiv = document.getElementById("output");

    if (!symptoms) {
        alert("Please describe your symptoms!");
        return;
    }

    outputDiv.innerText = "Analyzing symptoms...";

    try {
        const response = await fetch("/api/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ question: symptoms })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.details || 'Failed to analyze symptoms');
        }

        const data = await response.json();
        
        // Format the response with some basic HTML
        outputDiv.innerHTML = data.completion
            .split('\n')
            .filter(line => line.trim())
            .join('<br>');

    } catch (error) {
        outputDiv.innerText = `Error: ${error.message}`;
        console.error("Error:", error);
    }
}