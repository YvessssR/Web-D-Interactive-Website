let playerClass = "";

const storyText = document.getElementById("story-text");
const choicesDiv = document.getElementById("choices");
const storyImage = document.getElementById("story-image");

function selectClass(chosenClass) {
    playerClass = chosenClass;
    startGame();
}

const story = {
    start: {
        text: "You wake up in a mystical forest. A path leads left, another right. Which way do you go?",
        image: "images/forest.jpg",
        choices: [
            { text: "Go left", next: "left_path" },
            { text: "Go right", next: "right_path" }
        ]
    },
    left_path: {
        text: "You find an old wizard. He asks if you seek wisdom or power. What do you choose?",
        image: "images/wizard.jpg",
        choices: [
            { text: "Wisdom", next: "wisdom" },
            { text: "Power", next: "power" }
        ]
    },
    right_path: {
        text: "A fierce dragon blocks your way! Do you fight or run?",
        image: "images/dragon.jpg",
        choices: [
            { text: "Fight", next: "fight_dragon" },
            { text: "Run", next: "run_away" }
        ]
    },
    wisdom: {
        text: "The wizard grants you ancient knowledge and sends you on a quest. Solve this riddle: 'I speak without a mouth and hear without ears. I have no body, but I come alive with the wind.' What am I?",
        image: "images/riddle.jpg",
        choices: [
            { text: "Echo", next: "correct_riddle" },
            { text: "Shadow", next: "wrong_riddle" }
        ]
    },
    power: {
        text: "The wizard bestows upon you immense strength but warns of its cost. You must defeat a bandit leader in a duel. What is your strategy?",
        image: "images/bandit.jpg",
        choices: [
            { text: "Overwhelm with brute force", next: "brute_force" },
            { text: "Outmaneuver with skill", next: "skill_duel" }
        ]
    },
    correct_riddle: {
        text: "The wizard is impressed and gifts you a magical artifact. Your wisdom will lead you far.",
        image: "images/artifact.jpg",
        choices: [{ text: "Start New Game", next: "start" }]
    },
    wrong_riddle: {
        text: "The wizard shakes his head. 'You must learn more before proceeding.' You are sent back to the forest.",
        image: "images/forest.jpg",
        choices: [{ text: "Restart", next: "start" }]
    },
    brute_force: {
        text: "You overpower the bandit leader but exhaust yourself in the process. Your journey is uncertain.",
        image: "images/battle.jpg",
        choices: [{ text: "Start New Game", next: "start" }]
    },
    skill_duel: {
        text: "Using wit and agility, you defeat the bandit and gain the people's respect. A new adventure begins!",
        image: "images/victory.jpg",
        choices: [{ text: "Start New Game", next: "start" }]
    },
    fight_dragon: {
        text: "You bravely battle the dragon! What is your tactic?",
        image: "images/dragon_fight.jpg",
        choices: [
            { text: "Aim for the wings", next: "dragon_wings" },
            { text: "Go for the heart", next: "dragon_heart" }
        ]
    },
    run_away: {
        text: "You flee back to the safety of the forest, but your adventure ends in regret.",
        image: "images/forest.jpg",
        choices: [{ text: "Start New Game", next: "start" }]
    },
    dragon_wings: {
        text: "You cripple the dragon's flight and force it to yield. The kingdom is saved!",
        image: "images/dragon_defeated.jpg",
        choices: [{ text: "Start New Game", next: "start" }]
    },
    dragon_heart: {
        text: "Your attack is reckless; the dragon retaliates. Your fate is sealed.",
        image: "images/defeat.jpg",
        choices: [{ text: "Start New Game", next: "start" }]
    }
};

function startGame() {
    showStory("start");
}

function showStory(scene) {
    const currentScene = story[scene];
    storyText.innerText = currentScene.text;
    storyImage.src = currentScene.image;
    choicesDiv.innerHTML = "";
    
    currentScene.choices.forEach(choice => {
        const button = document.createElement("button");
        button.innerText = choice.text;
        button.onclick = () => showStory(choice.next);
        choicesDiv.appendChild(button);
    });
}

startGame();
