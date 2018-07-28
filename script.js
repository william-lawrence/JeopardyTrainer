/**
 * Get a template DOM object from the DOM and return a usable DOM object
 * from the main node within it. Assumes that there is only one main parent
 * node in the template.
 * 
 * @param {string} id the id of the template element
 * @returns {Object} a deep clone of the templated element
 */
function getElementFromTemplate(id) {
    let domNode = document.importNode(document.getElementById(id).content, true).firstElementChild;

    return domNode;
}

// wait till the DOM is loaded to add JS content.
document.addEventListener('DOMContentLoaded', () => {

    // listen for a click on the get question button and gets the question.
    document.querySelector('button#start').addEventListener('click', (event) => {
        event.preventDefault();
        const newQuestion = getNewQuestion();
    });
});

let question;
let score = 0; // this variable keeps track of the score as the number of the questions answered correctly.

/**
 * Gets a jeopardy question using the jservice API.
 */
function getNewQuestion() {
    const url = 'http://jservice.io/api/random';
    const settings = {
        method: 'GET'
    };

    fetch(url, settings)
        .then(response => response.json())
        .then(json => {
            console.log(json);
            addQuestionToPage(json);
            addEventHandlersForNewQuestion();
        });
}


/**
 * Adds the question called from the API to the page.
 * @param {Object} question the question to be added to the page.
 */
function addQuestionToPage(question) {
    console.log('Adding question to page.');

    // Creates a copy of the question template.
    const questionTemplate = getElementFromTemplate('question-template');

    // Reveals the score.
    const p = document.querySelector('h2#score');
    p.classList.remove('hidden')

    // Hides the start button.
    document.querySelector('button#start').classList.add('hidden');

    // Sets ths text of the question
    questionTemplate.querySelector('p.question-text').innerText = `${question[0].question}`;
    questionTemplate.querySelector('p.difficulty').innerText = `Difficulty: ${question[0].value}`;
    questionTemplate.querySelector('p.category').innerText = `Category: ${question[0].category.title}`;
    questionTemplate.querySelector('p.answer-text').innerText = `${question[0].answer}`; 

    document.querySelector('div#question').insertAdjacentElement('beforebegin', questionTemplate);
}

function addEventHandlersForNewQuestion() {
    document.querySelector('button#show-answer').addEventListener('click', (event) => {
        event.currentTarget.parentNode.classList.add('hidden');
        event.currentTarget.parentNode.nextElementSibling.classList.remove('hidden');
    });
}
