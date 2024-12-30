import { BrowserRouter, Route, Routes } from "react-router"
import { MainWindow } from "./components/MainWindow"
import { AuthPage } from "./pages/AuthPage"

function App() {

  return (
    <div className='max-h-screen bg-[#2C2C2C]'>
      {/* <MainWindow /> */}
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<MainWindow />} />
          <Route path="/auth" element={<AuthPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
