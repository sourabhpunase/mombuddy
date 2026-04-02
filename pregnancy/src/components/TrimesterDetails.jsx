import AIChatBox from './AIChatBox';

/**
 * Component for displaying detailed trimester information
 */
const TrimesterDetails = ({ trimester }) => {
  if (!trimester) return null;

  const trimesterNames = ['first', 'second', 'third'];
  const currentTrimesterName = trimesterNames[trimester.id - 1];

  return (
    <div className="card-surface rounded-xl shadow-xl p-6 md:p-10 max-w-4xl mx-auto animate-fadeIn">
      <div className="flex flex-col md:flex-row items-start gap-8">
        <div className="md:w-1/3 w-full">
          <img src={trimester.image} alt={trimester.name} className="w-full rounded-lg shadow-md" />
          <div
            className={`mt-6 p-4 rounded-lg border border-gray-200/80 dark:border-slate-600 ${trimester.color} dark:!bg-slate-800/80`}
          >
            <h4 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">AI Support Feature</h4>
            <p className="text-body">{trimester.aiFeature}</p>
          </div>

          <div className="mt-6">
            <AIChatBox trimester={currentTrimesterName} />
          </div>
        </div>
        <div className="md:w-2/3 w-full min-w-0">
          <h3 className={`text-2xl font-bold mb-4 ${trimester.textColor} dark:text-white`}>
            {trimester.name}: {trimester.weeks}
          </h3>
          <div className="max-w-none">
            {trimester.details.split('\n\n').map((paragraph, idx) => (
              <p key={idx} className="mb-4 text-body whitespace-pre-line">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrimesterDetails;
