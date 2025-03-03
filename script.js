let playerClass = "";

const storyText = document.getElementById("story-text");
const choicesDiv = document.getElementById("choices");
const storyImage = document.getElementById("story-image");

// Start screen with class selection
function showClassSelection() {
    storyText.innerText = "Choose your class:";
    storyImage.src = "images/class_selection.jpg"; // Add an image for class selection
    choicesDiv.innerHTML = "";

    const classes = ["Warrior", "Mage", "Healer", "Archer"];
    classes.forEach(className => {
        const button = document.createElement("button");
        button.innerText = className;
        button.onclick = () => selectClass(className.toLowerCase());
        choicesDiv.appendChild(button);
    });
}

// Set player class and start the game
function selectClass(chosenClass) {
    playerClass = chosenClass;
    startGame();
}

// Story structure
const story = {
    warrior_start: {
        text: "You are a fearless warrior. You arrive at a crossroads: A dark cave or a mountain pass?",
        image: "images/crossroads.jpg",
        choices: [
            { text: "Enter the cave", next: "warrior_cave" },
            { text: "Climb the mountain", next: "warrior_mountain" }
        ]
    },
    warrior_cave: {
        text: "Inside the cave, you see a sleeping beast. Do you fight or sneak past?",
        image: "images/beast.jpg",
        choices: [
            { text: "Fight", next: "warrior_fight_beast" },
            { text: "Sneak past", next: "warrior_sneak" }
        ]
    },
    warrior_mountain: {
        text: "As you climb, a rockslide begins. Do you jump to a ledge or brace for impact?",
        image: "images/mountain.jpg",
        choices: [
            { text: "Jump to ledge", next: "warrior_safe" },
            { text: "Brace for impact", next: "warrior_dead" }
        ]
    },
    warrior_safe: {
        text: "You make it to the ledge safely and continue towards the enemy castle.",
        image: "images/castle.jpg",
        choices: [{ text: "Continue", next: "warrior_final_battle" }]
    },
    warrior_dead: {
        text: "The rockslide crushes you. Game over.",
        image: "images/death.jpg",
        choices: [{ text: "Restart", next: "restartGame" }]
    },
    warrior_fight_beast: {
        text: "You fight bravely and defeat the beast, gaining legendary armor!",
        image: "images/armor.jpg",
        choices: [{ text: "Continue", next: "warrior_final_battle" }]
    },
    warrior_sneak: {
        text: "You successfully sneak past but lose your sword in the process.",
        image: "images/lost_sword.jpg",
        choices: [{ text: "Continue", next: "warrior_final_battle" }]
    },
    warrior_final_battle: {
        text: "You reach the enemy castle. Will you challenge the warlord or set a trap?",
        image: "images/castle.jpg",
        choices: [
            { text: "Challenge warlord", next: "warrior_win" },
            { text: "Set trap", next: "warrior_lose" }
        ]
    },
    warrior_win: {
        text: "You defeat the warlord and become a legend!",
        image: "images/victory.jpg",
        choices: [{ text: "Start New Game", next: "restartGame" }]
    },
    warrior_lose: {
        text: "Your trap backfires, and you're captured. Game over.",
        image: "images/defeat.jpg",
        choices: [{ text: "Restart", next: "restartGame" }]
    },

    mage_start: {
        text: "You are a wise mage. You enter a ruined temple filled with magical energy. Do you explore the library or the altar?",
        image: "images/temple.jpg",
        choices: [
            { text: "Library", next: "mage_library" },
            { text: "Altar", next: "mage_altar" }
        ]
    },
    mage_library: {
        text: "You find an ancient spellbook. What do you do?",
        image: "images/spellbook.jpg",
        choices: [
            { text: "Read it", next: "mage_learn_spell" },
            { text: "Destroy it", next: "mage_destroy" }
        ]
    },
    mage_learn_spell: {
        text: "You learn a powerful fire spell! But will you use it for good or evil?",
        image: "images/fire_spell.jpg",
        choices: [
            { text: "Use for good", next: "mage_good" },
            { text: "Use for evil", next: "mage_evil" }
        ]
    },
    mage_good: {
        text: "You become a legendary guardian of the land!",
        image: "images/mage_good.jpg",
        choices: [{ text: "Start New Game", next: "restartGame" }]
    },
    mage_evil: {
        text: "Your dark magic consumes you. Game over.",
        image: "images/mage_evil.jpg",
        choices: [{ text: "Restart", next: "restartGame" }]
    },

    healer_start: {
        text: "You are a noble healer. You find an injured knight and a sick villager. Who do you help first?",
        image: "images/healer_choice.jpg",
        choices: [
            { text: "Help the knight", next: "healer_knight" },
            { text: "Help the villager", next: "healer_villager" }
        ]
    },
    healer_villager: {
        text: "The villager was infected with a deadly curse. You get sick and die. Game over.",
        image: "images/curse.jpg",
        choices: [{ text: "Restart", next: "restartGame" }]
    },
    healer_knight: {
        text: "The knight is grateful and swears to protect you. You journey together and discover an ancient relic that heals all wounds.",
        image: "images/relic.jpg",
        choices: [{ text: "You become a legendary healer!", next: "restartGame" }]
    },

    archer_start: {
        text: "You are a skilled archer. You see a mysterious figure in the forest. Do you follow them or hide?",
        image: "images/forest_archer.jpg",
        choices: [
            { text: "Follow them", next: "archer_follow" },
            { text: "Hide", next: "archer_hide" }
        ]
    },
    archer_follow: {
        text: "You discover a hidden camp of rogues. Do you attack or negotiate?",
        image: "images/rogues.jpg",
        choices: [
            { text: "Attack", next: "archer_attack" },
            { text: "Negotiate", next: "archer_negotiate" }
        ]
    },
    archer_attack: {
        text: "The rogues overpower you. Game over.",
        image: "images/death.jpg",
        choices: [{ text: "Restart", next: "restartGame" }]
    },
    archer_negotiate: {
        text: "The rogues respect your skill and invite you to join them. You become a master scout.",
        image: "images/rogue_success.jpg",
        choices: [{ text: "Start New Game", next: "restartGame" }]
    }
};

// Start game
function startGame() {
    showStory(`${playerClass}_start`);
}

// Display a scene
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

// Restart game
function restartGame() {
    playerClass = "";
    showClassSelection();
}

// Start by choosing a class
showClassSelection();
