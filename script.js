// Array of 50 questions across five dimensions
const questions = [
    // Economic Dimension (10 questions)
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
    
    // Social Dimension (10 questions)
    { text: "Protecting individual rights is more important than ensuring collective security.", dimension: "social" },
    { text: "The justice system should focus on rehabilitation rather than punishment.", dimension: "social" },
    { text: "Law enforcement needs more oversight to prevent abuse of power.", dimension: "social" },
    { text: "Social welfare programs are essential for fairness in society.", dimension: "social" },
    { text: "Affirmative action is needed to address past injustices.", dimension: "social" },
    { text: "Freedom of speech should have no limits.", dimension: "social" },
    { text: "Recreational marijuana should be legal.", dimension: "social" },
    { text: "Education should be free and publicly funded at all levels.", dimension: "social" },
    { text: "Social media should be regulated by the government.", dimension: "social" },
    { text: "Immigration policies should be open and inclusive.", dimension: "social" },
    
    // Environmental Dimension (10 questions)
    { text: "Climate change should be the top global priority.", dimension: "environmental" },
    { text: "Renewable energy should replace fossil fuels as soon as possible.", dimension: "environmental" },
    { text: "Strict environmental laws are needed to protect nature.", dimension: "environmental" },
    { text: "All economic plans should prioritize sustainability.", dimension: "environmental" },
    { text: "Carbon taxes are a good way to fight climate change.", dimension: "environmental" },
    { text: "Biodiversity loss is an urgent problem.", dimension: "environmental" },
    { text: "GMOs are more helpful than harmful.", dimension: "environmental" },
    { text: "Nuclear energy is key to a clean energy future.", dimension: "environmental" },
    { text: "Global teamwork is vital for environmental issues.", dimension: "environmental" },
    { text: "Economic growth shouldn’t harm the environment.", dimension: "environmental" },
    
    // Foreign Policy Dimension (10 questions)
    { text: "Military action is okay to protect national interests.", dimension: "foreign" },
    { text: "Free trade deals are good for the economy.", dimension: "foreign" },
    { text: "The UN is effective at keeping peace.", dimension: "foreign" },
    { text: "Foreign aid should depend on human rights progress.", dimension: "foreign" },
    { text: "National sovereignty trumps international law.", dimension: "foreign" },
    { text: "Sanctions are a useful foreign policy tool.", dimension: "foreign" },
    { text: "Diplomacy should always come before military action.", dimension: "foreign" },
    { text: "Global issues like climate change need international action.", dimension: "foreign" },
    { text: "Immigration policies should focus on security.", dimension: "foreign" },
    { text: "We should stay out of foreign conflicts.", dimension: "foreign" },
    
    // Governance and Rights Dimension (10 questions)
    { text: "Democracy is the best form of government.", dimension: "governance" },
    { text: "Government should be fully transparent.", dimension: "governance" },
    { text: "Civil liberties must always be protected.", dimension: "governance" },
    { text: "Voting should be required by law.", dimension: "governance" },
    { text: "Judges should be free from political influence.", dimension: "governance" },
    { text: "A free press is critical for democracy.", dimension: "governance" },
    { text: "Surveillance is justified for national security.", dimension: "governance" },
    { text: "Campaigns should be publicly funded to stop corruption.", dimension: "governance" },
    { text: "Local governments should have more power.", dimension: "governance" },
    { text: "Human rights should apply everywhere, no exceptions.", dimension: "governance" }
];

// Define political archetypes with scores and descriptions
const archetypes = [
    {
        name: "Progressive",
        scores: { economic: 0, social: 8, environmental: 8, foreign: 0, governance: 8 },
        description: "You’re all about social justice, environmental care, and personal freedoms. You’re okay with government stepping in to make things fairer and like working with other countries on big issues."
    },
    {
        name: "Conservative",
        scores: { economic: 8, social: -8, environmental: -8, foreign: 8, governance: 0 },
        description: "You value free markets, traditional ways, and a strong defense. You prefer less government in daily life and take a cautious approach to change."
    },
    {
        name: "Libertarian",
        scores: { economic: -8, social: -8, environmental: 0, foreign: -8, governance: -8 },
        description: "Freedom is your top priority—less government, more individual choice. You support free markets and personal rights, and you’re wary of authority."
    },
    {
        name: "Centrist",
        scores: { economic: 0, social: 0, environmental: 0, foreign: 0, governance: 0 },
        description: "You’re in the middle, mixing ideas from all sides. You like balance and practical solutions over extreme positions."
    }
];

// Function to calculate distance between user scores and archetypes
function calculateDistance(userScores, archetypeScores) {
    return Math.sqrt(
        Math.pow(userScores.economic - archetypeScores.economic, 2) +
        Math.pow(userScores.social - archetypeScores.social, 2) +
        Math.pow(userScores.environmental - archetypeScores.environmental, 2) +
        Math.pow(userScores.foreign - archetypeScores.foreign, 2) +
        Math.pow(userScores.governance - archetypeScores.governance, 2)
    );
}

// Logic for test.html: Handle questions and answers
if (document.getElementById('questionContainer')) {
    let currentQuestion = 0;
    let answers = new Array(questions.length).fill(null);

    function displayQuestion() {
        document.getElementById('questionContainer').innerText = questions[currentQuestion].text;
        document.querySelectorAll('input[name="answer"]').forEach(input => {
            input.checked = answers[currentQuestion] === input.value;
        });
    }

    document.getElementById('nextBtn').addEventListener('click', () => {
        const selected = document.querySelector('input[name="answer"]:checked');
        if (selected) {
            answers[currentQuestion] = selected.value;
            if (currentQuestion < questions.length - 1) {
                currentQuestion++;
                displayQuestion();
            } else {
                calculateScores();
            }
        } else {
            alert('Please select an answer.');
        }
    });

    document.getElementById('prevBtn').addEventListener('click', () => {
        if (currentQuestion > 0) {
            currentQuestion--;
            displayQuestion();
        }
    });

    function calculateScores() {
        const scores = {
            economic: 0,
            social: 0,
            environmental: 0,
            foreign: 0,
            governance: 0
        };
        questions.forEach((q, i) => {
            scores[q.dimension] += parseInt(answers[i]);
        });
        for (let dimension in scores) {
            scores[dimension] = (scores[dimension] / 10).toFixed(1); // Normalize to -2 to 2
        }
        const url = `results.html?economic=${scores.economic}&social=${scores.social}&environmental=${scores.environmental}&foreign=${scores.foreign}&governance=${scores.governance}`;
        window.location.href = url;
    }

    displayQuestion();
}

// Logic for results.html: Show chart and archetype
if (document.getElementById('radarChart')) {
    const urlParams = new URLSearchParams(window.location.search);
    const scores = {
        economic: parseFloat(urlParams.get('economic')) || 0,
        social: parseFloat(urlParams.get('social')) || 0,
        environmental: parseFloat(urlParams.get('environmental')) || 0,
        foreign: parseFloat(urlParams.get('foreign')) || 0,
        governance: parseFloat(urlParams.get('governance')) || 0
    };

    let closestArchetype = null;
    let minDistance = Infinity;
    archetypes.forEach(archetype => {
        const distance = calculateDistance(scores, archetype.scores);
        if (distance < minDistance) {
            minDistance = distance;
            closestArchetype = archetype;
        }
    });

    document.getElementById('archetypeName').innerText = `You are a ${closestArchetype.name}!`;
    document.getElementById('archetypeDescription').innerText = closestArchetype.description;

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
                    suggestedMin: -2,
                    suggestedMax: 2
                }
            }
        }
    });
}