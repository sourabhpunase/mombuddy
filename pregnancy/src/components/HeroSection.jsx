/**
 * Hero section component
 */
const HeroSection = ({ heroImage }) => {
  return (
    <section id="home" className="py-16 px-6 md:px-10 flex flex-col md:flex-row items-center">
      <div className="md:w-1/2 mb-10 md:mb-0">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 leading-tight">
          Your Personal <span className="text-pink-600">Pregnancy Companion</span>
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Navigate your pregnancy journey with confidence. Get personalized guidance, 
          track your progress, and connect with AI-powered insights tailored just for you.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <button className="bg-pink-600 text-white px-8 py-3 rounded-full hover:bg-pink-700 transition shadow-lg text-lg hover-button">
            Get Started
          </button>
          <button className="border-2 border-pink-600 text-pink-600 px-8 py-3 rounded-full hover:bg-pink-50 transition text-lg">
            Learn More
          </button>
        </div>
      </div>
      <div className="md:w-1/2 flex justify-center">
        <img 
          src={heroImage} 
          alt="Pregnant woman using MomBuddy app" 
          className="w-full max-w-md rounded-lg shadow-2xl animate-float"
        />
      </div>
    </section>
  );
};

export default HeroSection;