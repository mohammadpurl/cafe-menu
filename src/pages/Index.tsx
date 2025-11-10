import MenuItem from "@/components/MenuItem";
import { useEffect, useRef, useState } from "react";
import cocktailShakerImg from "@/assets/cocktail-shaker.png";
import espressoImg from "@/assets/espresso.jpg";
import espressoDoubleImg from "@/assets/espresso-double.jpg";
import americanoImg from "@/assets/americano.jpg";
import latteImg from "@/assets/latte.jpg";
import cappuccinoImg from "@/assets/cappuccino.jpg";
import macchiatoImg from "@/assets/macchiato.jpg";
import hotChocolateImg from "@/assets/hot-chocolate.jpg";
import chocoMilkImg from "@/assets/choco-milk.jpg";
import chocoEspressoImg from "@/assets/choco-espresso.jpg";
import masalaTeaImg from "@/assets/masala-tea.jpg";
import masalaEspressoImg from "@/assets/masala-espresso.jpg";
import chocoMasalaImg from "@/assets/choco-masala.jpg";

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Preload the sound if it exists in public folder. Fails silently if not found.
    try {
      audioRef.current = new Audio("/water-drop.wav");
      // Slightly reduce volume to feel like a subtle pour/drop
      if (audioRef.current) {
        audioRef.current.volume = 0.6;
        // Allow quick replay by resetting time on end
        audioRef.current.addEventListener("ended", () => {
          if (audioRef.current) audioRef.current.currentTime = 0;
        });
      }
    } catch {
      // no-op
    }
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
    };
  }, []);

  const menuItems = [
    {
      name: "Espresso",
      description: "Single shot | Rich & Bold",
      image: espressoImg,
    },
    {
      name: "Espresso Double",
      description: "Double shot | Intense Flavor",
      image: espressoDoubleImg,
    },
    {
      name: "Americano",
      description: "Espresso | Hot Water",
      image: americanoImg,
    },
    {
      name: "Latte",
      description: "Espresso | Steamed Milk",
      image: latteImg,
    },
    {
      name: "Cappuccino",
      description: "Espresso | Milk Foam | Creamy",
      image: cappuccinoImg,
    },
    {
      name: "Macchiato",
      description: "Espresso | Milk Foam Dollop",
      image: macchiatoImg,
    },
    {
      name: "Hot Chocolate",
      description: "Rich Chocolate | Steamed Milk",
      image: hotChocolateImg,
    },
    {
      name: "Choco Milk",
      description: "Chocolate | Fresh Milk",
      image: chocoMilkImg,
    },
    {
      name: "Choco Espresso",
      description: "Espresso | Chocolate | Perfect Blend",
      image: chocoEspressoImg,
    },
    {
      name: "Masala Tea",
      description: "Spiced Tea | Traditional Blend",
      image: masalaTeaImg,
    },
    {
      name: "Masala Espresso",
      description: "Espresso | Aromatic Spices",
      image: masalaEspressoImg,
    },
    {
      name: "Choco Masala",
      description: "Chocolate | Masala | Exotic Fusion",
      image: chocoMasalaImg,
    },
  ];

  const handleItemClick = (item: typeof menuItems[0]) => {
    // Play water/pour/drop sound if available
    try {
      void audioRef.current?.play();
    } catch {
      // ignore audio errors (e.g., file missing or autoplay restrictions)
    }

    // Show loading spinner overlay for 10 seconds (placeholder for future API)
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsLoading(true);
    timeoutRef.current = setTimeout(() => {
      setIsLoading(false);
      timeoutRef.current = null;
    }, 10000);

    // Keep the existing console logs for debugging/analytics
    console.log('═══════════════════════════════════════');
    console.log('🥤 Item Selected:', item.name);
    console.log('📝 Description:', item.description);
    console.log('⏰ Time:', new Date().toLocaleString());
    console.log('═══════════════════════════════════════');
  };

  return (
    <main className="h-screen bg-background overflow-hidden">
      <div className="container mx-auto px-4 py-3 max-w-6xl h-full flex items-stretch">
        {/* Left menu column */}
        <div className="flex-1 overflow-y-auto pr-4 space-y-4">
          {menuItems.slice(0, 6).map((item, index) => (
            <MenuItem
              key={index}
              name={item.name}
              description={item.description}
              image={item.image}
              onClick={() => handleItemClick(item)}
            />
          ))}
        </div>

        {/* Center image - full viewport height, fixed width similar to SpecialMenu */}
        <div className="flex-none w-[410px] mx-2 flex items-start justify-center">
          <img
            src={cocktailShakerImg}
            alt="Cocktail Shaker"
            className="h-full w-auto object-contain object-top"
          />
        </div>

        {/* Right menu column */}
        <div className="flex-1 overflow-y-auto pl-4 space-y-4">
          {menuItems.slice(6).map((item, index) => (
            <MenuItem
              key={index + 6}
              name={item.name}
              description={item.description}
              image={item.image}
              onClick={() => handleItemClick(item)}
            />
          ))}
        </div>
      </div>

      {/* Full-screen loading overlay with spinner and center image */}
      {isLoading && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-[1px] flex items-center justify-center">
          <div className="flex flex-col items-center gap-6">
            <img
              src="/4TH-EYE-FINAL-09.png"
              alt="Loading emblem"
              className="h-24 w-24 object-contain"
            />
            <div className="h-12 w-12 rounded-full border-4 border-gold border-t-transparent animate-spin" />
          </div>
        </div>
      )}
    </main>
  );
};

export default Index;
