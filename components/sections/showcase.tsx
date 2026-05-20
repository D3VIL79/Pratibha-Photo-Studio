"use client";

import { useRef, useState, Suspense, useMemo, useEffect, memo, useCallback } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import Image from "next/image";

const SPHERE_RADIUS = 4.5;
const TOTAL_ITEMS = 50;

// ─── Helper: Get thumbnail path (webp) from original image path ───
function thumbPath(original: string): string {
  const base = original.replace(/^\/images\//, "").replace(/\.(png|jpg|jpeg)$/i, "");
  return `/images/thumbs/${base}.webp`;
}

// ─── Showcase data ───
const showcaseItems = [
  // ═══ CLUSTER 0: Bridal & Wedding Portraits ═══
  { image: "/images/bridal_portrait.png", title: "BRIDAL GLOW", subtitle: "Bridal Portrait", year: "2025", description: "Stunning bridal portraits capturing the radiance and grace of every bride on her special day." },
  { image: "/images/bridal_getting_ready.png", title: "THE MOMENT", subtitle: "Bridal Prep", year: "2025", description: "Intimate getting-ready moments — the quiet before the beautiful storm." },
  { image: "/images/mehendi_ceremony.png", title: "HENNA TALES", subtitle: "Mehendi Art", year: "2024", description: "Intricate mehendi artistry on the bride's hands, a canvas of love and tradition." },
  { image: "/images/wedding.png", title: "ETERNAL VOWS", subtitle: "Wedding Day", year: "2024", description: "Luxury wedding cinematography that transforms fleeting moments into timeless narratives." },
  { image: "/images/henna_hands.jpg", title: "SACRED INK", subtitle: "Bridal Mehendi", year: "2025", description: "Detailed close-up of bridal henna patterns — every swirl tells a story of devotion." },
  { image: "/images/floral_garden.jpg", title: "BLOOM & BRIDE", subtitle: "Floral Decor", year: "2025", description: "Exquisite floral arrangements framing the bride in nature's most romantic colors." },

  // ═══ CLUSTER 1: Ceremony & Celebration ═══
  { image: "/images/wedding_ceremony.png", title: "SACRED FIRE", subtitle: "Wedding Rituals", year: "2024", description: "Traditional wedding rituals around the sacred fire, capturing devotion and joy." },
  { image: "/images/haldi_ceremony.png", title: "GOLDEN JOY", subtitle: "Haldi Ceremony", year: "2024", description: "The vibrant haldi ceremony bursting with laughter, turmeric, and marigolds." },
  { image: "/images/wedding_couple.png", title: "FOREVER US", subtitle: "Couple Portrait", year: "2024", description: "Romantic couple portraits with fairy-light bokeh and cinematic warmth." },
  { image: "/images/prewedding_couple.png", title: "BEFORE I DO", subtitle: "Pre-Wedding", year: "2025", description: "Enchanting pre-wedding shoots in royal palace courtyards at golden hour." },
  { image: "/images/palace_courtyard.jpg", title: "ROYAL AFFAIR", subtitle: "Venue Shoot", year: "2025", description: "Grand palace courtyards transformed into dreamlike wedding celebration venues." },
  { image: "/images/kolkata_streets.jpg", title: "CITY OF JOY", subtitle: "Street Celebration", year: "2024", description: "Vibrant street celebrations through the heart of old Kolkata during wedding processions." },

  // ═══ CLUSTER 2: Architecture & Heritage ═══
  { image: "/images/heritage_building.png", title: "ROYAL ARCH", subtitle: "Heritage", year: "2025", description: "Majestic heritage palace architecture with ornate carved stone and golden light." },
  { image: "/images/temple_architecture.png", title: "DIVINE STONE", subtitle: "Temple", year: "2024", description: "Ancient temple architecture at dawn, intricate carvings bathed in morning mist." },
  { image: "/images/fort_landscape.png", title: "FORTRESS", subtitle: "Historic Fort", year: "2025", description: "Historic Indian forts on hilltops commanding dramatic sunset panoramas." },
  { image: "/images/project_2.png", title: "BRUTAL EDGE", subtitle: "Modern Architecture", year: "2024", description: "Bold brutalist compositions and dramatic lines in contemporary architecture." },
  { image: "/images/taj_mahal.jpg", title: "CROWN JEWEL", subtitle: "Iconic Monument", year: "2025", description: "The Taj Mahal at dawn — a testament to eternal love reflected in its pristine waters." },
  { image: "/images/temple_gopuram.jpg", title: "TOWER OF GODS", subtitle: "Gopuram Detail", year: "2024", description: "Ornate South Indian gopuram towering into the sky with thousands of sculpted deities." },
  { image: "/images/city_skyline.jpg", title: "URBAN PULSE", subtitle: "City Skyline", year: "2025", description: "Glittering city skylines at blue hour where modern architecture meets the night sky." },

  // ═══ CLUSTER 3: Scenery & Landscapes ═══
  { image: "/images/mountain_scenery.png", title: "PEAK GLORY", subtitle: "Mountains", year: "2025", description: "Breathtaking Himalayan peaks at sunrise with lush green valleys and dramatic clouds." },
  { image: "/images/sunset_lake.png", title: "STILL WATERS", subtitle: "Sunset Lake", year: "2025", description: "Serene sunset reflections over calm lakes — nature's perfect mirror." },
  { image: "/images/waterfall_scenery.png", title: "CASCADE", subtitle: "Waterfall", year: "2024", description: "Majestic waterfalls cascading into turquoise pools surrounded by lush foliage." },
  { image: "/images/ocean_cliff.png", title: "EDGE OF WORLD", subtitle: "Coastal", year: "2025", description: "Dramatic ocean cliffs at sunset with waves crashing against ancient rock." },
  { image: "/images/landscape.png", title: "HORIZONS", subtitle: "Panorama", year: "2025", description: "Endless horizons where earth meets sky in breathtaking wide-angle vistas." },
  { image: "/images/alpine_wildflowers.jpg", title: "ALPINE BLOOM", subtitle: "Mountain Flora", year: "2025", description: "Fields of golden wildflowers carpeting alpine meadows beneath snow-capped Dolomite peaks." },
  { image: "/images/beach_sunset.jpg", title: "GOLDEN SHORE", subtitle: "Beach Sunset", year: "2025", description: "Pristine tropical beach at sunset with silky waters reflecting amber and violet skies." },

  // ═══ CLUSTER 4: Portrait & Studio ═══
  { image: "/images/hero_portrait.png", title: "LUMINANCE", subtitle: "Portrait", year: "2025", description: "Cinematic portraits exploring light, shadow, and the depth of human emotion." },
  { image: "/images/candid_portrait.png", title: "UNSCRIPTED", subtitle: "Candid", year: "2025", description: "Natural candid moments captured with warmth and spontaneous authenticity." },
  { image: "/images/newborn_baby.png", title: "TINY DREAMS", subtitle: "Newborn", year: "2025", description: "Tender newborn photography capturing the purity and innocence of new life." },
  { image: "/images/train_journey.jpg", title: "WANDERLUST", subtitle: "Travel Portrait", year: "2024", description: "A joyful traveler leaning from a train crossing lush green valleys — pure freedom." },
  { image: "/images/deer_meadow.jpg", title: "WILD GRACE", subtitle: "Wildlife Portrait", year: "2025", description: "A majestic deer grazing through wildflower meadows beneath snow-capped mountains." },
  { image: "/images/rustic_barn.jpg", title: "HERITAGE SOUL", subtitle: "Rural Portrait", year: "2024", description: "Rustic countryside charm — weathered textures and warm earth tones of rural life." },

  // ═══ CLUSTER 5: Fashion, Product & Creative ═══
  { image: "/images/fashion.png", title: "AVANT GARDE", subtitle: "Fashion Editorial", year: "2025", description: "High-fashion editorial work pushing the boundaries of visual storytelling." },
  { image: "/images/product.png", title: "ESSENCE", subtitle: "Product", year: "2024", description: "Premium product photography that elevates brands into the realm of luxury." },
  { image: "/images/studio.png", title: "THE CRAFT", subtitle: "Studio", year: "2025", description: "Behind the lens — where creative vision meets technical mastery." },
  { image: "/images/project_1.png", title: "NEON NEXUS", subtitle: "Creative", year: "2024", description: "Experimental art and motion design that bridges technology and imagination." },
  { image: "/images/tropical_palm.jpg", title: "ISLAND VIBES", subtitle: "Tropical Shoot", year: "2025", description: "Lush tropical palm canopy against azure skies — paradise captured in every frame." },
  { image: "/images/desert_dunes.jpg", title: "SAHARA SILK", subtitle: "Desert Editorial", year: "2024", description: "Sweeping desert dune landscapes for high-fashion editorial and brand campaigns." },

  // ═══ CLUSTER 6: Nature & Wilderness ═══
  { image: "/images/redwood_canopy.jpg", title: "ANCIENT GIANTS", subtitle: "Redwood Forest", year: "2025", description: "Looking skyward through towering redwood canopy — a cathedral of ancient trees." },
  { image: "/images/misty_forest.jpg", title: "ETHEREAL MIST", subtitle: "Forest Atmosphere", year: "2024", description: "Mystical misty forest at dawn where light filters through ancient woodland canopy." },
  { image: "/images/river_valley.jpg", title: "FLOWING DREAMS", subtitle: "River Valley", year: "2025", description: "Winding river through a lush green valley, nature's paintbrush at its finest." },
  { image: "/images/rice_terraces.jpg", title: "EMERALD STEPS", subtitle: "Rice Terraces", year: "2024", description: "Terraced rice paddies cascading down hillsides in mesmerizing emerald geometry." },
  { image: "/images/floral_garden.jpg", title: "PETAL SYMPHONY", subtitle: "Botanical", year: "2025", description: "Vibrant botanical gardens in full bloom — a sensory explosion of color and fragrance." },
  { image: "/images/deer_meadow.jpg", title: "MOUNTAIN SERENITY", subtitle: "Alpine Wildlife", year: "2024", description: "Peaceful alpine meadow scene with wildlife grazing beneath majestic peaks." },

  // ═══ CLUSTER 7: Travel & Documentary ═══
  { image: "/images/train_journey.jpg", title: "IRON RAILS", subtitle: "Railway Heritage", year: "2025", description: "Historic railway viaducts cutting through dense jungle — engineering meets nature." },
  { image: "/images/kolkata_streets.jpg", title: "STREET STORIES", subtitle: "Documentary", year: "2024", description: "Raw, unfiltered documentary photography through the vibrant streets of India." },
  { image: "/images/taj_mahal.jpg", title: "ETERNAL MARBLE", subtitle: "Heritage Travel", year: "2025", description: "The world's greatest monument to love, captured in soft morning light and perfect symmetry." },
  { image: "/images/palace_courtyard.jpg", title: "REGAL PASSAGE", subtitle: "Palace Tour", year: "2024", description: "Wandering through ornate palace corridors where every archway frames a new story." },
  { image: "/images/rustic_barn.jpg", title: "COUNTRY ROADS", subtitle: "Rural Journey", year: "2025", description: "Sun-dappled countryside paths through rustic villages frozen in a gentler time." },
  { image: "/images/city_skyline.jpg", title: "NEON HEIGHTS", subtitle: "Urban Night", year: "2024", description: "Pulsing urban nightscapes where city lights create rivers of gold and electric blue." },
];

// ─── PRE-COMPUTE Fibonacci sphere positions (perfectly symmetric) ───
// This runs once at module load — zero per-frame cost
const FIBONACCI_POSITIONS: { pos: THREE.Vector3; normal: THREE.Vector3 }[] = [];
{
  const goldenRatio = (1 + Math.sqrt(5)) / 2;
  for (let i = 0; i < TOTAL_ITEMS; i++) {
    // Fibonacci sphere: evenly distributed points on sphere surface
    const theta = Math.acos(1 - (2 * (i + 0.5)) / TOTAL_ITEMS);
    const phi = (2 * Math.PI * (i + 0.5)) / goldenRatio;

    const x = SPHERE_RADIUS * Math.sin(theta) * Math.cos(phi);
    const y = SPHERE_RADIUS * Math.cos(theta);
    const z = SPHERE_RADIUS * Math.sin(theta) * Math.sin(phi);

    const pos = new THREE.Vector3(x, y, z);
    const normal = pos.clone().normalize();
    FIBONACCI_POSITIONS.push({ pos, normal });
  }
}

// ─── Shared geometry & materials (created once, reused by all cards) ───
const CARD_GEO = new THREE.PlaneGeometry(1.0, 1.25);
const GLOW_COLOR = new THREE.Color("#00FF9C");
const BLACK_COLOR = new THREE.Color("#000000");

// Pre-compute lookAt quaternions for each card (avoid per-frame lookAt)
const CARD_QUATERNIONS: THREE.Quaternion[] = FIBONACCI_POSITIONS.map(({ pos }) => {
  const dummy = new THREE.Object3D();
  dummy.position.copy(pos);
  dummy.lookAt(pos.clone().multiplyScalar(2));
  dummy.updateMatrix();
  return dummy.quaternion.clone();
});

/* ─── Single image card on the sphere (heavily memoized) ─── */
const ImageCard = memo(function ImageCard({
  index,
  globalIdx,
  onSelect,
  isSelected,
}: {
  index: number;
  globalIdx: number;
  onSelect: (i: number) => void;
  isSelected: boolean;
}) {
  const item = showcaseItems[globalIdx];
  const { pos } = FIBONACCI_POSITIONS[globalIdx];
  const quat = CARD_QUATERNIONS[globalIdx];

  // Load compressed thumbnail texture (20-50KB vs 1-8MB original)
  const texture = useLoader(THREE.TextureLoader, thumbPath(item.image));

  // Optimize texture settings
  useMemo(() => {
    texture.minFilter = THREE.LinearFilter;
    texture.generateMipmaps = false;
    texture.colorSpace = THREE.SRGBColorSpace;
  }, [texture]);

  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  // Set orientation once (no useFrame needed)
  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.quaternion.copy(quat);
    }
  }, [quat]);

  // Only animate scale when state changes — NOT every frame
  useEffect(() => {
    if (!meshRef.current) return;
    const t = isSelected ? 1.3 : hovered ? 1.15 : 1;
    meshRef.current.scale.setScalar(t);
  }, [isSelected, hovered]);

  const handleClick = useCallback(
    (e: THREE.Event) => {
      (e as any).stopPropagation();
      onSelect(globalIdx);
    },
    [globalIdx, onSelect]
  );

  const handlePointerOver = useCallback((e: THREE.Event) => {
    (e as any).stopPropagation();
    setHovered(true);
  }, []);

  const handlePointerOut = useCallback(() => setHovered(false), []);

  return (
    <mesh
      ref={meshRef}
      position={pos}
      onClick={handleClick}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      geometry={CARD_GEO}
    >
      <meshBasicMaterial
        map={texture}
        toneMapped={false}
        side={THREE.FrontSide}
        transparent
        opacity={isSelected ? 1 : hovered ? 0.95 : 0.85}
      />
    </mesh>
  );
});

/* ─── The 3D Globe — optimized ─── */
function Globe({
  onSelect,
  selectedIndex,
  isInteracting,
  onInteractStart,
  onInteractEnd,
}: {
  onSelect: (i: number | null) => void;
  selectedIndex: number | null;
  isInteracting: boolean;
  onInteractStart: () => void;
  onInteractEnd: () => void;
}) {
  const handleSelect = useCallback(
    (idx: number) => onSelect(idx),
    [onSelect]
  );

  return (
    <>
      <group>
        {/* ─── Wireframe sphere shell (reduced segments: 48→32) ─── */}
        <mesh>
          <sphereGeometry args={[SPHERE_RADIUS - 0.2, 32, 32]} />
          <meshBasicMaterial
            wireframe
            color="#00FF9C"
            opacity={0.02}
            transparent
            depthWrite={false}
          />
        </mesh>

        {/* ─── Central glowing core ─── */}
        <mesh>
          <sphereGeometry args={[0.12, 12, 12]} />
          <meshBasicMaterial color="#00FF9C" opacity={0.5} transparent depthWrite={false} />
        </mesh>
        <mesh>
          <sphereGeometry args={[0.3, 12, 12]} />
          <meshBasicMaterial color="#00FF9C" opacity={0.06} transparent depthWrite={false} />
        </mesh>

        {/* ─── Axis pole ─── */}
        <mesh>
          <cylinderGeometry args={[0.008, 0.008, SPHERE_RADIUS * 2.6, 6]} />
          <meshBasicMaterial color="#00FF9C" opacity={0.08} transparent depthWrite={false} />
        </mesh>

        {/* ─── Equator ring ─── */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[SPHERE_RADIUS - 0.15, 0.005, 6, 64]} />
          <meshBasicMaterial color="#00FF9C" opacity={0.035} transparent depthWrite={false} />
        </mesh>

        {/* ─── Latitude rings ─── */}
        {[-30, 30].map((lat) => (
          <mesh
            key={lat}
            rotation={[Math.PI / 2, 0, 0]}
            position={[0, SPHERE_RADIUS * Math.sin((lat * Math.PI) / 180) * 0.98, 0]}
          >
            <torusGeometry
              args={[
                SPHERE_RADIUS * Math.cos((lat * Math.PI) / 180) * 0.98,
                0.003,
                6,
                48,
              ]}
            />
            <meshBasicMaterial color="#7B61FF" opacity={0.02} transparent depthWrite={false} />
          </mesh>
        ))}

        {/* ─── All image cards ─── */}
        <Suspense fallback={null}>
          {showcaseItems.map((_, globalIdx) => (
            <ImageCard
              key={globalIdx}
              index={globalIdx}
              globalIdx={globalIdx}
              onSelect={handleSelect}
              isSelected={selectedIndex === globalIdx}
            />
          ))}
        </Suspense>
      </group>

      {/* ─── Controls ─── */}
      <OrbitControls
        autoRotate
        autoRotateSpeed={isInteracting ? 0 : 0.5}
        onStart={onInteractStart}
        onEnd={onInteractEnd}
        enableZoom
        minDistance={6}
        maxDistance={14}
        enablePan={false}
        rotateSpeed={0.5}
        dampingFactor={0.05}
        enableDamping
      />

      {/* ─── Lighting (simplified — using BasicMaterial so lights don't matter much) ─── */}
      <ambientLight intensity={1} />
    </>
  );
}

/* ─── Category labels from item data ─── */
const CATEGORIES = ["Bridal", "Ceremony", "Architecture", "Scenery", "Portrait", "Creative", "Wilderness", "Travel"];

/* ─── Loading state ─── */
function Loader() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center z-20 gap-4">
      <div className="w-12 h-12 border-2 border-[#00FF9C]/20 border-t-[#00FF9C] rounded-full animate-spin" />
      <span className="text-white/20 text-[10px] uppercase tracking-[0.4em]">
        Loading Portfolio
      </span>
    </div>
  );
}

/* ─── Main exported section ─── */
export function ShowcaseSection() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isInteracting, setIsInteracting] = useState(false);
  const interactTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleInteractStart = useCallback(() => {
    setIsInteracting(true);
    if (interactTimeoutRef.current) clearTimeout(interactTimeoutRef.current);
  }, []);

  const handleInteractEnd = useCallback(() => {
    if (interactTimeoutRef.current) clearTimeout(interactTimeoutRef.current);
    interactTimeoutRef.current = setTimeout(() => {
      setIsInteracting(false);
    }, 3000);
  }, []);

  useEffect(() => {
    if (isInteracting) return;
    
    const interval = setInterval(() => {
      const randomIdx = Math.floor(Math.random() * showcaseItems.length);
      setSelectedIndex(randomIdx);
    }, 5000);

    return () => clearInterval(interval);
  }, [isInteracting]);

  const selectedItem =
    selectedIndex !== null ? showcaseItems[selectedIndex] : null;

  return (
    <section
      id="work"
      className="relative h-screen bg-black overflow-hidden z-20"
    >
      {/* Ambient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[#00FF9C]/[0.01] blur-[160px]" />
        <div className="absolute bottom-1/3 right-1/3 w-[400px] h-[400px] rounded-full bg-[#7B61FF]/[0.015] blur-[120px]" />
      </div>

      {/* Header */}
      <div className="absolute top-6 left-6 md:top-8 md:left-16 z-30">
        <span className="text-[#00FF9C] text-[10px] uppercase tracking-[0.5em] block mb-1">
          Selected Works
        </span>
        <h2 className="text-xl md:text-3xl font-heading font-bold text-white tracking-tight">
          Our Portfolio
        </h2>
      </div>

      {/* Cluster legend */}
      <div className="absolute top-6 right-6 md:top-8 md:right-16 z-30 hidden md:flex flex-col gap-1.5">
        {CATEGORIES.map((name, i) => (
          <div key={i} className="flex items-center gap-2">
            <div
              className="w-1.5 h-1.5 rounded-full"
              style={{
                backgroundColor: i % 2 === 0 ? "#00FF9C" : "#7B61FF",
                opacity: 0.5,
              }}
            />
            <span className="text-white/20 text-[9px] uppercase tracking-[0.3em]">
              {name}
            </span>
          </div>
        ))}
      </div>

      {/* Hint */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-30 text-center">
        <span className="text-white/15 text-[10px] uppercase tracking-[0.4em]">
          Drag to Rotate · Scroll to Zoom · Click to Explore
        </span>
      </div>

      {/* 3D Canvas */}
      <Suspense fallback={<Loader />}>
        <Canvas
          camera={{ position: [0, 1, 9.5], fov: 45 }}
          onPointerMissed={() => {
            setSelectedIndex(null);
            handleInteractStart();
            handleInteractEnd();
          }}
          style={{ cursor: "grab" }}
          dpr={[1, 1.5]}
          gl={{
            antialias: false,
            powerPreference: "high-performance",
            stencil: false,
            depth: true,
          }}
          performance={{ min: 0.5 }}
        >
          <Globe 
            onSelect={(idx) => {
              setSelectedIndex(idx);
              handleInteractStart();
              handleInteractEnd();
            }} 
            selectedIndex={selectedIndex} 
            isInteracting={isInteracting}
            onInteractStart={handleInteractStart}
            onInteractEnd={handleInteractEnd}
          />
        </Canvas>
      </Suspense>

      {/* Bottom counter */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3">
        <div className="w-2 h-2 rounded-full bg-[#00FF9C]/30 animate-pulse" />
        <span className="text-white/15 text-[10px] uppercase tracking-[0.3em]">
          {showcaseItems.length} Unique Projects · 8 Collections
        </span>
      </div>

      {/* ─── DETAIL PANEL ─── */}
      <div
        className={`absolute right-0 top-0 bottom-0 w-full md:w-[420px] bg-black/[0.93] backdrop-blur-2xl border-l border-white/[0.05] z-40 flex flex-col justify-center px-8 md:px-12 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          selectedItem ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {selectedItem && (
          <>
            {/* Close */}
            <button
              onClick={() => setSelectedIndex(null)}
              className="absolute top-6 right-6 w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 transition-all duration-300 text-lg"
            >
              ✕
            </button>

            {/* Number watermark */}
            <span className="text-white/[0.03] text-[8rem] font-heading font-bold leading-none absolute top-8 left-8 select-none pointer-events-none">
              {String((selectedIndex ?? 0) + 1).padStart(2, "0")}
            </span>

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-[1px] bg-[#00FF9C]/50" />
                <span className="text-[#00FF9C] text-[10px] uppercase tracking-[0.4em] font-light">
                  {selectedItem.subtitle} — {selectedItem.year}
                </span>
              </div>

              <h3 className="text-3xl md:text-5xl font-heading font-bold text-white tracking-[-0.02em] leading-[0.95] mb-4">
                {selectedItem.title}
              </h3>

              <div className="w-12 h-[1px] bg-white/10 mb-4" />

              <p className="text-white/35 text-sm leading-relaxed mb-8">
                {selectedItem.description}
              </p>

              {/* Large image preview — uses full-res original via Next/Image */}
              <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden mb-6">
                <Image
                  src={selectedItem.image}
                  alt={selectedItem.title}
                  fill
                  className="object-cover"
                  sizes="400px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>

              <button className="group flex items-center gap-3 text-white/40 hover:text-white transition-colors duration-500 text-sm tracking-wider uppercase">
                <span className="font-light">View Full Project</span>
                <svg
                  className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                  />
                </svg>
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
