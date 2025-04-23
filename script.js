// Full list of 50 questions with their dimensions
const questions = [
    // Economic Questions
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
    
    // Social Questions
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
    
    // Environmental Questions
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
    
    // Foreign Policy Questions
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
    
    // Governance and Rights Questions
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

// Test page logic (runs on test.html)
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
            alert('Please select an answer');
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
        // Normalize scores (assuming 10 questions per dimension)
        for (let dimension in scores) {
            scores[dimension] = (scores[dimension] / 10).toFixed(1);
        }
        const url = `results.html?economic=${scores.economic}&social=${scores.social}&environmental=${scores.environmental}&foreign=${scores.foreign}&governance=${scores.governance}`;
        window.location.href = url;
    }

    displayQuestion();
}

// Results page logic (runs on results.html)
if (document.getElementById('radarChart')) {
    const urlParams = new URLSearchParams(window.location.search);
    const scores = {
        economic: parseFloat(urlParams.get('economic')) || 0,
        social: parseFloat(urlParams.get('social')) || 0,
        environmental: parseFloat(urlParams.get('environmental')) || 0,
        foreign: parseFloat(urlParams.get('foreign')) || 0,
        governance: parseFloat(urlParams.get('governance')) || 0
    };

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