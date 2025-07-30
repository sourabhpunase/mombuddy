import Testimonials from './Testimonials';

/**
 * Testimonials section component
 */
const TestimonialsSection = () => {
  return (
    <section className="py-16 px-6 md:px-10 bg-gray-50">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">What Moms Are Saying</h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Hear from mothers who have used MomBuddy throughout their pregnancy journey.
        </p>
      </div>

      <Testimonials />
    </section>
  );
};

export default TestimonialsSection;