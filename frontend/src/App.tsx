import { Routes, Route, Navigate } from "react-router-dom";
import Landing from "./pages/Landing";
import Onboarding from "./pages/Onboarding";
import Dashboard from "./pages/Dashboard";
import Roadmap from "./pages/Roadmap";
import KnowledgeGraphPage from "./pages/KnowledgeGraphPage";
import Progress from "./pages/Progress";
import Resources from "./pages/Resources";
import Learn from "./pages/Learn";
import Assessment from "./pages/Assessment";
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/onboarding" element={<Onboarding />} />
      <Route path="/assessment" element={<Assessment />} />
      <Route path="/assessment/:assessmentId" element={<Assessment />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/roadmap" element={<Roadmap />} />
      <Route path="/knowledge-graph" element={<KnowledgeGraphPage />} />
      <Route path="/progress" element={<Progress />} />
      <Route path="/resources" element={<Resources />} />
      <Route path="/learn/:conceptId" element={<Learn />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
