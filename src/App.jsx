import { Route, Routes } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop.jsx'
import TabBar from './components/TabBar.jsx'
import Toaster from './components/Toaster.jsx'
import EditWorkout from './pages/EditWorkout.jsx'
import Home from './pages/Home.jsx'
import History from './pages/History.jsx'
import LogWorkout from './pages/LogWorkout.jsx'
import NotFound from './pages/NotFound.jsx'
import WorkoutDetail from './pages/WorkoutDetail.jsx'

export default function App() {
  return (
    <>
      <ScrollToTop />
      <main className="shell">
        <Routes>
          <Route index element={<Home />} />
          <Route path="log" element={<LogWorkout />} />
          <Route path="history" element={<History />} />
          <Route path="workout/:id" element={<WorkoutDetail />} />
          <Route path="workout/:id/edit" element={<EditWorkout />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <TabBar />
      <Toaster />
    </>
  )
}
