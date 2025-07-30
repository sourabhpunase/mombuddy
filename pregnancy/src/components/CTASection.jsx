/**
 * Call to Action section component
 */
const CTASection = () => {
  return (
    <section className="py-16 px-6 md:px-10 bg-gradient-to-r from-pink-500 to-purple-600 text-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Pregnancy Journey?</h2>
        <p className="text-xl mb-8">
          Join thousands of moms who are navigating pregnancy with confidence using MomBuddy.
        </p>
        <button className="bg-white text-pink-600 px-8 py-3 rounded-full hover:bg-gray-100 transition shadow-lg text-lg font-bold">
          Download Now
        </button>
      </div>
    </section>
  );
};

export default CTASection;