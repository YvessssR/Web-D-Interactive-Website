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

    mage_destroy: {
        text: "As you burn the spellbook, dark energy erupts from its pages, unleashing a powerful curse upon you.",
        image: "images/curse.jpg",
        choices: [
            { text: "Try to resist", next: "mage_resist_curse" },
            { text: "Accept the darkness", next: "mage_dark_transformation" }
        ]
    },
    
    mage_resist_curse: {
        text: "You struggle against the overwhelming energy, but it drains your magic permanently. You can no longer cast spells.",
        image: "images/weak_mage.jpg",
        choices: [
            { text: "Continue as a scholar", next: "mage_scholar" },
            { text: "Retire from magic", next: "mage_retire" }
        ]
    },
    
    mage_scholar: {
        text: "You dedicate yourself to studying magic theory, training future generations of mages.",
        image: "images/scholar.jpg",
        choices: [{ text: "Start New Game", next: "restartGame" }]
    },
    
    mage_retire: {
        text: "You leave the magical world behind and live a peaceful life as a simple historian.",
        image: "images/retire.jpg",
        choices: [{ text: "Start New Game", next: "restartGame" }]
    },
    
    mage_dark_transformation: {
        text: "You embrace the dark power, transforming into a shadow mage with forbidden knowledge.",
        image: "images/shadow_mage.jpg",
        choices: [
            { text: "Use your power for revenge", next: "mage_revenge" },
            { text: "Seek control over the darkness", next: "mage_control_darkness" }
        ]
    },
    
    mage_revenge: {
        text: "Blinded by vengeance, you unleash destruction upon the world. Eventually, the kingdom hunts you down.",
        image: "images/dark_overlord.jpg",
        choices: [{ text: "Game Over", next: "restartGame" }]
    },
    
    mage_control_darkness: {
        text: "You learn to harness the dark magic without losing yourself, becoming a powerful protector of the balance.",
        image: "images/dark_guardian.jpg",
        choices: [{ text: "Start New Game", next: "restartGame" }]
    }
,    
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
        choices: [{ text: "Start New Game", next: "restartGame" }]
    },
    mage_seeker: {
        text: "You travel the lands searching for deeper truths, uncovering lost civilizations.",
        image: "images/seeker.jpg",
        choices: [{ text: "Start New Game", next: "restartGame" }]
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
        choices: [{ text: "Start New Game", next: "restartGame" }]
    },
    mage_overlord: {
        text: "You conquer the lands, ruling with fear and might. The world is yours.",
        image: "images/overlord.jpg",
        choices: [{ text: "Start New Game", next: "restartGame" }]
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
            { text: "Hide", next: "archer_hide" },
            { text: "Call out to them", next: "archer_call" },
            { text: "Look around", next: "archer_easter_egg1" }
        ]
    },
    archer_follow: {
        text: "You discover a hidden camp of rogues. Do you attack or negotiate?",
        image: "images/rogues.jpg",
        choices: [
            { text: "Attack", next: "archer_attack" },
            { text: "Negotiate", next: "archer_negotiate" },
            { text: "Spy longer", next: "archer_spy" }
        ]
    },
    archer_hide: {
        text: "While hiding, you overhear the figure talking about a royal treasure map. Do you steal it or report to the guards?",
        image: "images/hiding.jpg",
        choices: [
            { text: "Steal the map", next: "archer_steal" },
            { text: "Report to the guards", next: "archer_report" },
            { text: "Blackmail them", next: "archer_blackmail" }
        ]
    },
    archer_easter_egg1: {
        text: "You find a strange carving on a tree. It glows when you touch it, revealing an ancient hidden path.",
        image: "images/glowing_tree.jpg",
        choices: [
            { text: "Enter the path", next: "archer_secret_realm" },
            { text: "Ignore it", next: "archer_start" }
        ]
    },
    archer_secret_realm: {
        text: "You step into a mystical realm where time moves differently. A shadowy figure approaches...",
        image: "images/mystic_realm.jpg",
        choices: [
            { text: "Speak to the figure", next: "archer_mystic_talk" },
            { text: "Run away", next: "archer_escape_realm" }
        ]
    },
    archer_mystic_talk: {
        text: "The figure reveals themselves as an ancient archer spirit. They offer to train you in forgotten skills.",
        image: "images/archer_spirit.jpg",
        choices: [
            { text: "Accept training", next: "archer_legend_training" },
            { text: "Decline and leave", next: "archer_start" }
        ]
    },
    archer_legend_training: {
        text: "You undergo rigorous training and awaken with enhanced abilities. You are now a true legend.",
        image: "images/legend_archer.jpg",
        choices: [
            { text: "Return to the real world", next: "archer_start" }
        ]
    },
    archer_escape_realm: {
        text: "You attempt to flee, but the realm shifts around you. You find yourself back at the forest clearing, as if nothing happened.",
        image: "images/confused.jpg",
        choices: [
            { text: "Continue your journey", next: "archer_start" }
        ]
    },
    archer_report: {
        text: "You inform the guards, who reward you for your honesty. However, the figure escapes. Do you track them down?",
        image: "images/report.jpg",
        choices: [
            { text: "Track them", next: "archer_track" },
            { text: "Move on", next: "archer_move_on" }
        ]
    },
    archer_call: {
        text: "The figure turns out to be an elven messenger in distress. They need help delivering an urgent message to the Fairy Queen.",
        image: "images/elf_messenger.jpg",
        choices: [
            { text: "Offer help", next: "archer_help_elf" },
            { text: "Demand payment", next: "archer_demand_payment" }
        ]
    },
    archer_demand_payment: {
        text: "The elf refuses and vanishes into the forest. You lose the opportunity to gain favor with the Fairy Queen.",
        image: "images/empty_forest.jpg",
        choices: [
            { text: "Move on", next: "archer_move_on" }
        ]
    },
    archer_move_on: {
        text: "You decide to continue your own journey, leaving the past behind.",
        image: "images/journey.jpg",
        choices: [
            { text: "Return to Class Selection", next: "restartGame" }
        ]
    },
    archer_attack: {
        text: "You attack the rogues, but they outnumber you. Do you fight to the end or retreat?",
        image: "images/rogue_attack.jpg",
        choices: [
            { text: "Fight to the end", next: "archer_heroic_death" },
            { text: "Retreat", next: "archer_retreat" }
        ]
    },
    archer_heroic_death: {
        text: "You fight valiantly but are overwhelmed. Your bravery is remembered in songs for generations.",
        image: "images/heroic_death.jpg",
        choices: [
            { text: "Return to Class Selection", next: "restartGame" }
        ]
    },
    archer_retreat: {
        text: "You retreat and regroup, planning your next move carefully.",
        image: "images/retreat.jpg",
        choices: [
            { text: "Plan an ambush", next: "archer_ambush" },
            { text: "Seek reinforcements", next: "archer_reinforcements" }
        ]
    },
    archer_ambush: {
        text: "Your ambush is successful! The rogues are defeated, and you recover the stolen treasure.",
        image: "images/ambush_success.jpg",
        choices: [
            { text: "Return to Class Selection", next: "restartGame" }
        ]
    },
    archer_reinforcements: {
        text: "You bring reinforcements, but the rogues have fled. However, you secure the area and gain the trust of the townsfolk.",
        image: "images/reinforcements.jpg",
        choices: [
            { text: "Return to Class Selection", next: "restartGame" }
        ]
    },
    archer_negotiate: {
        text: "You negotiate with the rogues, offering to share the treasure in exchange for information.",
        image: "images/negotiate.jpg",
        choices: [
            { text: "Accept their deal", next: "archer_deal" },
            { text: "Betray them", next: "archer_betray" }
        ]
    },
    archer_deal: {
        text: "The rogues honor the deal, and you gain valuable information about a hidden artifact.",
        image: "images/deal.jpg",
        choices: [
            { text: "Search for the artifact", next: "archer_artifact" }
        ]
    },
    archer_betray: {
        text: "You betray the rogues, but they were prepared. A fierce battle ensues.",
        image: "images/betrayal.jpg",
        choices: [
            { text: "Fight", next: "archer_heroic_death" },
            { text: "Flee", next: "archer_retreat" }
        ]
    },
    archer_artifact: {
        text: "You find the hidden artifact, a bow of immense power. With it, you become an unstoppable force.",
        image: "images/artifact_bow.jpg",
        choices: [
            { text: "Return to Class Selection", next: "restartGame" }
        ]
    },
    archer_spy: {
        text: "You spy on the rogues longer, learning of their plans to attack a nearby village.",
        image: "images/spy.jpg",
        choices: [
            { text: "Warn the village", next: "archer_warn_village" },
            { text: "Set a trap", next: "archer_trap" }
        ]
    },
    archer_warn_village: {
        text: "The village prepares and repels the attack. You are hailed as a savior.",
        image: "images/village_saved.jpg",
        choices: [
            { text: "Return to Class Selection", next: "restartGame" }
        ]
    },
    archer_trap: {
        text: "You set a trap for the rogues, capturing their leader and ending their threat.",
        image: "images/trap_success.jpg",
        choices: [
            { text: "Return to Class Selection", next: "restartGame" }
        ]
    },
    archer_steal: {
        text: "You steal the map, but the figure notices and chases you. Do you fight or flee?",
        image: "images/steal_map.jpg",
        choices: [
            { text: "Fight", next: "archer_fight_figure" },
            { text: "Flee", next: "archer_flee" }
        ]
    },
    archer_fight_figure: {
        text: "You defeat the figure, but the map is damaged in the fight. Only part of it is readable.",
        image: "images/damaged_map.jpg",
        choices: [
            { text: "Follow the map", next: "archer_follow_map" },
            { text: "Abandon the map", next: "archer_move_on" }
        ]
    },
    archer_follow_map: {
        text: "The map leads you to a hidden treasure, but it's guarded by a fierce creature.",
        image: "images/treasure_guardian.jpg",
        choices: [
            { text: "Fight the guardian", next: "archer_fight_guardian" },
            { text: "Sneak past", next: "archer_sneak_past" }
        ]
    },
    archer_fight_guardian: {
        text: "You defeat the guardian and claim the treasure, becoming rich and famous.",
        image: "images/treasure_victory.jpg",
        choices: [
            { text: "Return to Class Selection", next: "restartGame" }
        ]
    },
    archer_sneak_past: {
        text: "You sneak past the guardian and take the treasure, but the guardian awakens and chases you.",
        image: "images/sneak_past.jpg",
        choices: [
            { text: "Fight", next: "archer_fight_guardian" },
            { text: "Run", next: "archer_run" }
        ]
    },
    archer_run: {
        text: "You escape with the treasure, but the guardian's roar alerts nearby bandits.",
        image: "images/run.jpg",
        choices: [
            { text: "Fight the bandits", next: "archer_fight_bandits" },
            { text: "Hide", next: "archer_hide_from_bandits" }
        ]
    },
    archer_fight_bandits: {
        text: "You defeat the bandits and secure the treasure, but you are badly wounded.",
        image: "images/fight_bandits.jpg",
        choices: [
            { text: "Seek healing", next: "archer_seek_healing" },
            { text: "Continue wounded", next: "archer_wounded_journey" }
        ]
    },
    archer_seek_healing: {
        text: "You find a healer who tends to your wounds. You recover fully and continue your journey.",
        image: "images/healing.jpg",
        choices: [
            { text: "Return to Class Selection", next: "restartGame" }
        ]
    },
    archer_wounded_journey: {
        text: "You press on despite your wounds, but they slow you down. You eventually recover, but the journey is long and arduous.",
        image: "images/wounded_journey.jpg",
        choices: [
            { text: "Return to Class Selection", next: "restartGame" }
        ]
    },
    archer_hide_from_bandits: {
        text: "You hide from the bandits, but they find your trail. You must fight or flee.",
        image: "images/hide_from_bandits.jpg",
        choices: [
            { text: "Fight", next: "archer_fight_bandits" },
            { text: "Flee", next: "archer_flee_from_bandits" }
        ]
    },
    archer_flee_from_bandits: {
        text: "You flee from the bandits, losing the treasure but saving your life.",
        image: "images/flee_from_bandits.jpg",
        choices: [
            { text: "Return to Class Selection", next: "restartGame" }
        ]
    },
    archer_blackmail: {
        text: "You attempt to blackmail the figure, but they are a skilled negotiator. They offer you a deal: join them or face their wrath.",
        image: "images/blackmail.jpg",
        choices: [
            { text: "Join them", next: "archer_join_rogues" },
            { text: "Refuse", next: "archer_refuse_deal" }
        ]
    },
    archer_join_rogues: {
        text: "You join the rogues, becoming a feared outlaw. Your life takes a dark turn.",
        image: "images/join_rogues.jpg",
        choices: [
            { text: "Return to Class Selection", next: "restartGame" }
        ]
    },
    archer_refuse_deal: {
        text: "You refuse the deal, and the figure attacks you. A fierce battle ensues.",
        image: "images/refuse_deal.jpg",
        choices: [
            { text: "Fight", next: "archer_fight_figure" },
            { text: "Flee", next: "archer_flee" }
        ]
    },
    archer_help_elf: {
        text: "You help the elf deliver the message to the Fairy Queen. She rewards you with a magical bow.",
        image: "images/fairy_queen.jpg",
        choices: [
            { text: "Return to Class Selection", next: "restartGame" }
        ]
    },
    archer_track: {
        text: "You track the figure to their hideout. Do you confront them or report to the guards?",
        image: "images/track.jpg",
        choices: [
            { text: "Confront them", next: "archer_confront" },
            { text: "Report to the guards", next: "archer_report_guards" }
        ]
    },
    archer_confront: {
        text: "You confront the figure, who turns out to be a rogue mage. A battle ensues.",
        image: "images/confront_mage.jpg",
        choices: [
            { text: "Fight", next: "archer_fight_mage" },
            { text: "Negotiate", next: "archer_negotiate_mage" }
        ]
    },
    archer_fight_mage: {
        text: "You defeat the mage, but the battle leaves you weakened.",
        image: "images/fight_mage.jpg",
        choices: [
            { text: "Seek healing", next: "archer_seek_healing" },
            { text: "Continue wounded", next: "archer_wounded_journey" }
        ]
    },
    archer_negotiate_mage: {
        text: "You negotiate with the mage, who offers you a powerful artifact in exchange for your silence.",
        image: "images/negotiate_mage.jpg",
        choices: [
            { text: "Accept the artifact", next: "archer_artifact" },
            { text: "Refuse", next: "archer_refuse_mage" }
        ]
    },
    archer_refuse_mage: {
        text: "You refuse the mage's offer, and they attack you.",
        image: "images/refuse_mage.jpg",
        choices: [
            { text: "Fight", next: "archer_fight_mage" },
            { text: "Flee", next: "archer_flee" }
        ]
    },
    archer_report_guards: {
        text: "You report the hideout to the guards, who raid it successfully. You are rewarded for your help.",
        image: "images/report_guards.jpg",
        choices: [
            { text: "Return to Class Selection", next: "restartGame" }
        ]
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

window.selectClass = selectClass;