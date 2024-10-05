import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NotFound from "../modules/NotFound";
import { Characters } from "../modules/characters/Characters";

const Locations = () => <div>Locations Component</div>;
const Episodes = () => <div>Episodes Component</div>;

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Characters />} />
        <Route path="/locations" element={<Locations />} />
        <Route path="/episodes" element={<Episodes />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
