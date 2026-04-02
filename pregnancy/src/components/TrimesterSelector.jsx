const trimesters = [
  {
    id: 1,
    name: 'First Trimester',
    weeks: 'Weeks 1-12',
    selectedRing: 'ring-pink-500 dark:ring-pink-400',
    idleBorder: 'border-gray-200 dark:border-slate-600',
    panel: 'bg-pink-50 dark:bg-pink-950/40',
    circleBorder: 'border-pink-400 dark:border-pink-500',
    circleBg: 'bg-white dark:bg-slate-900',
    circleText: 'text-pink-800 dark:text-pink-200',
    description: "The beginning of your pregnancy journey."
  },
  {
    id: 2,
    name: 'Second Trimester',
    weeks: 'Weeks 13-27',
    selectedRing: 'ring-purple-500 dark:ring-purple-400',
    idleBorder: 'border-gray-200 dark:border-slate-600',
    panel: 'bg-purple-50 dark:bg-purple-950/40',
    circleBorder: 'border-purple-400 dark:border-purple-500',
    circleBg: 'bg-white dark:bg-slate-900',
    circleText: 'text-purple-800 dark:text-purple-200',
    description: "Often called the 'golden period' of pregnancy."
  },
  {
    id: 3,
    name: 'Third Trimester',
    weeks: 'Weeks 28-40+',
    selectedRing: 'ring-blue-500 dark:ring-blue-400',
    idleBorder: 'border-gray-200 dark:border-slate-600',
    panel: 'bg-blue-50 dark:bg-blue-950/40',
    circleBorder: 'border-blue-400 dark:border-blue-500',
    circleBg: 'bg-white dark:bg-slate-900',
    circleText: 'text-blue-800 dark:text-blue-200',
    description: 'The final stretch before meeting your baby.'
  }
];

/**
 * Component for selecting pregnancy trimester
 */
const TrimesterSelector = ({ onSelect, selectedStage }) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 justify-center">
      {trimesters.map((trimester) => {
        const selected = selectedStage === trimester.id;
        return (
          <button
            key={trimester.id}
            type="button"
            onClick={() => onSelect(trimester.id)}
            className={`${trimester.panel} rounded-xl p-6 text-left transition-all hover:shadow-lg flex-1 max-w-sm mx-auto md:mx-0 border-2 trimester-card ${
              selected ? `ring-2 ${trimester.selectedRing} shadow-lg scale-[1.02]` : trimester.idleBorder
            }`}
          >
            <div className="flex items-center mb-4">
              <div
                className={`w-12 h-12 rounded-full border-2 ${trimester.circleBorder} ${trimester.circleBg} flex items-center justify-center text-xl font-bold ${trimester.circleText}`}
              >
                {trimester.id}
              </div>
              <div className="ml-4 min-w-0">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{trimester.name}</h3>
                <p className="text-muted text-sm">{trimester.weeks}</p>
              </div>
            </div>
            <p className="text-body text-sm sm:text-base">{trimester.description}</p>
          </button>
        );
      })}
    </div>
  );
};

export default TrimesterSelector;
