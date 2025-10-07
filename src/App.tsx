import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LandRecordsProvider } from "@/context/LandRecordsContext";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import AddLand from "./pages/AddLand";
import HistoryDisputes from "./pages/HistoryDisputes";
import MeasurementTool from "./pages/MeasurementTool";
import MapView from "./pages/MapView";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LandRecordsProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/add-land" element={<AddLand />} />
            <Route path="/history-disputes" element={<HistoryDisputes />} />
            <Route path="/measurement-tool" element={<MeasurementTool />} />
            <Route path="/map-view" element={<MapView />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </LandRecordsProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
