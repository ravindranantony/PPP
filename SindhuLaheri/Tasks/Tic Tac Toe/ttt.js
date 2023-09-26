const board = document.getElementById('board');
        const message = document.getElementById('message');
        const cells = [];
        let currentPlayer = '💙';
        let winner = null;
        let isComputerTurn = false;
      
        // Create the Tic-Tac-Toe grid
        for (let i = 0; i < 9; i++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.index = i;
            cell.addEventListener('click', handleCellClick);
            cells.push(cell);
            board.appendChild(cell);
        }

        // Handle cell clicks
        function handleCellClick(event) {
            const cell = event.target;
            const index = cell.dataset.index;

            if (cells[index].textContent || winner || isComputerTurn) {
                return;
            }

            cells[index].textContent = currentPlayer;
            currentPlayer = currentPlayer === '💙' ? '🔴' : '💙';

            checkWinner();
            
            if (!winner) {
                setTimeout(computerMove, 500); // Introduce a delay for the computer's move
            }
        }

        // Check for a winner
        function checkWinner() {
            const winningCombinations = [
                [0, 1, 2], [3, 4, 5], [6, 7, 8],
                [0, 3, 6], [1, 4, 7], [2, 5, 8],
                [0, 4, 8], [2, 4, 6]
            ];

            for (const combination of winningCombinations) {
                const [a, b, c] = combination;
                if (cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent) {
                    cells[a].style.backgroundColor = 'green';
                    cells[b].style.backgroundColor = 'green';
                    cells[c].style.backgroundColor = 'green';
                    winner = cells[a].textContent;
                    message.textContent = `${winner} wins!`;
                    
                    return;
                }
            }

            if (![...cells].some(cell => cell.textContent === '')) {
                message.textContent = "It's a draw!";
                
                    return;
            }
        }
        
        
        // Computer's move (random)
        
        function computerMove()
        {
        const emptyCells = cells.filter(cell => !cell.textContent);
            if (emptyCells.length === 0 || winner) {
                return;
            }

        const winningCombinations = [
                [0, 1, 2], [3, 4, 5], [6, 7, 8],
                [0, 3, 6], [1, 4, 7], [2, 5, 8],
                [0, 4, 8], [2, 4, 6]
            ];

            for (const combination of winningCombinations) {
                const [a, b, c] = combination;
                if (cells[a].textContent && cells[a].textContent === cells[b].textContent) {
                if (!cells[c].textContent)
                {
                cells[c].textContent = currentPlayer;
                currentPlayer = currentPlayer === '💙' ? '🔴' : '💙';

            checkWinner();
            return;
                }
                }
                
                if (cells[b].textContent && cells[b].textContent === cells[c].textContent) {
                if (!cells[a].textContent)
                {
                cells[a].textContent = currentPlayer;
                currentPlayer = currentPlayer === '💙' ? '🔴' : '💙';

            checkWinner();
            return;
                }
                }
                
                if (cells[c].textContent && cells[c].textContent === cells[a].textContent) {
                if (!cells[b].textContent)
                {
                cells[b].textContent = currentPlayer;
                currentPlayer = currentPlayer === '💙' ? '🔴' : '💙';

            checkWinner();
            return;
                }
                }
                }
       
            const randomIndex = Math.floor(Math.random() * emptyCells.length);
            const randomCell = emptyCells[randomIndex];
            randomCell.textContent = currentPlayer;
            currentPlayer = currentPlayer === '💙' ? '🔴' : '💙';

            checkWinner();
        }
        function restartGame() {
            currentPlayer = '💙';
            gameBoard = ['', '', '', '', '', '', '', '', ''];
            gameActive = true;
            document.getElementById('status').innerText = "Player 💙's turn";
        
            const cells = document.getElementsByClassName('cell');
            for (let i = 0; i < cells.length; i++) {
                cells[i].innerText = '';
            }
        }
        
        document.getElementById('status').innerText = "Player 💙's turn";
        
    
