import AIFeatures from './AIFeatures';

/**
 * AI Features section component
 */
const AIFeaturesSection = () => {
  return (
    <section id="features" className="py-16 px-6 md:px-10">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">AI-Powered Pregnancy Support</h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Our intelligent features provide personalized guidance throughout your pregnancy journey.
        </p>
      </div>

      <AIFeatures />
    </section>
  );
};

export default AIFeaturesSection;