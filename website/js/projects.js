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
            id: 'ht6-devducky',
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
        },
        {
            id: 'obsidian-ai',
            title: 'obsidianAI',
            shortDescription: 'RAG app for Obsidian.md notes',
            fullDescription: `
                An Ollama-based RAG app to interact with your Obsidian.md notes.
            `,
            technologies: ['Python', 'Ollama', 'LangChain'],
            writeup: `App is built with LangChain and uses Ollama for model inference. Llama3.1 8B is, by default, the main model.
            The RAG approach is achieved via LangChain and uses GPT4ALL embedding. It defaults to .md files, hence the intended use of Obsidian.md.
            `,
            githubLink: 'https://github.com/sjsaug/obsidianAI'
        },
        {
            id: 'styly',
            title: 'sty.ly',
            shortDescription: 'Your own personal stylist informed on real-time weather.',
            fullDescription: `
                A project I worked on at Ignition Hacks 2024. sty.ly generates outfit recommendations based on real-time weather data.
            `,
            technologies: ['Python', 'Unsloth', 'Ollama', 'A1111SDK', 'Flask'],
            writeup: `I worked on the AI/ML. Shoutout Sean, he solo'd the backend. I used llama3.1 to generate a custom dataset of 30k entries for outfit recommendations based on weather combined over rain, snow and other factors.
            I then trained llama3.1 8B on said dataset using Unsloth @ 375 steps and quantizing it to Q4_K_M. We run the trained model locally to get an outfit recommendation from real-time weather data which we retrieve via a free API. 
            The outfit recommendation is then sent to a locally hosted venv instance of Stable Diffusion via A1111SDK, which generates a model wearing the generated outift. We then encode the generated model into an image and then into Base64, sending it to our database. 
            After the database receives it, it is displayed on our frontend.
            `,
            githubLink: 'https://github.com/sjsaug/Sty.ly'
        },
        {
            id: 'food-fill',
            title: 'Food Fill',
            shortDescription: 'Helping measure all you can eat.',
            fullDescription: `
                A project I worked on at HawkHacks 2024. Food Fill helps you track the food you eat with the help of ML + physical hardware.
            `,
            technologies: ['Python', 'MediaPipe', 'React', 'TailwindCSS', 'TypeScript', 'Neurelo', 'MongoDB'],
            writeup: `Food Fill employs Hooke's Law (F=-kx) and image processing techniques to accurately measure food weight, utilizing MediaPipe object detection for real-time food recognition. 
            The underlying technology includes React, TailwindCSS, TypeScript, Neurelo, and MongoDB.
            `,
            githubLink: 'https://github.com/sjsaug/food-fill'
        },
        {
            id: 'hygiene-hero',
            title: 'Hygiene Hero',
            shortDescription: 'Ending the CS student stereotype.',
            fullDescription: `
                A project I worked on at The GoldenHack 5.0, which ended up winning the hackathon. Hygiene Hero is a game designed to help CS students achieve better hygiene.
            `,
            technologies: ['Python', 'Streamlit', 'PyGame', 'OpenAI'],
            writeup: `I did the AI, Streamlit and save file implementations.
            `,
            githubLink: 'https://github.com/sjsaug/TGH-5.0'
        },
        {
            id: 'money-tracker',
            title: 'Expenses Tracker',
            shortDescription: 'MERN app to track your expenses.',
            fullDescription: `
                A MERN app to track your expenses.
            `,
            technologies: ['MongoDB', 'Express', 'React', 'Node'],
            writeup: `This was my first time using MERN. To be honest, I'm not a huge fan of using complicated stacks like this. I feel like simple HTML, CSS and JS is good enough for most things.
            For example, this personal website (sjsaug.com) was built solely using HTML, CSS and JS. Using MERN was, however, an interesting experience that proved useful for me to grasp the concept of newer web frameworks.
            `,
            githubLink: 'https://github.com/sjsaug/money-tracker'
        },
        {
            id: 'gorillatype',
            title: 'GorillaType',
            shortDescription: 'A MonkeyType clone.',
            fullDescription: `
                A remake of MonkeyType, since I use it so much. You can test it out here: https://codepen.io/sjsaug/full/NWEOQwd
            `,
            technologies: ['HTML', 'CSS', 'JS'],
            writeup: `It was interesting to try and figure out how MonkeyType works. I had experimented creating typing tests in Python before, but Java was new to me at the time.
            The WPM is calculated by taking (Words Completed * 60)/Time Elapsed.
            `,
            githubLink: 'https://github.com/sjsaug/GorillaType'
        },
        {
            id: 'open-translator',
            title: 'OpenTranslator',
            shortDescription: 'Fine-tuned, moderated translator.',
            fullDescription: `
                A GUI-based translator app utilizing fine-tuning and NLP moderation.
            `,
            technologies: ['Python', 'OpenAI', 'ConfigParser'],
            writeup: `First time experimenting with fine-tuning using the OpenAI playground. Also tested the OpenAI Moderation API, which was, now that I look at it, somewhat Agentic.
            This is, given a model judging the response of another model, I wonder if the Moderation API (if it still exists) would be useful in the context of something like Agentic RAG.
            `,
            githubLink: 'https://github.com/sjsaug/OpenTranslator'
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