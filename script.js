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
        image: "./images/warriorstart.jpg",
        choices: [
            { text: "Enter the cave", next: "warrior_cave" },
            { text: "Climb the mountain", next: "warrior_mountain" }
        ]
    },
    warrior_cave: {
        text: "Inside the cave, you see a sleeping beast. Do you fight or sneak past?",
        image: "./images/warriorbeast.jpg",
        choices: [
            { text: "Fight", next: "warrior_fight_beast" },
            { text: "Sneak past", next: "warrior_sneak" }
        ]
    },
    warrior_mountain: {
        text: "As you climb, a rockslide begins. Do you jump to a ledge or brace for impact?",
        image: "./images/warriormountain.jpg",
        choices: [
            { text: "Jump to ledge", next: "warrior_safe" },
            { text: "Brace for impact", next: "warrior_dead" }
        ]
    },
    warrior_safe: {
        text: "You make it to the ledge safely and continue towards the enemy castle.",
        image: "./images/warriorcastlesafe.jpg",
        choices: [{ text: "Continue", next: "warrior_final_battle" }]
    },
    warrior_dead: {
        text: "The rockslide crushes you. Game over.",
        image: "./images/warriordead.jpg",
        choices: [{ text: "Restart", next: "restartGame" }]
    },
    warrior_fight_beast: {
        text: "You fight bravely and defeat the beast, gaining legendary armor!",
        image: "./images/warriorfight.jpg",
        choices: [{ text: "Continue", next: "warrior_final_battle" }]
    },
    warrior_sneak: {
        text: "You successfully sneak past but lose your sword in the process.",
        image: "./images/warriorlostsword.jpg",
        choices: [{ text: "Continue", next: "warrior_final_battle" }]
    },
    warrior_final_battle: {
        text: "You reach the enemy castle. Will you challenge the warlord or set a trap?",
        image: "./images/warriorfinalbattle.jpg",
        choices: [
            { text: "Challenge warlord", next: "warrior_win" },
            { text: "Set trap", next: "warrior_lose" }
        ]
    },
    warrior_win: {
        text: "You defeat the warlord and become a legend!",
        image: "./images/warriorwin.jpg",
        choices: [{ text: "Start New Game", next: "restartGame" }]
    },
    warrior_lose: {
        text: "Your trap backfires, and you're captured. Game over.",
        image: "./images/warriortrap.jpg",
        choices: [{ text: "Restart", next: "restartGame" }]
    },
// part ni thomas
    mage_start: {
        text: "You are a wise mage. You enter a ruined temple filled with magical energy. Do you explore the library or the altar?",
        image: "./images/mage_start.jpg",
        choices: [
            { text: "Library", next: "mage_library" },
            { text: "Altar", next: "mage_altar" }
        ]
    },
    mage_library: {
        text: "You find an ancient spellbook. What do you do?",
        image: "./images/mage_found_book.jpg",
        choices: [
            { text: "Read it", next: "mage_learn_spell" },
            { text: "Destroy it", next: "mage_destroy" }
        ]
    },
    mage_destroy: {
        text: "As you burn the spellbook, dark energy erupts from its pages, unleashing a powerful curse upon you.",
        image: "./images/mage-burned-book.jpg",
        choices: [
            { text: "Try to resist", next: "mage_resist_curse" },
            { text: "Accept the darkness", next: "mage_dark_transformation" }
        ]
    },
    mage_resist_curse: {
        text: "You struggle against the overwhelming energy, but it drains your magic permanently. You can no longer cast spells.",
        image: "./images/resisting-mage-curse.jpg",
        choices: [
            { text: "Continue as a scholar", next: "mage_scholar" },
            { text: "Retire from magic", next: "mage_retire" }
        ]
    },
    mage_scholar: {
        text: "You dedicate yourself to studying magic theory, training future generations of mages.",
        image: "./images/scholar-mage.jpg",
        choices: [{ text: "Start New Game", next: "restartGame" }]
    },
    mage_retire: {
        text: "You leave the magical world behind and live a peaceful life as a simple historian.",
        image: "./images/mage-retire.jpg",
        choices: [{ text: "Start New Game", next: "restartGame" }]
    },
    mage_dark_transformation: {
        text: "You embrace the dark power, transforming into a shadow mage with forbidden knowledge.",
        image: "./images/embrace-dark.jpg",
        choices: [
            { text: "Use your power for revenge", next: "mage_revenge" },
            { text: "Seek control over the darkness", next: "mage_control_darkness" }
        ]
    },
    mage_revenge: {
        text: "Blinded by vengeance, you unleash destruction upon the world. Eventually, the kingdom hunts you down.",
        image: "./images/blinded-mage.jpg",
        choices: [{ text: "Game Over", next: "restartGame" }]
    },
    mage_control_darkness: {
        text: "You learn to harness the dark magic without losing yourself, becoming a powerful protector of the balance.",
        image: "./images/learn-darknes.jpg",
        choices: [{ text: "Start New Game", next: "restartGame" }]
    },
    mage_learn_spell: {
        text: "You learn a powerful fire spell! But will you use it for good or evil?",
        image: "./images/fire-spell.jpg",
        choices: [
            { text: "Use for good", next: "mage_good" },
            { text: "Use for evil", next: "mage_evil" }
        ]
    },
    mage_good: {
        text: "You become a legendary guardian of the land!",
        image: "./images/legendar-guardian.jpg",
        choices: [{ text: "Start New Game", next: "restartGame" }]
    },
    mage_evil: {
        text: "Your dark magic consumes you. Game over.",
        image: "./images/dying-mage.jpg",
        choices: [{ text: "Restart", next: "restartGame" }]
    },
    mage_altar: {
        text: "At the altar, you feel a strange energy. A spirit appears, offering you wisdom or power.",
        image: "./images/altar-mage.jpg",
        choices: [
            { text: "Accept wisdom", next: "mage_wisdom" },
            { text: "Accept power", next: "mage_power" }
        ]
    },
    mage_wisdom: {
        text: "You gain knowledge of the world's secrets, unlocking hidden paths in your journey.",
        image: "./images/gain-knowledge.jpg",
        choices: [{ text: "Continue", next: "mage_prophecy" }]
    },
    mage_power: {
        text: "Dark energy courses through you, increasing your strength but corrupting your mind.",
        image: "./images/dark-energy.jpg",
        choices: [{ text: "Continue", next: "mage_dark_path" }]
    },
    mage_prophecy: {
        text: "A vision of the future warns you of a great calamity. Will you act on it?",
        image: "./images/vision-mage.jpg",
        choices: [
            { text: "Warn the kingdom", next: "mage_warn_kingdom" },
            { text: "Seek more knowledge", next: "mage_seeker" }
        ]
    },
    mage_warn_kingdom: {
        text: "The kingdom heeds your warning and prepares for the disaster, crowning you as their advisor.",
        image: "./images/kingdom-heeds.jpg",
        choices: [{ text: "Start New Game", next: "restartGame" }]
    },
    mage_seeker: {
        text: "You travel the lands searching for deeper truths, uncovering lost civilizations.",
        image: "./images/travel-lands.jpg",
        choices: [{ text: "Start New Game", next: "restartGame" }]
    },
    mage_dark_path: {
        text: "You grow in power, but your heart turns cold. Will you seek redemption or embrace the darkness?",
        image: "./images/grow-in-power.jpg",
        choices: [
            { text: "Seek redemption", next: "mage_redemption" },
            { text: "Embrace darkness", next: "mage_overlord" }
        ]
    },
    mage_redemption: {
        text: "You struggle to undo the harm you've done, becoming a hero of the fallen.",
        image: "./images/struggle-mage.jpg",
        choices: [{ text: "Start New Game", next: "restartGame" }]
    },
    mage_overlord: {
        text: "You conquer the lands, ruling with fear and might. The world is yours.",
        image: "./images/conquer.jpg",
        choices: [{ text: "Start New Game", next: "restartGame" }]
    },
// tapos page part



// healer part
    healer_start: {
        text: "You are a noble healer. You find an injured knight and a sick villager. Who do you help first?",
        image: "./images/healer_choice.jpg",
        choices: [
            { text: "Help the knight", next: "healer_knight" },
            { text: "Help the villager", next: "healer_villager" }
        ]
    },
    healer_villager: {
        text: "The villager is cursed! You have a short time to find a cure. Do you seek herbs or perform a ritual?",
        image: "./images/healervillage.jpg",
        choices: [
            { text: "Seek herbs", next: "healer_herbs" },
            { text: "Perform a ritual", next: "healer_ritual" }
        ]
    },
    healer_herbs: {
        text: "The herbs are ineffective. The curse spreads to you. Game over.",
        image: "./images/healerherbs.jpg",
        choices: [{ text: "Restart", next: "restartGame" }]
    },
    healer_ritual: {
        text: "The ritual is successful! The villager is saved and gifts you a rare potion.",
        image: "./images/success.jpg",
        choices: [{ text: "Continue", next: "healer_relic" }]
    },
    healer_knight: {
        text: "The knight is grateful and swears loyalty to you. He offers two paths: join him on a battle mission or focus on healing others.",
        image: "./images/knight.jpg",
        choices: [
            { text: "Join battle mission", next: "healer_battle" },
            { text: "Focus on healing", next: "healer_relic" }
        ]
    },
    healer_battle: {
        text: "In battle, your healing saves many lives. You are honored as the royal healer!",
        image: "./images/victory.jpg",
        choices: [{ text: "Start New Game", next: "restartGame" }]
    },
    healer_relic: {
        text: "You discover an ancient relic! To unlock its power, you must solve a mystical riddle. Do you attempt it?",
        image: "./images/relic.jpg",
        choices: [
            { text: "Solve the riddle", next: "healer_riddle" },
            { text: "Ignore and move on", next: "healer_ignore" }
        ]
    },
    healer_riddle: {
        text: "You solve the riddle and the relic grants you divine healing powers! You become a legendary healer.",
        image: "./images/legendary_healer.jpg",
        choices: [{ text: "Start New Game", next: "restartGame" }]
    },
    healer_ignore: {
        text: "Without unlocking its power, the relic fades. You continue your journey as a skilled but mortal healer.",
        image: "./images/healer_path.jpg",
        choices: [{ text: "Start New Game", next: "restartGame" }]
    },

    archer_start: {
        text: "You spot a mysterious figure in the forest. What do you do?",
        image: "./images/archer in a forest.jpg",
        choices: [
            { text: "Follow", next: "archer_follow" },
            { text: "Hide", next: "archer_hide" },
            { text: "Call out", next: "archer_call" }
        ]
    },
    archer_follow: {
        text: "You find a rogue camp. Attack or negotiate?",
        image: "./images/archerfindacamp.jpg",
        choices: [
            { text: "Attack", next: "archer_attack" },
            { text: "Negotiate", next: "archer_negotiate" }
        ]
    },
    archer_hide: {
        text: "You overhear a treasure map plot. Steal it or report it?",
        image: "./images/archerhide.jpg",
        choices: [
            { text: "Steal", next: "archer_steal" },
            { text: "Report", next: "archer_report" }
        ]
    },
    archer_call: {
        text: "The figure is an elf needing help. Assist or demand payment?",
        image: "./images/archercall.jpg",
        choices: [
            { text: "Help", next: "archer_help_elf" },
            { text: "Demand payment", next: "archer_move_on" }
        ]
    },
    archer_attack: {
        text: "You attack but are outnumbered. Fight or retreat?",
        image: "./images/attackingacamparcher.jpg",
        choices: [
            { text: "Fight", next: "archer_heroic_death" },
            { text: "Retreat", next: "archer_retreat" }
        ]
    },
    archer_heroic_death: {
        text: "You die bravely, remembered in songs.",
        image: "./images/archerheroicdeath.webp",
        choices: [{ text: "Start New Game", next: "restartGame" }]
    },
    archer_retreat: {
        text: "You retreat and plan your next move.",
        image: "./images/archerretreat.jpg",
        choices: [
            { text: "Ambush", next: "archer_ambush" },
            { text: "Seek help", next: "archer_reinforcements" }
        ]
    },
    archer_ambush: {
        text: "You ambush the rogues and recover treasure.",
        image: "./images/archerambush.jpg",
        choices: [{ text: "Start New Game", next: "restartGame" }]
    },
    archer_reinforcements: {
        text: "You secure the area with reinforcements.",
        image: "./images/archerreinforcements.jpg",
        choices: [{ text: "Start New Game", next: "restartGame" }]
    },
    archer_negotiate: {
        text: "You negotiate with the rogues for treasure.",
        image: "./images/archernegotiate.jpg",
        choices: [
            { text: "Accept deal", next: "archer_deal" },
            { text: "Betray", next: "archer_betray" }
        ]
    },
    archer_deal: {
        text: "You gain info about a hidden artifact.",
        image: "./images/archerdeal.jpg",
        choices: [{ text: "Search for artifact", next: "archer_artifact" }]
    },
    archer_betray: {
        text: "You betray the rogues, leading to a battle.",
        image: "./images/archerbetray.jpg",
        choices: [
            { text: "Fight", next: "archer_heroic_death" },
            { text: "Flee", next: "archer_retreat" }
        ]
    },
    archer_artifact: {
        text: "You find a powerful bow, becoming unstoppable.",
        image: "./images/archerartifact.jpg",
        choices: [{ text: "Start New Game", next: "restartGame" }]
    },
    archer_steal: {
        text: "You steal the map but are chased. Fight or flee?",
        image: "./images/archersteal.jpg",
        choices: [
            { text: "Fight", next: "archer_fight_figure" },
            { text: "Flee", next: "archer_flee" }
        ]
    },
    archer_fight_figure: {
        text: "You defeat the figure but damage the map.",
        image: "./images/archerfightfigure.jpg",
        choices: [
            { text: "Follow map", next: "archer_follow_map" },
            { text: "Abandon", next: "archer_move_on" }
        ]
    },
    archer_follow_map: {
        text: "The map leads to treasure guarded by a creature.",
        image: "./images/archerfollowmap.jpg",
        choices: [
            { text: "Fight", next: "archer_fight_guardian" },
            { text: "Sneak past", next: "archer_sneak_past" }
        ]
    },
    archer_fight_guardian: {
        text: "You defeat the guardian and claim the treasure.",
        image: "./images/archerfightguardian.jpg",
        choices: [{ text: "Start New Game", next: "restartGame" }]
    },
    archer_sneak_past: {
        text: "You sneak past but awaken the guardian.",
        image: "./images/archersneakpast.jpg",
        choices: [
            { text: "Fight", next: "archer_fight_guardian" },
            { text: "Run", next: "archer_run" }
        ]
    },
    archer_run: {
        text: "You escape but alert bandits.",
        image: "./images/archerrun.jpg",
        choices: [
            { text: "Fight", next: "archer_fight_bandits" },
            { text: "Hide", next: "archer_hide_from_bandits" }
        ]
    },
    archer_fight_bandits: {
        text: "You defeat the bandits but are wounded.",
        image: "./images/archerfightbandits.jpg",
        choices: [
            { text: "Seek healing", next: "archer_seek_healing" },
            { text: "Continue", next: "archer_wounded_journey" }
        ]
    },
    archer_seek_healing: {
        text: "You heal and continue your journey.",
        image: "./images/archerseekhealing.jpg",
        choices: [{ text: "Start New Game", next: "restartGame" }]
    },
    archer_wounded_journey: {
        text: "You press on wounded, recovering slowly.",
        image: "./images/archerwoundedjourney.jpg",
        choices: [{ text: "Start New Game", next: "restartGame" }]
    },
    archer_hide_from_bandits: {
        text: "You hide but are found. Fight or flee?",
        image: "./images/archerhidefrombandits.jpg",
        choices: [
            { text: "Fight", next: "archer_fight_bandits" },
            { text: "Flee", next: "archer_flee_from_bandits" }
        ]
    },
    archer_flee_from_bandits: {
        text: "You flee, losing the treasure but surviving.",
        image: "./images/archerfleefrombandits.jpg",
        choices: [{ text: "Start New Game", next: "restartGame" }]
    },
    archer_report: {
        text: "You report to guards, but the figure escapes.",
        image: "./images/archerreport.jpg",
        choices: [
            { text: "Track", next: "archer_track" },
            { text: "Move on", next: "archer_move_on" }
        ]
    },
    archer_track: {
        text: "You track the figure to their hideout. Confront or report?",
        image: "./images/archertrack.jpg",
        choices: [
            { text: "Confront", next: "archer_confront" },
            { text: "Report", next: "archer_report_guards" }
        ]
    },
    archer_confront: {
        text: "You confront a rogue mage. Fight or negotiate?",
        image: "./images/archerconfront.jpg",
        choices: [
            { text: "Fight", next: "archer_fight_mage" },
            { text: "Negotiate", next: "archer_negotiate_mage" }
        ]
    },
    archer_fight_mage: {
        text: "You defeat the mage but are weakened.",
        image: "./images/archerfightmage.jpg",
        choices: [
            { text: "Seek healing", next: "archer_seek_healing" },
            { text: "Continue", next: "archer_wounded_journey" }
        ]
    },
    archer_negotiate_mage: {
        text: "The mage offers an artifact for your silence.",
        image: "./images/archernegotiatemage.jpg",
        choices: [
            { text: "Accept", next: "archer_artifact" },
            { text: "Refuse", next: "archer_refuse_mage" }
        ]
    },
    archer_refuse_mage: {
        text: "You refuse, and the mage attacks.",
        image: "./images/archerrefusemage.jpg",
        choices: [
            { text: "Fight", next: "archer_fight_mage" },
            { text: "Flee", next: "archer_flee" }
        ]
    },
    archer_report_guards: {
        text: "You report the hideout, and the guards raid it.",
        image: "./images/archerreportguards.jpg",
        choices: [{ text: "Start New Game", next: "restartGame" }]
    },
    archer_help_elf: {
        text: "You help the elf and are rewarded with a magical bow.",
        image: "./images/archerhelpelf.jpg",
        choices: [{ text: "Start New Game", next: "restartGame" }]
    },
    archer_move_on: {
        text: "You continue your journey.",
        image: "./images/archermoveon.jpg",
        choices: [{ text: "Start New Game", next: "restartGame" }]
    }
};

// Start game
function startGame() {
    if (!playerClass) {
        console.error("Player class is not set.");
        return;
    }
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

window.selectClass = selectClass;