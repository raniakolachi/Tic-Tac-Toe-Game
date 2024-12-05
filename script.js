document.addEventListener("DOMContentLoaded", () => {
    const boxes = document.querySelectorAll(".box");
    const resetBtn = document.querySelector("#reset-btn");
    const newGameBtn = document.querySelector("#new-btn");
    const msgContainer = document.querySelector(".msg-container");
    const msg = document.querySelector("#msg");

    let turno = true; // 'true' means 'O', 'false' means 'X'

    const winPatterns = [
        [0, 1, 2], // Top row
        [3, 4, 5], // Middle row
        [6, 7, 8], // Bottom row
        [0, 3, 6], // Left column
        [1, 4, 7], // Middle column
        [2, 5, 8], // Right column
        [0, 4, 8], // Diagonal top-left to bottom-right
        [2, 4, 6], // Diagonal top-right to bottom-left
    ];

    // Function to check for a winner
    const checkWinner = () => {
        for (let pattern of winPatterns) {
            const [a, b, c] = pattern;
            const boxA = boxes[a].innerText;
            const boxB = boxes[b].innerText;
            const boxC = boxes[c].innerText;

            // Check if all three boxes in the pattern have the same value and are not empty
            if (boxA !== "" && boxA === boxB && boxB === boxC) {
                showWinner(boxA); // Pass the winner ("O" or "X")
                return true;
            }
        }

        // Check for a draw
        const isDraw = [...boxes].every((box) => box.innerText !== "");
        if (isDraw) {
            msg.innerText = "It's a Draw!";
            msgContainer.classList.remove("hide");
            disableBoxes();
            return true;
        }

        return false; // No winner or draw yet
    };

    // Function to display the winner
    const showWinner = (winner) => {
        msg.innerText = `Congratulations! Winner is ${winner}`;
        msgContainer.classList.remove("hide");
        disableBoxes();
    };

    // Disable all boxes
    const disableBoxes = () => {
        boxes.forEach((box) => {
            box.disabled = true;
        });
    };

    // Reset the game
    const resetGame = () => {
        boxes.forEach((box) => {
            box.innerText = "";
            box.disabled = false;
        });
        turno = true; // Reset turn to "O"
        msgContainer.classList.add("hide");
    };

    // Add click events to the boxes
    boxes.forEach((box) => {
        box.addEventListener("click", () => {
            if (box.innerText === "") {
                box.innerText = turno ? "O" : "X";
                turno = !turno; // Toggle turn
                box.disabled = true; // Disable clicked box
                checkWinner(); // Check for a winner or draw after every move
            }
        });
    });

    // Add event listeners for Reset and New Game buttons
    resetBtn.addEventListener("click", resetGame);
    newGameBtn.addEventListener("click", resetGame);
});
