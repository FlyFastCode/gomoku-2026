import { useState, useCallback } from 'react'
import './index.css'

/**
 * 玩家类型
 */
type Player = 'black' | 'white' | null

/**
 * 棋盘大小
 */
const BOARD_SIZE = 15

/**
 * App 组件 - 五子棋游戏主组件
 * @returns {React.JSX.Element} 游戏主组件
 */
function App() {
  // 棋盘状态
  const [board, setBoard] = useState<Player[][]>(
    Array.from({ length: BOARD_SIZE }, () => Array(BOARD_SIZE).fill(null))
  )
  
  // 当前玩家
  const [currentPlayer, setCurrentPlayer] = useState<Player>('black')
  
  // 获胜者
  const [winner, setWinner] = useState<Player>(null)
  
  // 获胜连线
  const [winningLine, setWinningLine] = useState<[number, number][]>([])
  
  // 游戏历史
  const [history, setHistory] = useState<[number, number][]>([])

  /**
   * 检查是否获胜
   */
  const checkWin = useCallback((row: number, col: number, player: Player): [number, number][] | null => {
    if (!player) return null

    const directions = [
      [0, 1],   // 水平
      [1, 0],   // 垂直
      [1, 1],   // 对角线
      [1, -1],  // 反对角线
    ]

    for (const [dr, dc] of directions) {
      const line: [number, number][] = [[row, col]]
      
      // 正方向
      for (let i = 1; i < 5; i++) {
        const r = row + dr * i
        const c = col + dc * i
        if (r < 0 || r >= BOARD_SIZE || c < 0 || c >= BOARD_SIZE || board[r][c] !== player) break
        line.push([r, c])
      }
      
      // 反方向
      for (let i = 1; i < 5; i++) {
        const r = row - dr * i
        const c = col - dc * i
        if (r < 0 || r >= BOARD_SIZE || c < 0 || c >= BOARD_SIZE || board[r][c] !== player) break
        line.push([r, c])
      }
      
      if (line.length >= 5) {
        return line
      }
    }
    
    return null
  }, [board])

  /**
   * 处理点击
   */
  const handleClick = useCallback((row: number, col: number) => {
    if (board[row][col] || winner) return

    const newBoard = board.map(r => [...r])
    newBoard[row][col] = currentPlayer
    
    setBoard(newBoard)
    setHistory([...history, [row, col]])

    // 检查获胜
    const winLine = checkWin(row, col, currentPlayer)
    if (winLine) {
      setWinner(currentPlayer)
      setWinningLine(winLine)
    } else {
      setCurrentPlayer(currentPlayer === 'black' ? 'white' : 'black')
    }
  }, [board, currentPlayer, winner, history, checkWin])

  /**
   * 重新开始
   */
  const resetGame = useCallback(() => {
    setBoard(Array.from({ length: BOARD_SIZE }, () => Array(BOARD_SIZE).fill(null)))
    setCurrentPlayer('black')
    setWinner(null)
    setWinningLine([])
    setHistory([])
  }, [])

  /**
   * 悔棋
   */
  const undo = useCallback(() => {
    if (history.length === 0 || winner) return

    const newHistory = history.slice(0, -1)
    const [lastRow, lastCol] = history[history.length - 1]
    
    const newBoard = board.map(r => [...r])
    newBoard[lastRow][lastCol] = null
    
    setBoard(newBoard)
    setHistory(newHistory)
    setCurrentPlayer(currentPlayer === 'black' ? 'white' : 'black')
  }, [history, board, winner, currentPlayer])

  /**
   * 判断是否是获胜棋子
   */
  const isWinningPiece = (row: number, col: number): boolean => {
    return winningLine.some(([r, c]) => r === row && c === col)
  }

  return (
    <div className="app">
      <div className="game-container">
        <h1 className="game-title">🎮 五子棋</h1>
        
        <div className="game-info">
          {!winner ? (
            <div className="current-player">
              当前玩家：<span className={`player-icon ${currentPlayer}`}>{currentPlayer === 'black' ? '⚫' : '⚪'}</span>
            </div>
          ) : (
            <div className="winner">
              🏆 获胜者：<span className={`player-icon ${winner}`}>{winner === 'black' ? '⚫' : '⚪'}</span>
            </div>
          )}
        </div>

        <div className="board">
          {Array.from({ length: BOARD_SIZE }).map((_, row) => (
            <div key={row} className="board-row">
              {Array.from({ length: BOARD_SIZE }).map((_, col) => {
                const isWinning = isWinningPiece(row, col)
                const isLastMove = history.length > 0 && 
                  history[history.length - 1][0] === row && 
                  history[history.length - 1][1] === col
                
                return (
                  <div
                    key={col}
                    className={`cell ${board[row][col] ? 'occupied' : ''} ${isWinning ? 'winning' : ''}`}
                    onClick={() => handleClick(row, col)}
                  >
                    {board[row][col] && (
                      <div className={`piece ${board[row][col]} ${isWinning ? 'winning' : ''} ${isLastMove ? 'last-move' : ''}`} />
                    )}
                  </div>
                )
              })}
            </div>
          ))}
        </div>

        <div className="controls">
          <button className="btn btn-undo" onClick={undo} disabled={history.length === 0 || !!winner}>
            ↩️ 悔棋
          </button>
          <button className="btn btn-reset" onClick={resetGame}>
            🔄 重新开始
          </button>
        </div>

        {winner && (
          <div className="game-over-overlay">
            <div className="game-over-content">
              <div className="trophy">🏆</div>
              <h2>{winner === 'black' ? '黑棋' : '白棋'}获胜！</h2>
              <button className="btn btn-primary" onClick={resetGame}>
                🔄 再来一局
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
