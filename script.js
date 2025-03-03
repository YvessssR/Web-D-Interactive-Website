let playerClass = "";

const storyText = document.getElementById("story-text");
const choicesDiv = document.getElementById("choices");
const storyImage = document.getElementById("story-image");

// Player chooses a class before starting the game
function selectClass(chosenClass) {
    playerClass = chosenClass;
    startGame();
}

// Story structure for each class
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
        choices: [{ text: "Start New Game", next: "start" }]
    },
    warrior_lose: {
        text: "Your trap backfires, and you're captured. Game over.",
        image: "images/defeat.jpg",
        choices: [{ text: "Restart", next: "start" }]
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
        choices: [{ text: "Start New Game", next: "start" }]
    },
    mage_evil: {
        text: "Your dark magic consumes you. Game over.",
        image: "images/mage_evil.jpg",
        choices: [{ text: "Restart", next: "start" }]
    },

    healer_start: {
        text: "You are a noble healer. You find an injured knight and a sick villager. Who do you help first?",
        image: "images/healer_choice.jpg",
        choices: [
            { text: "Help the knight", next: "healer_knight" },
            { text: "Help the villager", next: "healer_villager" }
        ]
    },
    healer_knight: {
        text: "The knight is grateful and swears to protect you. Do you travel with him or stay in the village?",
        image: "images/knight.jpg",
        choices: [
            { text: "Travel with knight", next: "healer_adventure" },
            { text: "Stay in village", next: "healer_stay" }
        ]
    },
    healer_villager: {
        text: "The villager was infected with a deadly curse. You get sick and die. Game over.",
        image: "images/curse.jpg",
        choices: [{ text: "Restart", next: "start" }]
    },
    healer_adventure: {
        text: "You and the knight discover an ancient relic that heals all wounds. You become a legendary healer!",
        image: "images/relic.jpg",
        choices: [{ text: "Start New Game", next: "start" }]
    },
    healer_stay: {
        text: "You live a peaceful life, healing those in need.",
        image: "images/village.jpg",
        choices: [{ text: "Start New Game", next: "start" }]
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
    archer_hide: {
        text: "The figure was a deadly assassin. You avoided a trap and return home safely.",
        image: "images/home.jpg",
        choices: [{ text: "Start New Game", next: "start" }]
    },
    archer_attack: {
        text: "The rogues overpower you. Game over.",
        image: "images/death.jpg",
        choices: [{ text: "Restart", next: "start" }]
    },
    archer_negotiate: {
        text: "The rogues respect your skill and invite you to join them. You become a master scout.",
        image: "images/rogue_success.jpg",
        choices: [{ text: "Start New Game", next: "start" }]
    }
};

// Start game based on player's class
function startGame() {
    if (playerClass === "warrior") {
        showStory("warrior_start");
    } else if (playerClass === "mage") {
        showStory("mage_start");
    } else if (playerClass === "healer") {
        showStory("healer_start");
    } else if (playerClass === "archer") {
        showStory("archer_start");
    }
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
