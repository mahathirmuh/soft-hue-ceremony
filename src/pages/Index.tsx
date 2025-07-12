import HeroSection from "@/components/HeroSection";
import CountdownTimer from "@/components/CountdownTimer";
import EventDetails from "@/components/EventDetails";
import PhotoGallery from "@/components/PhotoGallery";
import BankTransfer from "@/components/BankTransfer";
import RSVPForm from "@/components/RSVPForm";
import Guestbook from "@/components/Guestbook";
import AutoPlayMusic from "@/components/AutoPlayMusic";
import FireworksText from "@/components/FireworksText";

const Index = () => {
  return (
    <div className="min-h-screen">
      <AutoPlayMusic />
      <HeroSection />
      <CountdownTimer />
      <EventDetails />
      <PhotoGallery />
      <BankTransfer />
      <RSVPForm />
      <Guestbook />
      <FireworksText />
    </div>
  );
};

export default Index;
