let page = 1;

const db = "http://localhost:3000/monsters"

getMonsters()

function getMonsters() {
    fetch(`${db}/?_limit=50&_page=${page}`)
    .then(response => response.json())
    .then(data => display(data));
} 

function display(data) {
    const monsterContainer = document.querySelector('#monster-container')
    monsterContainer.innerHTML = ""

    data.forEach(element => {
        const newMonster = document.createElement('div')
        const name = document.createElement('h2')
        const age = document.createElement('h4')
        const description = document.createElement('p')
        name.textContent = element.name
        age.textContent = `Age: ${element.age}`
        description.textContent = `Bio: ${element.description}`
        newMonster.appendChild(name)
        newMonster.appendChild(age)
        newMonster.appendChild(description)
        monsterContainer.appendChild(newMonster)
    });    
}

function createMonster() {
    const newMonster = document.createElement('div')
    const name = document.createElement('h2')
    const age = document.createElement('h4')
    const description = document.createElement('p')
    newMonster.appendChild(name, age, description)
}

document.addEventListener('DOMContentLoaded', () => {
    addMonster()
    forward()
    back()
})

function forward() {
    document.querySelector('#forward').addEventListener('click', () => {
        page++
        getMonsters()
    })
} 

function back() {
    document.querySelector('#back').addEventListener('click', () => {
        page--
        getMonsters()
        if(page === 0){
            alert('Aint no monsters here')
            page = 1
        }
    })
}

function addMonster() {
    const createMonster = document.querySelector('#create-monster')
    const monsterForm = document.createElement('form')
    monsterForm.id = 'monster-form'
    monsterForm.innerHTML = `
        <input id="name" placeholder="name...">
        <input id="age" placeholder="age...">
        <input id="description" placeholder="description...">
        <button>Create</button>
    `
    createMonster.appendChild(monsterForm)
    monsterForm.addEventListener('submit', newMonster)
}

function newMonster(event) {
    event.preventDefault();
    const form = document.querySelector('form')
    const monster = {
        name: event.target[0].value,
        age: event.target[1].value,
        description: event.target[2].value
    }
    console.log(monster)

    fetch(db, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(monster)
    })

    form.reset()
}