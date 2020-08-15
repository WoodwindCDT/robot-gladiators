// Game States
// "WIN" - Player robot has defeated all enemy robots
//    * Fight all enemy robots
//    * Defeat each enemy robot
// "LOSE" - Player robot's health is zero or less

// The function to generate our random numbers
var randomNumber = function(min, max) {
    var value = Math.floor(Math.random() * (max - min + 1) + min);

    return value;
};

var fightOrSkip = function() {
    // ask user if they'd like to fight or skip using  function
    var promptFight = window.prompt('Would you like FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose.');
  
    // Conditional Recursive Function Call
    if (promptFight === "" || promptFight === null) {
    window.alert("You need to provide a valid answer! Please try again.");
    return fightOrSkip();
    }

    promptFight = promptFight.toLowerCase();

    // if user picks "skip" confirm and then stop the loop
    if (promptFight === "skip" || promptFight === "SKIP") {
      // confirm user wants to skip
      var confirmSkip = window.confirm("Are you sure you'd like to quit?");
  
      // if yes (true), leave fight
      if (confirmSkip) {
        window.alert(playerInfo.name + " has decided to skip this fight. Goodbye!");
        // subtract money from playerMoney for skipping
        playerInfo.playerMoney = playerInfo.money - 10;
        shop();
        return true;
      }
      return false;
    }
  }

// function created
var fight = function(enemy) {

    // To keep track of who goes first
    var isPlayerTurn = true;
    // Randomly select player's turn order
    if (Math.random() > 0.5) {
        isPlayerTurn = false;
    }

    // To repeat and execute 'fight' as long as robot's are alive
    while(enemy.health > 0 && playerInfo.health > 0) {
        if (isPlayerTurn) {

        if (fightOrSkip()) {
            // if player skips fight > break loop
            break;
    }
    
        // New Max.math expression allows us to limit the total health to only the greatest number. any negative numbers will cause it to display 0.
        // To generate random damage value based player's attack damage
        var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);

        enemy.health = Math.max(0, enemy.health - damage);
        
        // Log a resulting message to the console so we know it worked
        console.log(
            playerInfo.name + " attacked " + enemy.name + ". " + enemy.name + " now has " + enemy.health + " health remaining."
        );

        // Checks enemy's Health
        if (enemy.health <= 0) {
            window.alert(enemy.name + " has died!");

            // Award
            playerInfo.money = playerInfo.money + 20;
        
            // To leave if enemy is dead
            break;
        } else {
            window.alert(enemy.name + " still has " + enemy.health + " health left.");
        }

        // Random damage given to enemyAttack to playerHealth
        var damage = randomNumber(enemy.attack - 3, enemy.attack);
        // Subtract the value of 'enemyAttack' from the value of 'playerHealth' and update 'playerHealth'
        playerInfo.health = Math.max(0, playerInfo.health - damage);

        // Log a resulting message to the console so that we know this worked
        console.log(
            enemy.name + " attacked " + playerInfo.name + ". " + playerInfo.name + " now has " + playerInfo.health + " health remaining."
        );

        // Check player's health
        if (playerInfo.health <= 0) {
            window.alert(playerInfo.name + " has died!");
            // To leave loop while player is dead
            break;
        } else {
            window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
        }
        }
        // To switch turn order for the next round
        isPlayerTurn = !isPlayerTurn;
    }
};

// function execute & // function to start a new game
var startGame = function() {
    // To reset player states each execute
    playerInfo.reset();
    // Start of func.
    for (var i = 0; i < enemyInfo.length; i++) {
        if (playerInfo.health > 0) {
            // Shows player what round they're in
            window.alert("Welcome to Robot Gladiators! Round " + ( i + 1 ) );

            // Made a new name for 'enemyName[i] just for the fight function
            var pickedEnemyObj = enemyInfo[i];
    
            // Resets 'enemyHealth' before starting new fight
            pickedEnemyObj.health = randomNumber(40, 60);

            // Allows us to see what may go wrong in the code
            // debugger;

            fight(pickedEnemyObj);

            // If the player is not fighting the last enemy in array
            if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
                // To ask if the user wants to use the shop
                var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");
                
                // If yes, take player to the store
                if (storeConfirm) {
                    shop();
                }
            }
        }
    }
    // At a point, the player will be out of life or enemies, so initiate endGame function
    endGame()
};

// Ending the Game
var endGame = function() {
    
    // This is for if the player's robot is still alive
    if (playerInfo.health > 0) {
        window.alert("Great job, you've survived the game! You now have a score of " + playerInfo.money + ".");
    }
    else {
        window.alert("You've lost your robot in battle.");
    }

    // To ask player if they want to play again
    var playAgainConfirm = window.confirm("Would you like to play again?");

    if (playAgainConfirm) {
        // Restart Game
        startGame();
    }
    else {
        window.alert("Thank you for playing Robot Gladiators! Come back soon!");
    }
};

var shop = function() {
    // To ask what player wants to do
    var shopOptionPrompt = window.prompt(
        "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one 1 for REFILL, 2 for UPGRADE, or 3 for LEAVE."
    );
    // Switch to continue shop option
    shopOptionPrompt = parseInt(shopOptionPrompt);
    switch (shopOptionPrompt) { 
        case 1:
            playerInfo.refillHealth();
            break;

        case 2:
            playerInfo.upgradeAttack();
            break;
            
        case 3:
            window.alert("Leaving the store.");

            // Does nothing, so function can end
            break;
        
        default:
            window.alert("You did not pick a valid option. Try again.");

            // This allows js to call shop again to force player to pick an option after incorrect input
            shop();
            break;
    }
};

// Function to set name
var getPlayerName = function () {
    var name = "";
    
    while (name === "" || name === null) {
        name = prompt("What is your robot's name?");
    }

    console.log("Your robot's name is " + name);
    return name;
};

var playerInfo = {
    name: getPlayerName(),
    health: 100,
    attack: 10,
    money: 10,
    reset: function() {
        this.health = 100;
        this.attack = 10;
        this.money = 10;
    }, 
    refillHealth: function() {
        if (this.money >= 7) {
            window.alert("Refilling player's health by 20 for 7 dollars.");
            this.health += 20;
            this.money -= 7;
        }
        else {
            window.alert("You don't have enough money!");
        }
    },
    upgradeAttack: function() {
        if (this.money >= 7) {
            window.alert("Upgrading player's attack by 6 for 7 dollars.");
            this.attack += 6;
            this.money -= 7;
        }   
        else {
        window.alert("You don't have enough money!");
        }
    }
};

// Array of Enemy info
var enemyInfo = [
    {
      name: "Roborto",
      attack: randomNumber(10, 14)
    },
    {
      name: "Amy Android",
      attack: randomNumber(10, 14)
    },
    {
      name: "Robo Trumble",
      attack: randomNumber(10, 14)
    }
];

// Execute to start the game
startGame();