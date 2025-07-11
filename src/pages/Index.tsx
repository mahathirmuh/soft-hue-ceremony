import HeroSection from "@/components/HeroSection";
import CountdownTimer from "@/components/CountdownTimer";
import EventDetails from "@/components/EventDetails";
import PhotoGallery from "@/components/PhotoGallery";
import RSVPForm from "@/components/RSVPForm";
import Guestbook from "@/components/Guestbook";

const Index = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <CountdownTimer />
      <EventDetails />
      <PhotoGallery />
      <RSVPForm />
      <Guestbook />
    </div>
  );
};

export default Index;
