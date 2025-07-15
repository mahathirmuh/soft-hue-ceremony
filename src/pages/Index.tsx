import HeroSection from "@/components/HeroSection";
import CountdownTimer from "@/components/CountdownTimer";
import EventDetails from "@/components/EventDetails";
import LoveStoryCarousel from "@/components/LoveStoryCarousel";
import PhotoGallery from "@/components/PhotoGallery";
import BankTransfer from "@/components/BankTransfer";
import RSVPForm from "@/components/RSVPForm";
import Guestbook from "@/components/Guestbook";
import AutoPlayMusic from "@/components/AutoPlayMusic";
import FireworksText from "@/components/FireworksText";
import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      {/* Admin Access Button */}
      <div className="fixed top-4 right-4 z-50">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => navigate("/admin")}
          className="bg-background/80 backdrop-blur-sm border-border/50 hover:bg-accent/50"
        >
          <Shield className="h-4 w-4 mr-2" />
          Admin
        </Button>
      </div>

      <AutoPlayMusic />
      <HeroSection />
      <CountdownTimer />
      <EventDetails />
      <LoveStoryCarousel />
      <PhotoGallery />
      <BankTransfer />
      <RSVPForm />
      <Guestbook />
      <FireworksText />
    </div>
  );
};

export default Index;
