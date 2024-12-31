import { BrowserRouter, Route, Routes } from "react-router"
import { MainWindow } from "./components/MainWindow"
import { AuthPage } from "./pages/AuthPage"
import { useAuth } from "./context/AuthContext"

function App() {

  const {user} = useAuth()

  return (
    <div className='max-h-screen bg-[#2C2C2C]'>
      {/* <MainWindow /> */}
      <BrowserRouter>
        <Routes>
          <Route path='/' element={user ? <MainWindow /> : <AuthPage />} />
          <Route path='*' element={<h1>Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App