// Game States
// "WIN" - Player robot has defeated all enemy robots
//    * Fight all enemy robots
//    * Defeat each enemy robot
// "LOSE" - Player robot's health is zero or less

var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

// You can also log multiple logs
console.log(playerName, playerAttack, playerHealth);

var enemyNames = ["Roborto", "Amy Android", "Robo Trumble"];
var enemyHealth = 50;
var enemyAttack = 12;

// function created
var fight = function(enemyNames) {
    // To repeat and execute 'fight' as long as robot's are alive
    while(enemyHealth > 0 && playerHealth > 0) {

    // Fighting Prompt to ask to FIGHT or SKIP
    var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");

    // If player chooses skip
    if (promptFight === "skip" || promptFight === "SKIP") {
        // Area to confirm if user wants to skip
        var confirmSkip = window.confirm("Are you sure you'd like to quit?");

    // if yes, leave fight
    if (confirmSkip) {
        window.alert(playerName + " has decided to skip this fight. Goodbye!");
            // Money now subtracted from total 'playerMoney'
            playerMoney = playerMoney - 10;
            console.log("PlayerMoney", playerMoney)
            break;
        }
    }
        
    // Subtract the value of 'playerAttack' from the value of 'enemyHealth' and update 'enemyHealth'
    enemyHealth = enemyHealth - playerAttack;
        
    // Log a resulting message to the console so we know it worked
    console.log(
        playerName + " attacked " + enemyNames + ". " + enemyNames + " now has " + enemyHealth + " health remaining."
    );

    // Checks enemy's Health
    if (enemyHealth <= 0) {
        window.alert(enemyNames + " has died!");

        // Award
        playerMoney = playerMoney + 20;
        
        // To leave if enemy is dead
        break;
    } else {
        window.alert(enemyNames + " still has " + enemyHealth + " health left.");
    }

    // Subtract the value of 'enemyAttack' from the value of 'playerHealth' and update 'playerHealth'
    playerHealth = playerHealth - enemyAttack;

    // Log a resulting message to the console so that we know this worked
    console.log(
        enemyNames + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " health remaining."
    );

    // Check player's health
    if (playerHealth <= 0) {
        
        // To notify player that the game has lost
        window.alert("You have lost your robot in battle! Game Over!");
        break;

    } else {
        window.alert(playerName + " still has " + playerHealth + " health left.");
    }
}
};

// function execute
for (var i = 0; i < enemyNames.length; i++) {
    if (playerHealth > 0) {
        // Shows player what round they're in
        window.alert("Welcome to Robot Gladiators! Round " + ( i + 1 ) );

        // Made a new name for 'enemyName[i] just for the fight function
        var pickedEnemyName = enemyNames[i];
    
        // Resets 'enemyHealth' before starting new fight
        enemyHealth = 50;

        // Allows us to see what may go wrong in the code
        // debugger;

        fight(pickedEnemyName);
    }
}