import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import NotFound from "../modules/NotFound";
import { Characters } from "../modules/characters/Characters";
import { Episodes } from "../modules/episodes/Episodes";
import { Locations } from "../modules/locations/Locations";
import { Episode } from "../modules/episodes/Episode";

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Characters />} />
        <Route path="/locations" element={<Locations />} />
        <Route path="/episodes" element={<Episodes />} />
        <Route path="/episode/:id" element={<Episode />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
