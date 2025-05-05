function jokenpoGame() {
    let score = 0;
    const choices = ["Papel", "Pedra", "Tesoura"];

    while (true) {
        console.log("Escolha uma opção:1 - Papel");
        console.log("2 - Pedra");
        console.log("3 - Tesoura");

        const playerChoice = parseInt(prompt());
        
        if (playerChoice < 1 || playerChoice > 3 || isNaN(playerChoice)) {
            console.log("Você perdeu! Sua pontuação foi de " + score);
            break;
        }

        const computerChoice = Math.floor(Math.random() * 3) + 1;
        console.log(`O computador jogou ${choices[computerChoice - 1]}`);

        if (
            (playerChoice === 1 && computerChoice === 2) || // Papel ganha de Pedra
            (playerChoice === 2 && computerChoice === 3) || // Pedra ganha de Tesoura
            (playerChoice === 3 && computerChoice === 1)    // Tesoura ganha de Papel
        ) {
            score++;
            console.log("Você venceu esta rodada!");
        } else if (playerChoice === computerChoice) {
            console.log("Empate! Jogue novamente.");
        } else {
            console.log("Você perdeu! Sua pontuação foi de " + score);
            break;
        }
    }
}

jokenpoGame();