var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;

// You can also log multiple logs
console.log(playerName, playerAttack, playerHealth);

var enemyName = "Roborto";
var enemyHealth = 50;
var enemyAttack = 12;

// function created
var fight = function() {
    // Alerts users the Round started
    window.alert("Welcome to Robot Gladiators!");

    // Subtract the value of 'playerAttack' from the value of 'enemyHealth' and update 'enemyHealth'
    enemyHealth = enemyHealth - playerAttack;

    // Log a resulting message to the console so we know it worked
    console.log(
        playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining."
    );

    // Checks enemy's Health
    if (enemyHealth <= 0) {
        window.alert(enemyName + " has died!");
    }
    else {
        window.alert(enemyName + " still has " + enemyHealth + " health left.");
    }

    // Subtract the value of 'enemyAttack' from the value of 'playerHealth' and update 'playerHealth'
    playerHealth = playerHealth - enemyAttack;

    // Log a resulting message to the console so that we know this worked
    console.log(
        enemyName + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " health remaining."
    );

    // Check player's health
    if (playerHealth <= 0) {
        window.alert(playerName + " has died!");
    }
    else {
        window.alert(playerName + " still has " + playerHealth + " health left.");
    }
};

// function execute
fight();