import React from "react";
import { Button } from "../ui/button";

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  backgroundImage?: string;
  onCtaClick?: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  title = "Exquisite Jewelry Collection",
  subtitle = "Discover our handcrafted luxury pieces designed to make every moment special",
  ctaText = "Browse Collections",
  backgroundImage = "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=1400&q=80",
  onCtaClick = () => console.log("CTA clicked"),
}) => {
  return (
    <div className="relative w-full h-[600px] bg-black overflow-hidden">
      {/* Background image with overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      >
        <div className="absolute inset-0 bg-black/50" /> {/* Dark overlay */}
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center text-center px-4 md:px-8 lg:px-16 z-10">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 max-w-3xl">
          {title}
        </h1>
        <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl">
          {subtitle}
        </p>
        <Button
          onClick={onCtaClick}
          className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-md text-lg"
        >
          {ctaText}
        </Button>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-black to-transparent" />
    </div>
  );
};

export default HeroSection;
