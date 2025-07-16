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
