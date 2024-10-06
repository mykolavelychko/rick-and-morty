import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import NotFound from "../modules/NotFound";
import { Character } from "../modules/characters/Character";
import { Characters } from "../modules/characters/Characters";
import { Episode } from "../modules/episodes/Episode";
import { Episodes } from "../modules/episodes/Episodes";
import { Location } from "../modules/locations/Location";
import { Locations } from "../modules/locations/Locations";
import AppLayout from "./AppLayout";

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Characters />} />
          <Route path="characters" element={<Characters />} />
          <Route path="characters/:id" element={<Character />} />
          <Route path="locations" element={<Locations />} />
          <Route path="locations/:id" element={<Location />} />
          <Route path="episodes" element={<Episodes />} />
          <Route path="episodes/:id" element={<Episode />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default AppRouter;
