import { useState } from 'react'

/**
 * App 组件 - 主应用程序入口
 * @returns {React.JSX.Element} React 应用程序主组件
 */
function App() {
  const [count, setCount] = useState<number>(0)

  return (
    <div className="app">
      <h1>OSQuestTemplate React App</h1>
      <p>欢迎使用 React + TypeScript + Vite 基础框架</p>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
    </div>
  )
}

export default App
