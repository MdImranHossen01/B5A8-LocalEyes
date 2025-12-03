import { HeroSection } from '@/components/home/HeroSection';
import { HowItWorks } from '@/components/home/HowItWorks';
import { PopularDestinations } from '@/components/home/PopularDestinations';
import { TopRatedGuides } from '@/components/home/TopRatedGuides';
import { Testimonials } from '@/components/home/Testimonials';
import { WhyChooseUs } from '@/components/home/WhyChooseUs';
import { TourCategories } from '@/components/home/TourCategories';

export default function Home() {
  return (
    <div className="min-h-screen">
    
      
      <main>
        <HeroSection />
        <HowItWorks />
        <PopularDestinations />
        <TopRatedGuides />
        <Testimonials />
        <WhyChooseUs />
        <TourCategories />
      </main>

    
    </div>
  );
}