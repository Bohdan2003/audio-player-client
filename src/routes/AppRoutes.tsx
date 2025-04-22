import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
//pages
import { MainPage } from "../pages/MainPage.tsx";
import { TracksPage } from "../pages/TracksPage/TracksPage.tsx";

export const AppRoutes: React.FC = () => {
  return (<BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage/>} />
        <Route path="/tracks/:page?" element={<TracksPage/>}/>
      </Routes>
  </BrowserRouter>)
}