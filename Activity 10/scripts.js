const OUTPUT = document.getElementById('output');
function logOutput(...args)
{
    const text = args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ');
    console.log(...args);
    const p = document.createElement('div');
    p.textContent = text;
    OUTPUT.appendChild(p);
    OUTPUT.scrollTop = OUTPUT.scrollHeight;
}


function hasLocalStorage() 
{
    try
    {
        const testKey = '__test_ls';
        localStorage.setItem(testKey, '1');
        localStorage.removeItem(testKey);
        return true;
    } catch (e) 
    {
        return false;
    }
}

logOutput('localStorage supported?', hasLocalStorage());

if (hasLocalStorage())
    {
        localStorage.setItem('demo-string', 'hello world');
        localStorage.setItem('demo-number', String(42));
        localStorage.setItem('demo-object', JSON.stringify({ a: 1, b: 'two' }));
        localStorage.setItem('demo-array', JSON.stringify([1,2,3, {x:9}]));
        logOutput('demo-string', localStorage.getItem('demo-string'));
        logOutput('demo-number', Number(localStorage.getItem('demo-number')));
        logOutput('demo-object', JSON.parse(localStorage.getItem('demo-object')));
        logOutput('demo-array', JSON.parse(localStorage.getItem('demo-array')));
    } else 
        {
            logOutput('localStorage is not available in this environment.');
}


const boardEl = document.getElementById('board');
const statusEl = document.getElementById('status');
const newGameBtn = document.getElementById('newGameBtn');
const saveBtn = document.getElementById('saveBtn');
const clearStorageBtn = document.getElementById('clearStorageBtn');
const resetStatsBtn = document.getElementById('resetStatsBtn');
const statTotal = document.getElementById('stat-total');
const statX = document.getElementById('stat-xwins');
const statO = document.getElementById('stat-owins');
const statDraws = document.getElementById('stat-draws');
const CELLS = Array.from(document.querySelectorAll('.cell'));
const KEY_GAME = 'ttt-game';
const KEY_STATS = 'ttt-stats';

const defaultState = () => ({
    board: Array(9).fill(null), 
    currentPlayer: 'X',
    status: 'playing', 
    winner: null,
    winningCombo: null,
});


const defaultStats = () => ({
    total: 0,
    xWins: 0,
    oWins: 0,
    draws: 0,
});


let state = defaultState();
let stats = defaultStats();
const WIN_LINES = 
[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
];

function checkWinner(board) 
{

    for (const line of WIN_LINES) 
    {
        const [a,b,c] = line;
        const v = board[a];
        if (v && v === board[b] && v === board[c]) 
        {
            return { winner: v, combo: line };
        }
    }
    return null;
}

function checkDraw(board) 
{
  return board.every(cell => cell !== null);
}

function renderBoard() 
{

    for (let i = 0; i < CELLS.length; i++)
        {
        const el = CELLS[i];
        const val = state.board[i];
        el.textContent = val ? val : '';
        el.classList.remove('x','o','winning');
        if (val) el.classList.add(val.toLowerCase());
    }

    if (state.winningCombo && state.winner) 
        {
            state.winningCombo.forEach(i => 
                {
                    CELLS[i].classList.add('winning');
                }
            );
  }

  if (state.status === 'playing') 
    {
        statusEl.textContent = `Status: ${state.currentPlayer}'s turn`;
    } else if (state.status === 'won') 
    {
        statusEl.textContent = `Status: ${state.winner} wins!`;
    } else if (state.status === 'draw') 
    {
        statusEl.textContent = `Status: Draw game`;
    }
}


function initNewGame(startingPlayer = null) 
{
    state = defaultState();
    if (startingPlayer === 'O') state.currentPlayer = 'O';
    saveGameToStorage(); 
    renderBoard();
    logOutput('New game initialized', state);
}

function makeMove(index) 
{
    if (state.status !== 'playing') 
    {
        logOutput('Ignored move - game not playing.');
        return;
    }
    if (state.board[index]) 
    {
        logOutput('Cell already taken', index);
        return;
    }
    state.board[index] = state.currentPlayer;
    const win = checkWinner(state.board);
    if (win) 
    {
        state.status = 'won';
        state.winner = win.winner;
        state.winningCombo = win.combo;
        updateStatsOnResult(win.winner);
        logOutput('Winner detected', win);
    } else if (checkDraw(state.board)) 
    {
        state.status = 'draw';
        updateStatsOnResult('draw');
        logOutput('Game ended in draw');
    } else 
    {
        state.currentPlayer = (state.currentPlayer === 'X') ? 'O' : 'X';
    }
    renderBoard();
    saveGameToStorage();
}


function loadStatsFromStorage() 
{
    const raw = localStorage.getItem(KEY_STATS);
  if (raw) 
    {
        try
        {
            stats = JSON.parse(raw);
        } catch (e) 
        {
            console.warn('Failed to parse stats, resetting.');
            stats = defaultStats();
        }
    } else 
    {
            stats = defaultStats();
    }
    renderStats();
}

function saveStatsToStorage() 
{
    localStorage.setItem(KEY_STATS, JSON.stringify(stats));
    renderStats();
}

function updateStatsOnResult(result) 
{
    stats.total += 1;
    if (result === 'X') stats.xWins += 1;
    else if (result === 'O') stats.oWins += 1;
    else if (result === 'draw') stats.draws += 1;
    saveStatsToStorage();
}

function renderStats()
{
    statTotal.textContent = stats.total;
    statX.textContent = stats.xWins;
    statO.textContent = stats.oWins;
    statDraws.textContent = stats.draws;
}


function saveGameToStorage() 
{
    if (!hasLocalStorage()) return;
    localStorage.setItem(KEY_GAME, JSON.stringify(state));
    logOutput('Auto-saved game to localStorage');
}

function loadGameFromStorage() 
{
    if (!hasLocalStorage()) 
        {
            logOutput('localStorage not supported; cannot load game');
            return false;
        }
    const raw = localStorage.getItem(KEY_GAME);
    if (!raw) 
        {
            logOutput('No saved game found in localStorage');
            return false;
        }
    try 
    {
        const loaded = JSON.parse(raw);
        if (!Array.isArray(loaded.board) || loaded.board.length !== 9) 
        {
            throw new Error('Invalid board shape');
        }
        state = 
        {
            board: loaded.board.map(v => (v === 'X' || v === 'O' ? v : null)),
            currentPlayer: loaded.currentPlayer || 'X',
            status: loaded.status || 'playing',
            winner: loaded.winner || null,
            winningCombo: loaded.winningCombo || null,
        };

        logOutput('Loaded game from storage', state);
        renderBoard();
        return true;
    } catch (e) 
    {
        console.warn('Failed to load saved game:', e);
        return false;
    }
}

function clearAllStorage() 
{
    if (!hasLocalStorage()) return;
    localStorage.removeItem(KEY_GAME);
    localStorage.removeItem(KEY_STATS);
    logOutput('Removed ttt keys from localStorage');
}

function cellClickedHandler(e) 
{
    const index = Number(e.currentTarget.dataset.index);
    makeMove(index);
}

CELLS.forEach(cell => 
    {
        cell.addEventListener('click', cellClickedHandler);
        cell.addEventListener('keydown', (ev) => {
        if (ev.key === 'Enter' || ev.key === ' ') 
            {
                ev.preventDefault();
                cell.click();
            }
        });
    });
newGameBtn.addEventListener('click', () => 
    {
        initNewGame();
});

saveBtn.addEventListener('click', () => 
{
    saveGameToStorage();
    logOutput('Manual save triggered.');
});

clearStorageBtn.addEventListener('click', () => 
{
    clearAllStorage();
    initNewGame();
    stats = defaultStats();
    saveStatsToStorage();
    renderStats();
    logOutput('Cleared all storage and reset game & stats.');
});

resetStatsBtn.addEventListener('click', () => 
{
    stats = defaultStats();
    saveStatsToStorage();
    renderStats();
    logOutput('Game statistics reset.');
});

function appInit() 
{
    logOutput('App initializing...');
    loadStatsFromStorage();
    const restored = loadGameFromStorage();
    if (!restored) 
    {
        initNewGame();
    } else
    {
        renderStats();
    }
}

appInit();


