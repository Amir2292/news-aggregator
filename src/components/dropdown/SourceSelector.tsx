import React from "react";

interface SourceSelectorProps {
  selectedSource: string;
  onChange: (source: "newsAPI" | "guardianAPI") => void;
}

const SourceSelector: React.FC<SourceSelectorProps> = ({
  selectedSource,
  onChange,
}) => {
  return (
    <div className="flex items-center space-x-2">
      <label htmlFor="source" className="text-lg font-semibold text-gray-700">
        Select News Source:
      </label>
      <select
        id="source"
        value={selectedSource}
        onChange={(e) => onChange(e.target.value as "newsAPI" | "guardianAPI")}
        className="bg-white border border-gray-300 text-stone-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 p-2.5"
      >
        <option value="newsAPI">NewsAPI.org</option>
        <option value="guardianAPI">The Guardian</option>
      </select>
    </div>
  );
};

export default SourceSelector;
