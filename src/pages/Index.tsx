import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import UploadSection from "@/components/UploadSection";
import ClinicalPredictionForm from "@/components/ClinicalPredictionForm";
import SymptomChecker from "@/components/SymptomChecker";
import BrainRegionAnalysis from "@/components/BrainRegionAnalysis";
import ComparisonTimeline from "@/components/ComparisonTimeline";
import RiskAssessment from "@/components/RiskAssessment";
import DashboardSection from "@/components/DashboardSection";
import InfoSection from "@/components/InfoSection";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <HeroSection />
    <UploadSection />
    <ClinicalPredictionForm />
    <SymptomChecker />
    <BrainRegionAnalysis />
    <ComparisonTimeline />
    <RiskAssessment />
    <DashboardSection />
    <InfoSection />
    <Footer />
  </div>
);

export default Index;
