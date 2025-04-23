// Handle form submission on test.html
if (document.getElementById('testForm')) {
    document.getElementById('testForm').addEventListener('submit', function(e) {
        e.preventDefault();

        // Collect user answers
        const formData = new FormData(this);
        let scores = {
            economic: 0,
            social: 0,
            environmental: 0,
            foreign: 0,
            governance: 0
        };

        // Define which questions belong to which dimension
        const dimensions = {
            economic: ['q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7', 'q8', 'q9', 'q10'],
            social: ['q11', 'q12', 'q13', 'q14', 'q15', 'q16', 'q17', 'q18', 'q19', 'q20'],
            environmental: ['q21', 'q22', 'q23', 'q24', 'q25', 'q26', 'q27', 'q28', 'q29', 'q30'],
            foreign: ['q31', 'q32', 'q33', 'q34', 'q35', 'q36', 'q37', 'q38', 'q39', 'q40'],
            governance: ['q41', 'q42', 'q43', 'q44', 'q45', 'q46', 'q47', 'q48', 'q49', 'q50']
        };

        // Calculate scores for each dimension
        for (let dimension in dimensions) {
            dimensions[dimension].forEach(question => {
                scores[dimension] += parseInt(formData.get(question));
            });
            // Normalize scores to a range of -10 to +10
            scores[dimension] = (scores[dimension] / 10) * 5; // Adjust based on 10 questions per dimension
        }

        // Redirect to results page with scores in URL
        window.location.href = `results.html?economic=${scores.economic}&social=${scores.social}&environmental=${scores.environmental}&foreign=${scores.foreign}&governance=${scores.governance}`;
    });
}

// Display results on results.html
if (document.getElementById('radarChart')) {
    const urlParams = new URLSearchParams(window.location.search);
    const scores = {
        economic: parseFloat(urlParams.get('economic')),
        social: parseFloat(urlParams.get('social')),
        environmental: parseFloat(urlParams.get('environmental')),
        foreign: parseFloat(urlParams.get('foreign')),
        governance: parseFloat(urlParams.get('governance'))
    };

    // Display detailed scores
    document.getElementById('results').innerHTML = `
        <p><strong>Economic Policy:</strong> ${scores.economic.toFixed(1)}</p>
        <p><strong>Social Policy:</strong> ${scores.social.toFixed(1)}</p>
        <p><strong>Environmental Policy:</strong> ${scores.environmental.toFixed(1)}</p>
        <p><strong>Foreign Policy:</strong> ${scores.foreign.toFixed(1)}</p>
        <p><strong>Governance and Rights:</strong> ${scores.governance.toFixed(1)}</p>
    `;

    // Create the radar chart
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