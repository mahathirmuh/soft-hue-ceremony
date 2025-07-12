import { Calendar, Clock, MapPin, Phone } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import venueImage from "@/assets/venue.jpg";

const EventDetails = () => {
  const handleDirections = () => {
    window.open('https://maps.google.com/?q=Masjid+Agung+Al-Ikhlas+Penajam+Paser+Utara', '_blank');
  };

  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            Wedding Details
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join us for a celebration of love, laughter, and happily ever after
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Event Information */}
          <div className="space-y-8">
            <Card className="p-8 bg-card shadow-soft border-border/50 hover:shadow-elegant transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="bg-primary-soft p-3 rounded-full">
                  <Calendar className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Date</h3>
                  <p className="text-lg text-muted-foreground">Saturday, June 6, 2026</p>
                </div>
              </div>
            </Card>

            <Card className="p-8 bg-card shadow-soft border-border/50 hover:shadow-elegant transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="bg-secondary-soft p-3 rounded-full">
                  <Clock className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Time</h3>
                  <p className="text-lg text-muted-foreground mb-1">Ceremony: 8:00 AM</p>
                  <p className="text-lg text-muted-foreground">Reception: 9:00 AM</p>
                </div>
              </div>
            </Card>

            <Card className="p-8 bg-card shadow-soft border-border/50 hover:shadow-elegant transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="bg-accent-soft p-3 rounded-full">
                  <MapPin className="w-6 h-6 text-accent" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-foreground mb-2">Venue</h3>
                  <p className="text-lg text-muted-foreground mb-3">
                    Masjid Agung Al-Ikhlas<br />
                    Penajam Paser Utara<br />
                    Kalimantan Timur, Indonesia
                  </p>
                  <Button 
                    onClick={handleDirections}
                    variant="outline" 
                    className="border-accent text-accent hover:bg-accent hover:text-accent-foreground"
                  >
                    <MapPin className="w-4 h-4 mr-2" />
                    Get Directions
                  </Button>
                </div>
              </div>
            </Card>

          </div>

          {/* Venue Image */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl shadow-elegant">
              <img 
                src={venueImage} 
                alt="Wedding Venue" 
                className="w-full h-[600px] object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent"></div>
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-xl"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-secondary/10 rounded-full blur-xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventDetails;