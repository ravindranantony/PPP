const board = document.getElementById('board');
        const message = document.getElementById('message');
        let currentPlayer = 'X';
        let gameOver = false;

        // Create the cells
        for (let i = 0; i < 9; i++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.dataset.index = i;
            board.appendChild(cell);
        }

        // Handle cell clicks
        board.addEventListener('click', (e) => {
            if (gameOver) return;
            
            const cell = e.target;
            if (cell.classList.contains('cell') && !cell.textContent) {
                cell.textContent = currentPlayer;
                checkWinner();
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                message.textContent = currentPlayer === 'X' ? "Your turn" : "Computer's turn";
                
                // Simulate the computer's move (you can replace this with your AI logic)
                setTimeout(computerMove, 500);
            }
        });

        // Check for a winner
        function checkWinner() {
            const cells = Array.from(document.querySelectorAll('.cell'));
            const winningCombos = [
                [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
                [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
                [0, 4, 8], [2, 4, 6] // Diagonals
            ];

            for (const combo of winningCombos) {
                const [a, b, c] = combo;
                if (cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent) {
                    message.textContent = `${currentPlayer === 'X' ? "You" : "Computer"} wins!`;
                    gameOver = true;
                    return;
                }
            }

            if (cells.every(cell => cell.textContent)) {
                message.textContent = "It's a draw!";
                gameOver = true;
            }
        }

        // Simulate the computer's move (random move)
        function computerMove() {
            const emptyCells = Array.from(document.querySelectorAll('.cell')).filter(cell => !cell.textContent);
            if (emptyCells.length > 0 && !gameOver) {
                const randomIndex = Math.floor(Math.random() * emptyCells.length);
                emptyCells[randomIndex].textContent = currentPlayer;
                checkWinner();
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                message.textContent = "Your turn";
            }
        }
        function restartGame() {
            currentPlayer = 'X';
            gameBoard = ['', '', '', '', '', '', '', '', ''];
            gameActive = true;
            document.getElementById('status').innerText = "Player X's turn";
        
            const cells = document.getElementsByClassName('cell');
            for (let i = 0; i < cells.length; i++) {
                cells[i].innerText = '';
            }
        }
        
        document.getElementById('status').innerText = "Player X's turn";
        