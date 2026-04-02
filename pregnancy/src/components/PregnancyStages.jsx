import { useState } from 'react';
import TrimesterSelector from './TrimesterSelector';
import TrimesterDetails from './TrimesterDetails';

/**
 * Pregnancy Stages section component
 */
const PregnancyStages = ({ pregnancyStages }) => {
  const [selectedStage, setSelectedStage] = useState(null);

  return (
    <section id="stages" className="py-16 px-6 md:px-10 bg-gray-50 dark:bg-slate-900/80 border-y border-gray-200/80 dark:border-slate-700/80">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Your Pregnancy Journey</h2>
        <p className="text-lg text-body max-w-3xl mx-auto">
          Every pregnancy is unique, but all follow three distinct stages. Select your current trimester to learn more about what to expect.
        </p>
      </div>

      {/* Stage Selection */}
      <div className="mb-12">
        <TrimesterSelector 
          onSelect={setSelectedStage} 
          selectedStage={selectedStage} 
        />
      </div>

      {/* Selected Stage Details */}
      {selectedStage && (
        <TrimesterDetails trimester={pregnancyStages[selectedStage-1]} />
      )}
    </section>
  );
};

export default PregnancyStages;