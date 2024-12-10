document.addEventListener('DOMContentLoaded', () => {
    const projectsGrid = document.getElementById('projects-grid');
    const projectDetailsContainer = document.getElementById('project-details');

    // project data. TODO 1. move to mongo 2. fix template literals
    const projectsData = [
        {
            id: 'digit-recognizer',
            title: 'DRNN',
            shortDescription: 'A Neural Network made with pure Linear Algebra + Numpy.',
            fullDescription: `
                A Neural Network for Digit Recognition (DR) created with pure Linear Algebra and Numpy - no DL frameworks used. 
                Trained to detect handwritten digits with rel-high, realtime accuracy stats.
            `,
            technologies: ['Python', 'Numpy', 'Pandas', 'Matplotlib'],
            writeup: `
                Upon testing: An M2 Pro 16GB shows 10 iterations/second when n < 100, which slows to 10 iterations per 1.5 seconds when n > 100 due to a noticeable temperature increase with n+.
                A Watercooled 5700X3D + 3090 + 64GB @ 3600 shows 10 iterations per 1.2 seconds, consistent performance (tested as high as n=2500) due to stable temperature as n+.
            `,
            githubLink: 'https://github.com/sjsaug/digit-recognizer-neural-net'
        },
        {
            id: 'ht6',
            title: 'devDucky',
            shortDescription: 'An integrated IDE that does more than hold your code.',
            fullDescription: `
                A project I worked on at HackThe6ix 2024. devDucky is an integrated IDE that does more than hold your code.
            `,
            technologies: ['Python', 'Unsloth', 'Ollama', 'Express', 'Node', 'Vite', 'Flask', 'Mongoose'],
            writeup: `I worked on the AI/ML aspect of the project. I used Unsloth to fine-tune and quantize our model, fine-tuned three different models (llama3.1 @ 375 steps, tinyllama @ 1 epoch, phi3 @ 375 steps), finally settling on phi3 due to hardware constraints. I quantized all of the models to Q4_K_M.
            I used the Ollama Python library along with the Ollama cli and desktop instance to run inferences on the models.
            `,
            githubLink: 'https://github.com/sjsaug/devDucky2024'
        }
    ];

    // render project cards
    function renderProjectCards() {
        projectsGrid.innerHTML = projectsData.map(project => `
            <div class="project-card" data-project-id="${project.id}">
                <h3>${project.title}</h3>
                <p>${project.shortDescription}</p>
            </div>
        `).join('');

        // add click event listeners to project cards
        projectsGrid.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('click', () => {
                const projectId = card.dataset.projectId;
                showProjectDetails(projectId);
            });
        });
    }

    // display project details
    function showProjectDetails(projectId) {
        const project = projectsData.find(p => p.id === projectId);
        
        if (project) {
            projectsGrid.style.display = 'none';
            projectDetailsContainer.style.display = 'block';
            
            projectDetailsContainer.innerHTML = `
                <button id="back-to-projects" class="back-button">← Back to Projects</button>
                
                <h2>${project.title}</h2>
                <p class="project-description">${project.fullDescription}</p>
                
                <div class="project-tech">
                    <h3>Technologies</h3>
                    <ul>
                        ${project.technologies.map(tech => `<li>${tech}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="project-challenges">
                    <h3>Write Up</h3>
                    <p>${project.writeup}</p>
                </div>
                
                ${project.githubLink ? `
                    <a href="${project.githubLink}" target="_blank" class="github-link">
                        View on GitHub
                    </a>
                ` : ''}
            `;

            // add back to projects event listener
            document.getElementById('back-to-projects').addEventListener('click', () => {
                projectsGrid.style.display = 'grid';
                projectDetailsContainer.style.display = 'none';
            });
        }
    }

    renderProjectCards();
});