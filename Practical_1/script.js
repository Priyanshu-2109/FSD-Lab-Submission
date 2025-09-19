// Vote tracking object
const votes = {
    JavaScript: 0,
    Python: 0,
    Java: 0
};

// Function to handle voting
function vote(language) {
    votes[language]++;
    updateVotes();
}

// Function to update the displayed vote counts and progress bars
function updateVotes() {
    const totalVotes = votes.JavaScript + votes.Python + votes.Java;

    // Update vote counts
    document.getElementById('javascript-votes').textContent = votes.JavaScript;
    document.getElementById('python-votes').textContent = votes.Python;
    document.getElementById('java-votes').textContent = votes.Java;
    document.getElementById('total-votes').textContent = totalVotes;

    // Update progress bars
    if (totalVotes > 0) {
        const jsPercentage = (votes.JavaScript / totalVotes) * 100;
        const pythonPercentage = (votes.Python / totalVotes) * 100;
        const javaPercentage = (votes.Java / totalVotes) * 100;

        document.getElementById('javascript-bar').style.width = jsPercentage + '%';
        document.getElementById('python-bar').style.width = pythonPercentage + '%';
        document.getElementById('java-bar').style.width = javaPercentage + '%';
    } else {
        document.getElementById('javascript-bar').style.width = '0%';
        document.getElementById('python-bar').style.width = '0%';
        document.getElementById('java-bar').style.width = '0%';
    }
}

// Initialize the voting system
function initializeVotingSystem() {
    updateVotes();
}

// Function to reset all votes
function resetVotes() {
    votes.JavaScript = 0;
    votes.Python = 0;
    votes.Java = 0;
    updateVotes();
}

// Start the system when the page loads
document.addEventListener('DOMContentLoaded', initializeVotingSystem);