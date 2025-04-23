// Define the questions array with all 50 questions
const questions = [
    { text: "The government should provide healthcare for all citizens.", dimension: "economic" },
    { text: "Progressive taxation is a fair way to fund government services.", dimension: "economic" },
    { text: "A minimum wage is necessary to ensure fair compensation.", dimension: "economic" },
    { text: "Government regulation is essential for a functioning economy.", dimension: "economic" },
    { text: "The government should intervene to save failing industries.", dimension: "economic" },
    { text: "Free trade agreements benefit the national economy.", dimension: "economic" },
    { text: "A wealth tax is an effective way to reduce inequality.", dimension: "economic" },
    { text: "Income inequality is a significant issue that needs addressing.", dimension: "economic" },
    { text: "Government subsidies for industries are beneficial.", dimension: "economic" },
    { text: "Privatizing public services improves efficiency.", dimension: "economic" },
    { text: "Protecting individual rights is more important than ensuring collective security.", dimension: "social" },
    { text: "The primary goal of the justice system should be rehabilitation rather than punishment.", dimension: "social" },
    { text: "Law enforcement agencies require increased oversight to prevent abuse of power.", dimension: "social" },
    { text: "Social welfare programs are crucial for maintaining social equity.", dimension: "social" },
    { text: "Affirmative action policies are necessary to correct historical injustices.", dimension: "social" },
    { text: "Freedom of speech should be absolute, without any restrictions.", dimension: "social" },
    { text: "The use of recreational drugs should be decriminalized.", dimension: "social" },
    { text: "Education at all levels should be publicly funded and free for citizens.", dimension: "social" },
    { text: "Social media platforms should be subject to government regulation.", dimension: "social" },
    { text: "Immigration policies should prioritize inclusivity and diversity.", dimension: "social" },
    { text: "Addressing climate change should be the top priority for global policy.", dimension: "environmental" },
    { text: "Investment in renewable energy should take precedence over fossil fuel development.", dimension: "environmental" },
    { text: "Strict environmental regulations are necessary to preserve natural resources.", dimension: "environmental" },
    { text: "Sustainable development should be integrated into all economic planning.", dimension: "environmental" },
    { text: "Implementing carbon taxes is an effective strategy to combat climate change.", dimension: "environmental" },
    { text: "The loss of biodiversity is a critical issue requiring immediate action.", dimension: "environmental" },
    { text: "Genetically modified organisms (GMOs) offer more benefits than risks.", dimension: "environmental" },
    { text: "Nuclear energy is a necessary component of a clean energy future.", dimension: "environmental" },
    { text: "International cooperation is essential to address environmental challenges.", dimension: "environmental" },
    { text: "Economic growth should be pursued only if it does not harm the environment.", dimension: "environmental" },
    { text: "Military intervention can be justified to protect national interests.", dimension: "foreign" },
    { text: "Free trade agreements generally have a positive impact on the economy.", dimension: "foreign" },
    { text: "International organizations like the UN are effective in promoting peace.", dimension: "foreign" },
    { text: "Foreign aid should be tied to human rights improvements in recipient countries.", dimension: "foreign" },
    { text: "National sovereignty should be respected even when it conflicts with international law.", dimension: "foreign" },
    { text: "Economic sanctions are a useful tool for achieving foreign policy goals.", dimension: "foreign" },
    { text: "Diplomatic solutions should always be exhausted before military action.", dimension: "foreign" },
    { text: "Global challenges like climate change require coordinated international efforts.", dimension: "foreign" },
    { text: "Immigration policies should prioritize national security.", dimension: "foreign" },
    { text: "The country should avoid involvement in foreign conflicts whenever possible.", dimension: "foreign" },
    { text: "Democracy is the most effective system of governance.", dimension: "governance" },
    { text: "Government operations should be fully transparent to ensure accountability.", dimension: "governance" },
    { text: "Civil liberties must be protected under all circumstances.", dimension: "governance" },
    { text: "Voting in elections should be a mandatory civic duty.", dimension: "governance" },
    { text: "The judicial branch should operate independently from political pressures.", dimension: "governance" },
    { text: "A free and independent press is essential for democracy.", dimension: "governance" },
    { text: "Government surveillance programs are necessary for national security.", dimension: "governance" },
    { text: "Political campaigns should be publicly funded to reduce corruption.", dimension: "governance" },
    { text: "Decentralizing power to local governments improves governance.", dimension: "governance" },
    { text: "Human rights standards should be universally applied without exceptions.", dimension: "governance" }
];

// Initialize variables
let currentQuestionIndex = 0;
let userAnswers = new Array(50).fill(null);

// Function to display the current question
function displayQuestion() {
    const question = questions[currentQuestionIndex];
    document.getElementById('questionText').textContent = `Question ${currentQuestionIndex + 1}: ${question.text}`;
    document.getElementById('progress').textContent = `Question ${currentQuestionIndex + 1} of 50`;
    const answer = userAnswers[currentQuestionIndex];
    if (answer !== null) {
        document.querySelector(`input[name="answer"][value="${answer}"]`).checked = true;
    } else {
        document.querySelectorAll('input[name="answer"]').forEach(input => input.checked = false);
    }
    document.getElementById('prevBtn').disabled = currentQuestionIndex === 0;
    document.getElementById('nextBtn').textContent = currentQuestionIndex === 49 ? 'Submit' : 'Next';
}

// Function to calculate scores and redirect
function calculateScores() {
    let scores = {
        economic: 0,
        social: 0,
        environmental: 0,
        foreign: 0,
        governance: 0
    };
    questions.forEach((question, index) => {
        scores[question.dimension] += parseInt(userAnswers[index]);
    });
    for (let dimension in scores) {
        scores[dimension] = (scores[dimension] / 10) * 5; // Normalize to -10 to +10
    }
    window.location.href = `results.html?economic=${scores.economic}&social=${scores.social}&environmental=${scores.environmental}&foreign=${scores.foreign}&governance=${scores.governance}`;
}

// Event listener for Next button
document.getElementById('nextBtn').addEventListener('click', function() {
    const selected = document.querySelector('input[name="answer"]:checked');
    if (!selected) {
        alert('Please select an answer before proceeding.');
        return;
    }
    userAnswers[currentQuestionIndex] = selected.value;
    if (currentQuestionIndex < 49) {
        currentQuestionIndex++;
        displayQuestion();
    } else {
        calculateScores();
    }
});

// Event listener for Previous button
document.getElementById('prevBtn').addEventListener('click', function() {
    const selected = document.querySelector('input[name="answer"]:checked');
    if (selected) {
        userAnswers[currentQuestionIndex] = selected.value;
    }
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        displayQuestion();
    }
});

// Initialize the test by displaying the first question
displayQuestion();

// Display results on results.html (unchanged from original)
if (document.getElementById('radarChart')) {
    const urlParams = new URLSearchParams(window.location.search);
    const scores = {
        economic: parseFloat(urlParams.get('economic')),
        social: parseFloat(urlParams.get('social')),
        environmental: parseFloat(urlParams.get('environmental')),
        foreign: parseFloat(urlParams.get('foreign')),
        governance: parseFloat(urlParams.get('governance'))
    };

    document.getElementById('results').innerHTML = `
        <p><strong>Economic Policy:</strong> ${scores.economic.toFixed(1)}</p>
        <p><strong>Social Policy:</strong> ${scores.social.toFixed(1)}</p>
        <p><strong>Environmental Policy:</strong> ${scores.environmental.toFixed(1)}</p>
        <p><strong>Foreign Policy:</strong> ${scores.foreign.toFixed(1)}</p>
        <p><strong>Governance and Rights:</strong> ${scores.governance.toFixed(1)}</p>
    `;

    const ctx = document.getElementById('radarChart').getContext('2d');
    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['Economic Policy', 'Social Policy', 'Environmental Policy', 'Foreign Policy', 'Governance and Rights'],
            datasets: [{
                label: 'Your Scores',
                data: [scores.economic, scores.social, scores.environmental, scores.foreign, scores.governance],
                backgroundColor: 'rgba(0, 123, 255, 0.2)',
                borderColor: 'rgba(0, 123, 255, 1)',
                pointBackgroundColor: 'rgba(0, 123, 255, 1)'
            }]
        },
        options: {
            scales: {
                r: {
                    angleLines: { display: true },
                    suggestedMin: -10,
                    suggestedMax: 10
                }
            }
        }
    });
}