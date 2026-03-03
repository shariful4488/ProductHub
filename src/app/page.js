import Features from "@/components/Features";
import Hero from "@/components/Hero";
import ProductPreview from "@/components/ProductPreview";
import Stats from "@/components/Stats";
import Testimonials from "@/components/Testimonials";
import HowItWorks from "@/components/HowItWorks"; 
import BannerCTA from "@/components/BannerCTA";   

export default function Home() {
  return (
    <div className="flex flex-col gap-0 overflow-hidden">
    
      <section className="pt-20 md:pt-28"> 
        <Hero/>
      </section>

   
      <Stats />

  
      <ProductPreview/>

     
      <HowItWorks />

      
      <Features/>

   
      <Testimonials/>

      <BannerCTA />
    </div>
  );
}