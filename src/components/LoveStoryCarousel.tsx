import { useState } from "react";
import { Heart, Calendar, MapPin } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

interface LoveStoryMoment {
  id: number;
  title: string;
  date: string;
  location?: string;
  description: string;
  image: string;
}

const loveStoryMoments: LoveStoryMoment[] = [
  {
    id: 1,
    title: "Pertemuan Pertama",
    date: "January 2020",
    location: "Jakarta",
    description: "Saat pertama kali mata kami bertemu, dunia seakan berhenti berputar. Takdir mempertemukan kami di momen yang sempurna.",
    image: "/src/assets/gallery-1.jpg"
  },
  {
    id: 2,
    title: "Percakapan Pertama",
    date: "February 2020",
    location: "Café Favorit",
    description: "Berbincang berjam-jam tanpa merasa lelah. Kami tahu ini adalah awal dari sesuatu yang istimewa.",
    image: "/src/assets/gallery-2.jpg"
  },
  {
    id: 3,
    title: "Kencan Pertama",
    date: "March 2020",
    location: "Taman Kota",
    description: "Berjalan bersama di bawah langit senja, berbagi mimpi dan harapan untuk masa depan.",
    image: "/src/assets/gallery-3.jpg"
  },
  {
    id: 4,
    title: "Mengungkapkan Perasaan",
    date: "June 2020",
    location: "Pantai Sunset",
    description: "Di hadapan matahari terbenam, kami mengungkapkan perasaan yang selama ini terpendam.",
    image: "/src/assets/gallery-4.jpg"
  },
  {
    id: 5,
    title: "Menjadi Sepasang Kekasih",
    date: "July 2020",
    location: "Tempat Khusus Kami",
    description: "Resmi menjadi sepasang kekasih yang saling mencintai dan mendukung satu sama lain.",
    image: "/src/assets/couple-hero.jpg"
  },
  {
    id: 6,
    title: "Perkenalan Keluarga",
    date: "December 2020",
    location: "Rumah Keluarga",
    description: "Memperkenalkan satu sama lain kepada keluarga tercinta, mendapat restu dan dukungan.",
    image: "/src/assets/gallery-1.jpg"
  },
  {
    id: 7,
    title: "Lamaran",
    date: "March 2023",
    location: "Taman Romantis",
    description: "Momen bersejarah ketika ia melamar dengan cincin impian dan kata-kata yang menyentuh hati.",
    image: "/src/assets/gallery-2.jpg"
  },
  {
    id: 8,
    title: "Persiapan Pernikahan",
    date: "2024",
    location: "Berbagai Tempat",
    description: "Bersama-sama mempersiapkan hari bahagia kami dengan penuh cinta dan antusiasme.",
    image: "/src/assets/gallery-3.jpg"
  },
  {
    id: 9,
    title: "Pra-Wedding",
    date: "November 2024",
    location: "Studio Photo",
    description: "Mengabadikan momen-momen indah sebagai kenangan sebelum hari pernikahan.",
    image: "/src/assets/gallery-4.jpg"
  },
  {
    id: 10,
    title: "Hari Pernikahan",
    date: "25 Januari 2025",
    location: "Gedung Pernikahan",
    description: "Hari yang telah lama kami nantikan, bersatu dalam ikatan suci pernikahan.",
    image: "/src/assets/venue.jpg"
  }
];

const LoveStoryCarousel = () => {
  const [selectedMoment, setSelectedMoment] = useState<LoveStoryMoment | null>(null);

  return (
    <section className="py-16 bg-gradient-to-b from-background to-primary-soft/30 batik-accent">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Heart className="w-6 h-6 text-primary animate-pulse" />
            <h2 className="text-4xl font-bold text-foreground">Perjalanan Cinta Kami</h2>
            <Heart className="w-6 h-6 text-primary animate-pulse" />
          </div>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Setiap langkah dalam perjalanan cinta kami adalah anugerah yang indah. 
            Mari kenang kembali momen-momen berharga yang membawa kami hingga hari bahagia ini.
          </p>
        </div>

        {/* Carousel */}
        <div className="max-w-4xl mx-auto">
          <Carousel className="w-full">
            <CarouselContent>
              {loveStoryMoments.map((moment) => (
                <CarouselItem key={moment.id} className="md:basis-1/2 lg:basis-1/3">
                  <Card 
                    className="group hover:shadow-elegant transition-all duration-300 cursor-pointer batik-pattern-floral bg-card/50 backdrop-blur-sm"
                    onClick={() => setSelectedMoment(moment)}
                  >
                    <CardContent className="p-0">
                      {/* Image */}
                      <div className="relative aspect-square overflow-hidden rounded-t-lg">
                        <img
                          src={moment.image}
                          alt={moment.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        
                        {/* Date Badge */}
                        <div className="absolute top-4 right-4 bg-primary/90 backdrop-blur-sm text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                          {moment.date}
                        </div>
                        
                        {/* Title Overlay */}
                        <div className="absolute bottom-4 left-4 right-4">
                          <h3 className="text-white font-semibold text-lg mb-1">{moment.title}</h3>
                          {moment.location && (
                            <div className="flex items-center gap-1 text-white/80 text-sm">
                              <MapPin className="w-3 h-3" />
                              <span>{moment.location}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
          </Carousel>
        </div>

        {/* Selected Moment Detail */}
        {selectedMoment && (
          <div 
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedMoment(null)}
          >
            <Card className="max-w-2xl w-full max-h-[90vh] overflow-auto">
              <CardContent className="p-0">
                <div className="relative">
                  <img
                    src={selectedMoment.image}
                    alt={selectedMoment.title}
                    className="w-full h-64 object-cover"
                  />
                  <button
                    onClick={() => setSelectedMoment(null)}
                    className="absolute top-4 right-4 bg-black/50 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-black/70 transition-colors"
                  >
                    ×
                  </button>
                </div>
                
                <div className="p-6 batik-pattern-primary">
                  <div className="flex items-center gap-2 text-primary mb-2">
                    <Calendar className="w-4 h-4" />
                    <span className="font-medium">{selectedMoment.date}</span>
                    {selectedMoment.location && (
                      <>
                        <span className="text-muted-foreground">•</span>
                        <MapPin className="w-4 h-4" />
                        <span className="font-medium">{selectedMoment.location}</span>
                      </>
                    )}
                  </div>
                  
                  <h3 className="text-2xl font-bold text-foreground mb-4">
                    {selectedMoment.title}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    {selectedMoment.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Decorative Elements */}
        <div className="flex justify-center mt-12">
          <div className="flex items-center gap-2 text-primary">
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-primary to-transparent"></div>
            <Heart className="w-4 h-4 animate-pulse" />
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-primary to-transparent"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoveStoryCarousel;