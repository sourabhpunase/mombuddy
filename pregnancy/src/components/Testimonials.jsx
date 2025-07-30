/**
 * Component for displaying user testimonials
 */
const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sarah M.",
      role: "First-time mom",
      initials: "SM",
      bgColor: "bg-pink-200",
      textColor: "text-pink-700",
      content: "The trimester guides were incredibly detailed and helped me know exactly what to expect. The AI symptom checker gave me peace of mind during those anxious first weeks."
    },
    {
      id: 2,
      name: "Jessica T.",
      role: "Second pregnancy",
      initials: "JT",
      bgColor: "bg-purple-200",
      textColor: "text-purple-700",
      content: "Even though this was my second pregnancy, I discovered so many new things through the app. The nutrition recommendations were personalized and actually delicious!"
    },
    {
      id: 3,
      name: "Rachel L.",
      role: "High-risk pregnancy",
      initials: "RL",
      bgColor: "bg-blue-200",
      textColor: "text-blue-700",
      content: "Having a high-risk pregnancy was scary, but the app helped me track my symptoms and know when to call my doctor. The community support was invaluable during tough times."
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
      {testimonials.map((testimonial) => (
        <div key={testimonial.id} className="bg-white p-6 rounded-xl shadow-md hover-scale">
          <div className="flex items-center mb-4">
            <div className={`w-12 h-12 ${testimonial.bgColor} rounded-full flex items-center justify-center ${testimonial.textColor} font-bold`}>
              {testimonial.initials}
            </div>
            <div className="ml-4">
              <h4 className="font-bold">{testimonial.name}</h4>
              <p className="text-gray-500 text-sm">{testimonial.role}</p>
            </div>
          </div>
          <p className="text-gray-700">
            "{testimonial.content}"
          </p>
        </div>
      ))}
    </div>
  );
};

export default Testimonials;