import React, { useState } from 'react';
import { FileText, Send, RotateCcw, Download, Copy, Check, ChevronDown } from 'lucide-react';

interface EssayOptions {
  topic: string;
  type: string;
  tone: string;
  length: string;
  academicLevel: string;
}

const EssayGenerator: React.FC = () => {
  const [options, setOptions] = useState<EssayOptions>({
    topic: '',
    type: 'argumentative',
    tone: 'academic',
    length: 'medium',
    academicLevel: 'undergraduate'
  });

  const [generatedEssay, setGeneratedEssay] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [showOptions, setShowOptions] = useState<boolean>(true);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setOptions(prev => ({ ...prev, [name]: value }));
  };

  const generateEssay = () => {
    if (!options.topic) return;
    
    setIsGenerating(true);
    
    // Simulate API call to generate essay
    setTimeout(() => {
      const mockEssay = generateMockEssay(options);
      setGeneratedEssay(mockEssay);
      setIsGenerating(false);
      setShowOptions(false);
    }, 2000);
  };

  const resetForm = () => {
    setOptions({
      topic: '',
      type: 'argumentative',
      tone: 'academic',
      length: 'medium',
      academicLevel: 'undergraduate'
    });
    setGeneratedEssay('');
    setShowOptions(true);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedEssay);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadEssay = () => {
    const element = document.createElement('a');
    const file = new Blob([generatedEssay], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `${options.topic.replace(/\s+/g, '-').toLowerCase()}-essay.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">AI Essay Generator</h1>
          <p className="text-lg text-gray-600">
            Generate well-structured essays on any topic with our AI-powered tool.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          {generatedEssay ? (
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <button
                  onClick={toggleOptions}
                  className="flex items-center text-sm font-medium text-gray-600 hover:text-gray-900"
                >
                  Essay Options
                  <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${showOptions ? 'rotate-180' : ''}`} />
                </button>
                <div className="flex space-x-2">
                  <button
                    onClick={copyToClipboard}
                    className="flex items-center px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md text-sm transition-colors"
                  >
                    {copied ? <Check className="h-4 w-4 mr-1" /> : <Copy className="h-4 w-4 mr-1" />}
                    {copied ? 'Copied' : 'Copy'}
                  </button>
                  <button
                    onClick={downloadEssay}
                    className="flex items-center px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md text-sm transition-colors"
                  >
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </button>
                  <button
                    onClick={resetForm}
                    className="flex items-center px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md text-sm transition-colors"
                  >
                    <RotateCcw className="h-4 w-4 mr-1" />
                    Reset
                  </button>
                </div>
              </div>

              {showOptions && (
                <div className="bg-gray-50 p-6 rounded-lg mb-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="topic" className="block text-sm font-medium text-gray-700 mb-1">Essay Topic</label>
                      <input
                        type="text"
                        id="topic"
                        name="topic"
                        value={options.topic}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g., Climate Change Impact"
                      />
                    </div>
                    <div>
                      <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">Essay Type</label>
                      <select
                        id="type"
                        name="type"
                        value={options.type}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="argumentative">Argumentative</option>
                        <option value="expository">Expository</option>
                        <option value="narrative">Narrative</option>
                        <option value="descriptive">Descriptive</option>
                        <option value="persuasive">Persuasive</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label htmlFor="tone" className="block text-sm font-medium text-gray-700 mb-1">Tone</label>
                      <select
                        id="tone"
                        name="tone"
                        value={options.tone}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="academic">Academic</option>
                        <option value="formal">Formal</option>
                        <option value="neutral">Neutral</option>
                        <option value="informal">Informal</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="length" className="block text-sm font-medium text-gray-700 mb-1">Length</label>
                      <select
                        id="length"
                        name="length"
                        value={options.length}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="short">Short (500 words)</option>
                        <option value="medium">Medium (1000 words)</option>
                        <option value="long">Long (1500+ words)</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="academicLevel" className="block text-sm font-medium text-gray-700 mb-1">Academic Level</label>
                      <select
                        id="academicLevel"
                        name="academicLevel"
                        value={options.academicLevel}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="highschool">High School</option>
                        <option value="undergraduate">Undergraduate</option>
                        <option value="graduate">Graduate</option>
                        <option value="phd">PhD</option>
                      </select>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-end">
                    <button
                      onClick={generateEssay}
                      disabled={!options.topic}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md flex items-center disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <RotateCcw className="h-4 w-4 mr-2" />
                      Regenerate
                    </button>
                  </div>
                </div>
              )}

              <div className="prose max-w-none">
                <h2 className="text-2xl font-bold mb-4">{options.topic}</h2>
                <div className="whitespace-pre-line">{generatedEssay}</div>
              </div>
            </div>
          ) : (
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="topic" className="block text-sm font-medium text-gray-700 mb-1">Essay Topic*</label>
                  <input
                    type="text"
                    id="topic"
                    name="topic"
                    value={options.topic}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Climate Change Impact"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">Essay Type</label>
                  <select
                    id="type"
                    name="type"
                    value={options.type}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="argumentative">Argumentative</option>
                    <option value="expository">Expository</option>
                    <option value="narrative">Narrative</option>
                    <option value="descriptive">Descriptive</option>
                    <option value="persuasive">Persuasive</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div>
                  <label htmlFor="tone" className="block text-sm font-medium text-gray-700 mb-1">Tone</label>
                  <select
                    id="tone"
                    name="tone"
                    value={options.tone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="academic">Academic</option>
                    <option value="formal">Formal</option>
                    <option value="neutral">Neutral</option>
                    <option value="informal">Informal</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="length" className="block text-sm font-medium text-gray-700 mb-1">Length</label>
                  <select
                    id="length"
                    name="length"
                    value={options.length}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="short">Short (500 words)</option>
                    <option value="medium">Medium (1000 words)</option>
                    <option value="long">Long (1500+ words)</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="academicLevel" className="block text-sm font-medium text-gray-700 mb-1">Academic Level</label>
                  <select
                    id="academicLevel"
                    name="academicLevel"
                    value={options.academicLevel}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="highschool">High School</option>
                    <option value="undergraduate">Undergraduate</option>
                    <option value="graduate">Graduate</option>
                    <option value="phd">PhD</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={generateEssay}
                  disabled={!options.topic || isGenerating}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md flex items-center disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isGenerating ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Generating...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Generate Essay
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <FileText className="h-5 w-5 text-blue-600 mr-2" />
            Tips for Using the Essay Generator
          </h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Be specific with your topic for more focused results</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Choose the appropriate essay type based on your assignment requirements</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Always review and edit the generated content before submitting</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Use the generated essay as a starting point and add your own perspectives</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

// Helper function to generate a mock essay
const generateMockEssay = (options: EssayOptions): string => {
  const { topic, type, tone } = options;
  
  return `The Impact of Climate Change on Global Ecosystems

Introduction:
Climate change represents one of the most significant challenges facing humanity in the 21st century. This essay examines the multifaceted impacts of climate change on global ecosystems, analyzing both current effects and projected future consequences. By understanding these impacts, we can better appreciate the urgency of climate action and develop more effective mitigation and adaptation strategies.

Body:

1. Rising Global Temperatures
   Global temperatures have risen approximately 1.1°C above pre-industrial levels, with significant regional variations. This warming trend has accelerated in recent decades, with the past decade (2011-2020) being the warmest on record. Rising temperatures directly affect ecosystem functioning through multiple pathways:

   a) Altered growing seasons and phenology: Many plant species are flowering earlier, and migration patterns of birds and other animals are shifting. These changes can create mismatches between interdependent species, such as pollinators and the plants they pollinate.

   b) Range shifts: Numerous plant and animal species are moving to higher elevations or latitudes as their traditional habitats become less suitable. However, not all species can migrate quickly enough to keep pace with climate change, particularly those with limited dispersal capabilities or specific habitat requirements.

   c) Physiological stress: Rising temperatures can exceed the thermal tolerance of many organisms, leading to heat stress, reduced fitness, and increased mortality, particularly during extreme heat events.

2. Changes in Precipitation Patterns
   Climate change is altering precipitation patterns worldwide, with some regions experiencing increased rainfall and others facing more frequent and severe droughts:

   a) Drought impacts: Extended dry periods affect plant productivity, increase wildfire risk, and can lead to desertification in vulnerable areas. Aquatic ecosystems face reduced water levels, higher water temperatures, and deteriorating water quality during droughts.

   b) Flooding effects: Increased heavy precipitation events can cause soil erosion, landslides, and flooding that disrupts both terrestrial and freshwater ecosystems. Sediment runoff can damage sensitive habitats like coral reefs and seagrass beds.

   c) Seasonal changes: Alterations in the timing and intensity of seasonal precipitation affect natural cycles of plant growth, animal reproduction, and ecosystem processes like nutrient cycling.

3. Ocean Acidification and Warming
   The oceans have absorbed approximately 30% of anthropogenic carbon dioxide emissions, leading to ocean acidification. Simultaneously, they have absorbed more than 90% of the excess heat from global warming:

   a) Coral reef degradation: Higher ocean temperatures cause coral bleaching—the expulsion of symbiotic algae that provide corals with nutrients and their characteristic colors. Ocean acidification impairs the ability of corals and other calcifying organisms to build and maintain their calcium carbonate structures.

   b) Marine food web disruptions: Changes in ocean temperature and chemistry affect the abundance and distribution of phytoplankton, the foundation of marine food webs. This has cascading effects through entire marine ecosystems.

   c) Deoxygenation: Warmer water holds less dissolved oxygen, creating or expanding "dead zones" where many marine organisms cannot survive.

4. Extreme Weather Events
   Climate change increases the frequency and intensity of extreme weather events, which can have devastating impacts on ecosystems:

   a) Hurricanes and storms: More powerful tropical storms cause physical damage to forests, coral reefs, and coastal ecosystems. Recovery from these disturbances may take decades or longer.

   b) Wildfires: Warmer, drier conditions in many regions increase wildfire risk. While fire is a natural part of many ecosystems, more frequent and intense fires can exceed their adaptive capacity.

   c) Heat waves: Prolonged periods of extreme heat can cause mass mortality events in both terrestrial and marine ecosystems, as observed in recent marine heat waves that caused widespread die-offs.

5. Ecosystem Resilience and Tipping Points
   Ecosystems have inherent resilience to environmental change, but climate change is testing these adaptive capacities:

   a) Biodiversity loss: Climate change interacts with other stressors like habitat destruction and pollution to accelerate biodiversity loss. Reduced biodiversity can diminish ecosystem resilience to future changes.

   b) Ecosystem services: Changes in ecosystem structure and function affect the services they provide to humans, including food provision, water purification, and carbon sequestration.

   c) Tipping points: Some ecosystems may approach critical thresholds beyond which rapid, irreversible transformations occur. Examples include the potential collapse of the Amazon rainforest or major shifts in ocean circulation patterns.

Conclusion:
The impacts of climate change on global ecosystems are wide-ranging and increasingly severe. These effects threaten biodiversity, ecosystem functioning, and the essential services that natural systems provide to humanity. Addressing climate change requires both mitigation efforts to reduce greenhouse gas emissions and adaptation strategies to help ecosystems and human communities cope with unavoidable changes. Conservation approaches must evolve to account for changing conditions rather than focusing solely on preserving historical ecosystem states. By taking decisive action now, we can limit the most damaging impacts of climate change and help preserve the ecological systems upon which all life depends.`;
};

export default EssayGenerator;