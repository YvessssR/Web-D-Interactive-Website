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
        choices: [{ text: "Start New Game", next: "restart" }]
    },
    mage_evil: {
        text: "Your dark magic consumes you. Game over.",
        image: "images/mage_evil.jpg",
        choices: [{ text: "Restart", next: "restart" }]
    },
    mage_altar: {
        text: "At the altar, you feel a strange energy. A spirit appears, offering you wisdom or power.",
        image: "images/altar.jpg",
        choices: [
            { text: "Accept wisdom", next: "mage_wisdom" },
            { text: "Accept power", next: "mage_power" }
        ]
    },
    mage_wisdom: {
        text: "You gain knowledge of the world's secrets, unlocking hidden paths in your journey.",
        image: "images/wisdom.jpg",
        choices: [{ text: "Continue", next: "mage_prophecy" }]
    },
    mage_power: {
        text: "Dark energy courses through you, increasing your strength but corrupting your mind.",
        image: "images/dark_power.jpg",
        choices: [{ text: "Continue", next: "mage_dark_path" }]
    },
    mage_prophecy: {
        text: "A vision of the future warns you of a great calamity. Will you act on it?",
        image: "images/prophecy.jpg",
        choices: [
            { text: "Warn the kingdom", next: "mage_warn_kingdom" },
            { text: "Seek more knowledge", next: "mage_seeker" }
        ]
    },
    mage_warn_kingdom: {
        text: "The kingdom heeds your warning and prepares for the disaster, crowning you as their advisor.",
        image: "images/kingdom.jpg",
        choices: [{ text: "Start New Game", next: "restart" }]
    },
    mage_seeker: {
        text: "You travel the lands searching for deeper truths, uncovering lost civilizations.",
        image: "images/seeker.jpg",
        choices: [{ text: "Start New Game", next: "restart" }]
    },
    mage_dark_path: {
        text: "You grow in power, but your heart turns cold. Will you seek redemption or embrace the darkness?",
        image: "images/dark_path.jpg",
        choices: [
            { text: "Seek redemption", next: "mage_redemption" },
            { text: "Embrace darkness", next: "mage_overlord" }
        ]
    },
    mage_redemption: {
        text: "You struggle to undo the harm you've done, becoming a hero of the fallen.",
        image: "images/redemption.jpg",
        choices: [{ text: "Start New Game", next: "restart" }]
    },
    mage_overlord: {
        text: "You conquer the lands, ruling with fear and might. The world is yours.",
        image: "images/overlord.jpg",
        choices: [{ text: "Start New Game", next: "restart" }]
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
        text: "The villager is cursed! You have a short time to find a cure. Do you seek herbs or perform a ritual?",
        image: "images/curse.jpg",
        choices: [
            { text: "Seek herbs", next: "healer_herbs" },
            { text: "Perform a ritual", next: "healer_ritual" }
        ]
    },
    healer_herbs: {
        text: "The herbs are ineffective. The curse spreads to you. Game over.",
        image: "images/death.jpg",
        choices: [{ text: "Restart", next: "restartGame" }]
    },
    healer_ritual: {
        text: "The ritual is successful! The villager is saved and gifts you a rare potion.",
        image: "images/success.jpg",
        choices: [{ text: "Continue", next: "healer_relic" }]
    },
    healer_knight: {
        text: "The knight is grateful and swears loyalty to you. He offers two paths: join him on a battle mission or focus on healing others.",
        image: "images/knight.jpg",
        choices: [
            { text: "Join battle mission", next: "healer_battle" },
            { text: "Focus on healing", next: "healer_relic" }
        ]
    },
    healer_battle: {
        text: "In battle, your healing saves many lives. You are honored as the royal healer!",
        image: "images/victory.jpg",
        choices: [{ text: "Start New Game", next: "restartGame" }]
    },
    healer_relic: {
        text: "You discover an ancient relic! To unlock its power, you must solve a mystical riddle. Do you attempt it?",
        image: "images/relic.jpg",
        choices: [
            { text: "Solve the riddle", next: "healer_riddle" },
            { text: "Ignore and move on", next: "healer_ignore" }
        ]
    },
    healer_riddle: {
        text: "You solve the riddle and the relic grants you divine healing powers! You become a legendary healer.",
        image: "images/legendary_healer.jpg",
        choices: [{ text: "Start New Game", next: "restartGame" }]
    },
    healer_ignore: {
        text: "Without unlocking its power, the relic fades. You continue your journey as a skilled but mortal healer.",
        image: "images/healer_path.jpg",
        choices: [{ text: "Start New Game", next: "restartGame" }]
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
        button.onclick = () => {
            if (choice.next === "restartGame") {
                restartGame();
            } else {
                showStory(choice.next);
            }
        };
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
