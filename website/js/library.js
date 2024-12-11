document.addEventListener('DOMContentLoaded', () => {
    const libraryTableBody = document.getElementById('library-table-body');
    const bookDetailsContainer = document.getElementById('book-details');
    const searchInput = document.getElementById('search-books');
    const statusFilter = document.getElementById('status-filter');

    // book data - TODO: move to mongo or a json
    const booksData = [
        {
            id: '1984',
            title: '1984',
            author: 'George Orwell',
            rating: 4.8,
            genre: 'Dystopian, Science Fiction, Classic',
            status: 'finished',
            notes: [],
            fullDescription: `
              1984 is a dystopian novel written by George Orwell that depicts a grim and totalitarian future where the
          government exercises total control over its citizens. The story follows Winston Smith, a low-ranking member
          of the ruling Party who begins to question the official ideology and rebels against the authority.
            `
        },
        {
            id: 'atomic-habits',
            title: 'Atomic Habits',
            author: 'James Clear',
            rating: 4.7,
            genre: 'Self-Help, Personal Development',
            status: 'finished',
            notes: [],
            fullDescription: `
                A comprehensive guide to building good habits and breaking bad ones, 
                offering practical strategies for personal development.
            `
        },
        {
            id: 'njals-saga',
            title: "Njál's Saga",
            author: 'Anonymous',
            rating: 4.3,
            genre: 'Historical Literature, Icelandic Saga',
            status: 'currently-reading',
            notes: [],
            fullDescription: `
                A classic Icelandic saga from the 13th century, chronicling multiple generations of a complex family feud.
                The narrative explores themes of law, revenge, honor, and the social dynamics of medieval Icelandic society.
                It is renowned for its intricate legal descriptions, complex characters, and profound exploration of human conflict and resolution.
            `
        },
        {
            id: 'ted-talks',
            title: 'The TED Talks Handbook',
            author: 'Chris Anderson, Andrew Stanton',
            rating: 4,
            genre: 'Self-Help, Non-Fiction',
            status: 'finished',
            notes: [],
            fullDescription: `
              The TED Talks Handbook is a book that distills the wisdom of hundreds of TED Talks into actionable
          advice and practical strategies for personal and professional growth. The authors provide insights on how to
          communicate ideas, build confidence, and cultivate creativity.
            `
        },
        {
            id: 'on-disinformation',
            title: 'On Disinformation',
            author: 'Lee McIntyre',
            rating: 4.7,
            genre: 'Non-Fiction, Media Studies',
            status: 'currently-reading',
            notes: [],
            fullDescription: `
                An analytical exploration of the spread and impact of disinformation in modern society.
                The book examines the mechanisms by which false information proliferates and its consequences for public discourse and democracy.
                McIntyre provides insights into the psychological and social factors that contribute to the creation and spread of misinformation.
            `
        },
        {
            id: 'the-last-kingdom',
            title: 'The Last Kingdom',
            author: 'Bernard Cornwell',
            rating: 4.8,
            genre: 'Historical Fiction',
            status: 'finished',
            notes: [],
            fullDescription: `
                The first novel in Bernard Cornwell's acclaimed Saxon Stories, set in 9th-century England during the Viking invasions. 
                The story follows Uhtred of Bebbanburg, a Saxon child captured and raised by Vikings, who becomes torn between the Norse warriors who raised him and the Anglo-Saxon kingdom he was born into.
                As the Vikings threaten to conquer England, Uhtred must navigate complex loyalties and play a crucial role in the formation of a unified English kingdom.
            `
        },
        {
            id: 'the-pale-horseman',
            title: 'The Pale Horseman',
            author: 'Bernard Cornwell',
            rating: 4.7,
            genre: 'Historical Fiction',
            status: 'finished',
            notes: [],
            fullDescription: `
                The second novel in the Saxon Stories series, continuing the saga of Uhtred of Bebbanburg.
                Set during the time of King Alfred's struggle against the Danish invaders, the book follows Uhtred's continued adventures and his role in the defense of Wessex.
                The story explores the tension between the Saxon kingdoms and the Viking raiders, with Uhtred caught between two worlds.
            `
        },
        {
            id: 'the-lords-of-the-north',
            title: 'The Lords of the North',
            author: 'Bernard Cornwell',
            rating: 4.6,
            genre: 'Historical Fiction',
            status: 'finished',
            notes: [],
            fullDescription: `
                The third book in the Saxon Stories series, focusing on Uhtred's adventures in Northumbria.
                After the events of the previous novels, Uhtred seeks revenge and attempts to reclaim his birthright of Bebbanburg.
                The narrative continues to explore the complex political and cultural landscape of Anglo-Saxon England during the Viking Age.
            `
        },
        {
            id: 'animal-farm',
            title: 'Animal Farm',
            author: 'George Orwell',
            rating: 4.9,
            genre: 'Political Allegory, Satire',
            status: 'currently-reading',
            notes: [],
            fullDescription: `
                A powerful allegorical novel critiquing totalitarian regimes and the corruption of revolutionary ideals.
                The story follows a group of farm animals who rebel against their human owners, attempting to create an equal society.
                Through the animals' experience, Orwell explores how power corrupts and revolutionary movements can devolve into oppressive systems.
            `
        },
        {
            id: 'understanding-options',
            title: 'Understanding Options',
            author: 'Michael Sincere',
            rating: 4,
            genre: 'Finance, Investment',
            status: 'currently-reading',
            notes: [],
            fullDescription: `
                A comprehensive guide to understanding options trading for beginners and intermediate investors.
                The book breaks down complex options strategies and provides practical insights into how options markets work.
                Sincere explains key concepts, risk management, and various approaches to options trading in an accessible manner.
            `
        },
        {
            id: 'sword-song',
            title: 'Sword Song',
            author: 'Bernard Cornwell',
            rating: 4.2,
            genre: 'Historical Fiction',
            status: 'finished',
            notes: [],
            fullDescription: `
                The fourth novel in the Saxon Stories, set in the early 9th century.
                Uhtred continues his struggle to protect Wessex and navigate the turbulent political landscape of the time.
                The book delves deeper into the conflicts between the Saxon kingdoms and the Viking invaders, with Uhtred playing a pivotal role.
            `
        },
        {
            id: 'arnold-education-of-a-bodybuilder',
            title: 'Arnold: The Education of a Bodybuilder',
            author: 'Arnold Schwarzenegger',
            rating: 3.8,
            genre: 'Autobiography, Fitness',
            status: 'currently-reading',
            notes: [],
            fullDescription: `
                A memoir detailing Arnold Schwarzenegger's journey from a young bodybuilder in Austria to a world-renowned champion.
                The book combines personal narrative with fitness advice, documenting his training methods, philosophy, and rise to success.
                It provides insights into his early life, bodybuilding career, and the mindset that drove him to become a global icon.
            `
        },
        {
            id: 'the-burning-land',
            title: 'The Burning Land',
            author: 'Bernard Cornwell',
            rating: 5,
            genre: 'Historical Fiction',
            status: 'finished',
            notes: [],
            fullDescription: `
                The fifth book in the Saxon Stories series, continuing Uhtred's epic journey.
                The novel explores further conflicts between the Saxons and the Vikings, with Uhtred's loyalty and skills being tested.
                As the struggle for control of England intensifies, Uhtred must make difficult choices that will shape the future of the kingdom.
            `
        },
        {
            id: 'if-then',
            title: 'If: Then',
            author: 'Matthew de Abaitua',
            rating: 3.9,
            genre: 'Science Fiction',
            status: 'currently-reading',
            notes: [],
            fullDescription: `
                A dystopian novel exploring the implications of artificial intelligence and predictive algorithms in society.
                The story examines the tension between human agency and technological determinism in a near-future world.
                It delves into complex themes of free will, technology, and the potential consequences of algorithmic decision-making.
            `
        },
        {
            id: 'norse-mythology',
            title: 'Norse Mythology',
            author: 'Neil Gaiman',
            rating: 4,
            genre: 'Mythology, Retelling',
            status: 'finished',
            notes: [],
            fullDescription: `
                A contemporary retelling of classic Norse myths, bringing ancient stories to life with Gaiman's distinctive narrative style.
                The book compiles and reimagines legendary tales of Norse gods like Odin, Thor, and Loki, exploring their adventures and conflicts.
                Gaiman provides a accessible and engaging exploration of the rich mythological traditions of the Norse pantheon.
            `
        },
        {
            id: 'death-of-kings',
            title: 'Death of Kings',
            author: 'Bernard Cornwell',
            rating: 4.9,
            genre: 'Historical Fiction',
            status: 'finished',
            notes: [],
            fullDescription: `
                The sixth novel in the Saxon Stories, focusing on the aftermath of King Alfred's reign.
                Uhtred continues to play a crucial role in the defense of Wessex and the unification of England.
                The book explores the political intrigue and military conflicts of the period, with Uhtred's strategic brilliance taking center stage.
            `
        },
        {
            id: 'the-pagan-lord',
            title: 'The Pagan Lord',
            author: 'Bernard Cornwell',
            rating: 5,
            genre: 'Historical Fiction',
            status: 'finished',
            notes: [],
            fullDescription: `
                The seventh book in the Saxon Stories, following Uhtred's continued struggle in a changing England.
                As an aging warrior, Uhtred faces new challenges and seeks to reclaim his ancestral home of Bebbanburg.
                The novel continues to explore themes of loyalty, identity, and the clash of cultures in medieval England.
            `
        },
        {
            id: 'the-empty-throne',
            title: 'The Empty Throne',
            author: 'Bernard Cornwell',
            rating: 4.3,
            genre: 'Historical Fiction',
            status: 'currently-reading',
            notes: [],
            fullDescription: `
                The eighth novel in the Saxon Stories, continuing the epic saga of Uhtred.
                The book focuses on the power struggles and political machinations following the death of previous leaders.
                Uhtred remains a key figure in the ongoing conflicts that will shape the future of England.
            `
        },
        {
            id: 'how-to-win-at-chess',
            title: 'How to Win at Chess',
            author: 'Levi Rozman',
            rating: 4.2,
            genre: 'Non-Fiction, Chess Strategy',
            status: 'finished',
            notes: [],
            fullDescription: `
                A comprehensive guide to chess strategy and improvement written by popular chess content creator Levi Rozman.
                The book offers insights, techniques, and strategies for players looking to enhance their chess skills.
                Covering various aspects of the game, from opening moves to endgame tactics, it provides practical advice for players of different skill levels.
            `
        },
        {
            id: 'beowulf',
            title: 'Beowulf',
            author: 'Unknown',
            rating: 0,
            genre: 'Epic Poetry, Old English Literature',
            status: 'to-read',
            notes: [],
            fullDescription: `
                An ancient Old English epic poem set in Scandinavia, telling the story of the heroic warrior Beowulf.
                The narrative follows Beowulf's battles against the monster Grendel, Grendel's mother, and a fearsome dragon.
                It explores themes of heroism, fate, loyalty, and the complex social structures of Germanic warrior culture.
            `
         },
         {
            id: 'frankenstein',
            title: 'Frankenstein',
            author: 'Mary Shelley',
            rating: 0,
            genre: 'Gothic Fiction, Science Fiction',
            status: 'to-read',
            notes: [],
            fullDescription: `
                A groundbreaking novel exploring the ethical implications of scientific creation and human ambition.
                The story follows Victor Frankenstein, a scientist who creates a sentient creature in an unorthodox scientific experiment.
                It delves into profound questions of responsibility, humanity, isolation, and the consequences of playing god.
            `
         },
         {
            id: 'you-are-not-a-gadget',
            title: 'You Are Not a Gadget',
            author: 'Jaron Lanier',
            rating: 0,
            genre: 'Technology, Social Criticism',
            status: 'to-read',
            notes: [],
            fullDescription: `
                A critical examination of digital culture and the impact of technology on human interaction and identity.
                Lanier explores how digital platforms and design choices fundamentally reshape human behavior and social structures.
                The book offers a provocative critique of web 2.0 technologies and their unintended consequences on creativity and individuality.
            `
         },
         {
            id: 'fahrenheit-451',
            title: 'Fahrenheit 451',
            author: 'Ray Bradbury',
            rating: 0,
            genre: 'Dystopian Fiction, Science Fiction',
            status: 'to-read',
            notes: [],
            fullDescription: `
                A seminal dystopian novel exploring a future society where books are banned and burned by firemen.
                The story follows Guy Montag, a fireman who begins to question the oppressive system of censorship and intellectual suppression.
                Bradbury's work is a powerful meditation on the dangers of anti-intellectualism and the importance of preserving knowledge.
            `
         },
         {
            id: 'the-fire-next-time',
            title: 'The Fire Next Time',
            author: 'James Baldwin',
            rating: 0,
            genre: 'Non-Fiction, Civil Rights',
            status: 'to-read',
            notes: [],
            fullDescription: `
                A seminal work examining race relations in the United States through two powerful essays.
                Baldwin provides a deeply personal and prophetic analysis of the African American experience and the ongoing struggle for racial justice.
                The book offers a searing critique of racism and a call for radical understanding and social transformation.
            `
         },
    ];

    // render books as a table
    function renderBooksTable(books) {
        libraryTableBody.innerHTML = books.map(book => `
            <tr class="book-row" data-book-id="${book.id}">
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td>${book.rating}/5</td>
                <td>${book.genre}</td>
                <td>
                    <span class="status ${book.status.toLowerCase()}">
                        ${formatStatus(book.status)}
                    </span>
                </td>
            </tr>
        `).join('');

        // add click event listeners to book rows
        document.querySelectorAll('.book-row').forEach(row => {
            row.addEventListener('click', () => {
                const bookId = row.dataset.bookId;
                showBookDetails(bookId);
            });
        });
    }

    // format status for display
    function formatStatus(status) {
        switch(status) {
            case 'finished': return '✓ Finished';
            case 'currently-reading': return '📖 Reading';
            case 'to-read': return '📚 To Read';
            default: return status;
        }
    }

    // sorting function
    function sortBooks(books, column, direction = 'asc') {
        return books.sort((a, b) => {
            let comparison = 0;
            if (a[column] < b[column]) comparison = -1;
            if (a[column] > b[column]) comparison = 1;
            return direction === 'asc' ? comparison : -comparison;
        });
    }

    // filtering and searching
    function filterAndSearchBooks() {
        let filteredBooks = [...booksData];
        
        // status filter
        const statusValue = statusFilter.value;
        if (statusValue) {
            filteredBooks = filteredBooks.filter(book => book.status === statusValue);
        }

        // search filter
        const searchTerm = searchInput.value.toLowerCase();
        if (searchTerm) {
            filteredBooks = filteredBooks.filter(book => 
                book.title.toLowerCase().includes(searchTerm) ||
                book.author.toLowerCase().includes(searchTerm) ||
                book.genre.toLowerCase().includes(searchTerm)
            );
        }

        renderBooksTable(filteredBooks);
    }

    // display book details
    function showBookDetails(bookId) {
        const book = booksData.find(b => b.id === bookId);
        
        if (book) {
            document.getElementById('library-table-container').style.display = 'none';
            bookDetailsContainer.style.display = 'block';
            
            bookDetailsContainer.innerHTML = `
                <button id="back-to-books" class="back-button">← Back to Books</button>
                
                <h2>${book.title}</h2>
                <h3>${book.author}</h3>
                
                <div class="book-overview">
                    <div class="book-meta">
                        <p>Rating: ${book.rating}/5</p>
                        <p>Genre: ${book.genre}</p>
                        <p>Status: 
                            <span class="status ${book.status.toLowerCase()}">
                                ${formatStatus(book.status)}
                            </span>
                        </p>
                    </div>
                    
                    <div class="book-description">
                        <h3>Description</h3>
                        <p>${book.fullDescription}</p>
                    </div>
                    
                    ${book.notes.length > 0 ? `
                    <div class="book-notes">
                        <h3>Notes</h3>
                        <details>
                            <summary>View Book Notes (${book.notes.length} notes)</summary>
                            <ul>
                                ${book.notes.map(note => `
                                    <li>
                                        <a href="notes/${note.filename}" target="_blank">
                                            ${note.title}
                                        </a>
                                    </li>
                                `).join('')}
                            </ul>
                        </details>
                    </div>
                    ` : ''}
                </div>
            `;

            // add back to books event listener
            document.getElementById('back-to-books').addEventListener('click', () => {
                document.getElementById('library-table-container').style.display = 'block';
                bookDetailsContainer.style.display = 'none';
            });
        }
    }

    // init render
    renderBooksTable(booksData);

    // sorting event listeners
    document.querySelectorAll('#library-table thead th[data-sort]').forEach(th => {
        th.addEventListener('click', () => {
            const column = th.dataset.sort;
            const currentDirection = th.dataset.direction || 'asc';
            const newDirection = currentDirection === 'asc' ? 'desc' : 'asc';
            
            document.querySelectorAll('#library-table thead th[data-sort]').forEach(header => {
                const originalText = header.textContent.replace(/[▲▼↕]/g, '').trim();
                header.textContent = originalText + '↕';
                delete header.dataset.direction;
            });
            
            const originalText = th.textContent.replace(/[▲▼↕]/g, '').trim();
            th.textContent = originalText + (newDirection === 'asc' ? '▲' : '▼');
            th.dataset.direction = newDirection;

            // Sort and render
            const sortedBooks = sortBooks([...booksData], column, newDirection);
            renderBooksTable(sortedBooks);
        });
    });

    statusFilter.addEventListener('change', filterAndSearchBooks);
    searchInput.addEventListener('input', filterAndSearchBooks);
});