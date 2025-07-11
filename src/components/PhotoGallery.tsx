import { useState } from "react";
import { X } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";

const PhotoGallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const galleryImages = [
    { src: gallery1, alt: "Romantic walk through cherry blossoms" },
    { src: gallery2, alt: "Sunset silhouette" },
    { src: gallery3, alt: "Wedding rings on rose petals" },
    { src: gallery4, alt: "Bridal bouquet" },
  ];

  return (
    <section className="py-20 px-4 bg-gradient-sunset">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            Our Love Story
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A glimpse into our journey together, captured in beautiful moments
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {galleryImages.map((image, index) => (
            <div 
              key={index}
              className="group relative overflow-hidden rounded-xl shadow-soft hover:shadow-elegant transition-all duration-300 cursor-pointer animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => setSelectedImage(image.src)}
            >
              <img 
                src={image.src} 
                alt={image.alt}
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Hover overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-card/90 backdrop-blur-sm rounded-full p-3">
                  <span className="text-foreground font-medium">View Photo</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quote Section */}
        <div className="mt-16 text-center">
          <blockquote className="text-2xl md:text-3xl font-serif text-foreground italic max-w-3xl mx-auto">
            "Being deeply loved by someone gives you strength,<br />
            while loving someone deeply gives you courage."
          </blockquote>
          <cite className="block mt-4 text-lg text-muted-foreground">— Lao Tzu</cite>
        </div>
      </div>

      {/* Image Modal */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl w-full p-0 bg-transparent border-none">
          <div className="relative">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 z-50 p-2 bg-card rounded-full shadow-lg hover:bg-muted transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            {selectedImage && (
              <img 
                src={selectedImage} 
                alt="Gallery image"
                className="w-full h-auto rounded-xl shadow-2xl"
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default PhotoGallery;