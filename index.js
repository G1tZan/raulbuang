const gridContainer = document.querySelector(".field");
    let cards = [
      { "name": "heart", "image": "heart.png" },
      { "name": "diamond", "image": "diamond.png" },
      { "name": "clove", "image": "clove.png" },
      { "name": "spade", "image": "spade.png" },
      { "name": "queen", "image": "queen.png" },
      { "name": "king", "image": "king.png" }
      // Add more card objects as needed
    ];
    let firstCard, secondCard;
    let lockBoard = false;
    let score = 0;

    document.querySelector(".score").textContent = score;

    shuffleCards();
    generateCards();

    function shuffleCards() {
      let currentIndex = cards.length,
        randomIndex,
        temporaryValue;
      while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = cards[currentIndex];
        cards[currentIndex] = cards[randomIndex];
        cards[randomIndex] = temporaryValue;
      }
    }

    function generateCards() {
      for (let i = 0; i < 9; i++) { // Adjust to match the number of cards needed
        const cardElement = document.createElement("div");
        cardElement.classList.add("card");
        cardElement.setAttribute("data-name", cards[i % cards.length].name);
        cardElement.innerHTML = `
          <img class="front-image" src=${cards[i % cards.length].image} />
        `;
        gridContainer.appendChild(cardElement);
        cardElement.addEventListener("click", flipCard);
      }
    }

    function flipCard() {
      if (lockBoard) return;
      if (this === firstCard) return;

      this.classList.add("flipped");

      if (!firstCard) {
        firstCard = this;
        return;
      }

      secondCard = this;
      score++;
      document.querySelector(".score").textContent = score;
      lockBoard = true;

      checkForMatch();
    }

    function checkForMatch() {
      let isMatch = firstCard.dataset.name === secondCard.dataset.name;

      isMatch ? disableCards() : unflipCards();
    }

    function disableCards() {
      firstCard.removeEventListener("click", flipCard);
      secondCard.removeEventListener("click", flipCard);

      resetBoard();
    }

    function unflipCards() {
      setTimeout(() => {
        firstCard.classList.remove("flipped");
        secondCard.classList.remove("flipped");
        resetBoard();
      }, 1000);
    }

    function resetBoard() { 
      firstCard = null;
      secondCard = null;
      lockBoard = false;
    }

    function restart() {
      resetBoard();
      shuffleCards();
      score = 0;
      document.querySelector(".score").textContent = score;
      gridContainer.innerHTML = "";
      generateCards();
    }
