import React, { useState } from "react";
import { 
  Globe, DollarSign, Languages, RefreshCw, Scale, ShieldCheck, 
  HelpCircle, Compass, Check, AlertCircle, Trash2, Plus
} from "lucide-react";

export default function ExtraTools() {
  const [activeTool, setActiveTool] = useState<"converter" | "translator" | "units" | "visa" | "checklist">("converter");

  // State: Currency Converter
  const [amount, setAmount] = useState<number>(100);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("JPY");
  const [convertedResult, setConvertedResult] = useState<number>(15430);

  const exchangeRates: Record<string, Record<string, number>> = {
    USD: { USD: 1, EUR: 0.92, JPY: 154.3, CAD: 1.36, TZS: 2600, INR: 83.2 },
    EUR: { USD: 1.09, EUR: 1, JPY: 167.7, CAD: 1.48, TZS: 2826, INR: 90.4 },
    JPY: { USD: 0.0065, EUR: 0.006, JPY: 1, CAD: 0.0088, TZS: 16.85, INR: 0.54 },
    CAD: { USD: 0.74, EUR: 0.68, JPY: 113.5, CAD: 1, TZS: 1912, INR: 61.2 },
    TZS: { USD: 0.00038, EUR: 0.00035, JPY: 0.059, CAD: 0.00052, TZS: 1, INR: 0.032 },
    INR: { USD: 0.012, EUR: 0.011, JPY: 1.85, CAD: 0.016, TZS: 31.2, INR: 1 }
  };

  const handleConvertCurrency = () => {
    const rate = exchangeRates[fromCurrency]?.[toCurrency] || 1;
    setConvertedResult(Number((amount * rate).toFixed(2)));
  };

  // State: Language Translator
  const [selectedLanguage, setSelectedLanguage] = useState("ja");
  const [inputPhraseIndex, setInputPhraseIndex] = useState(0);

  const commonPhrases = [
    { text: "Where is the train station?", id: 0 },
    { text: "How much does this cost?", id: 1 },
    { text: "Could I have the menu, please?", id: 2 },
    { text: "Emergency: Please call a doctor!", id: 3 },
    { text: "Thank you very much for your help.", id: 4 }
  ];

  const translations: Record<string, Record<number, { text: string; pronunciation: string }>> = {
    ja: { // Japanese
      0: { text: "駅はどこですか？", pronunciation: "Eki wa doko desu ka?" },
      1: { text: "これはいくらですか？", pronunciation: "Kore wa ikura desu ka?" },
      2: { text: "メニューをいただけますか？", pronunciation: "Menyū o itadakemasu ka?" },
      3: { text: "救急：医者を呼んでください！", pronunciation: "Kyūkyū: Isha o yonde kudasai!" },
      4: { text: "手伝ってくれてありがとうございます。", pronunciation: "Tetsudatte kurete arigatō gozaimasu." }
    },
    es: { // Spanish
      0: { text: "¿Dónde está la estación de tren?", pronunciation: "Dohn-deh ehs-tah lah ehs-tah-syohn deh trehn?" },
      1: { text: "¿Cuánto cuesta esto?", pronunciation: "Kwahn-toh kwehs-tah ehs-toh?" },
      2: { text: "¿Me trae el menú, por favor?", pronunciation: "Meh trah-eh ehl meh-noo, por fah-vor?" },
      3: { text: "¡Emergencia: por favor llame a un doctor!", pronunciation: "Eh-mehr-hahn-syah: por fah-vor yah-meh ah oon dohk-tor!" },
      4: { text: "Muchas gracias por su ayuda.", pronunciation: "Moo-chas grah-syas por soo ah-yoo-dah." }
    },
    fr: { // French
      0: { text: "Où est la gare ferroviaire?", pronunciation: "Oo eh la gar fehr-roh-vyehr?" },
      1: { text: "Combien ça coûte?", pronunciation: "Kohm-byan sah koot?" },
      2: { text: "Puis-je avoir le menu, s'il vous plaît?", pronunciation: "Pwee-jeh ah-vwar luh muh-nu, seel voo pleh?" },
      3: { text: "Urgence: s'il vous plaît, appelez un médecin!", pronunciation: "Ur-zhahns: seel voo pleh, ah-pleh un meyd-san!" },
      4: { text: "Merci beaucoup pour votre aide.", pronunciation: "Meyr-see boh-koo poor vohtr ehd." }
    },
    sw: { // Swahili (Tanzania)
      0: { text: "Kituo cha treni kiko wapi?", pronunciation: "Kee-too-oh chah treh-nee kee-koh wah-pee?" },
      1: { text: "Hii inagharimu kiasi gani?", pronunciation: "Hee ee-nah-ghah-ree-moo kee-ah-see gah-nee?" },
      2: { text: "Tafadhali niletee menyu?", pronunciation: "Tah-fah-dhah-lee nee-leh-teh meh-nyoo?" },
      3: { text: "Dharura: Tafadhali ita daktari!", pronunciation: "Dhah-roo-rah: Tah-fah-dhah-lee ee-tah dahk-tah-ree!" },
      4: { text: "Asante sana kwa msaada wako.", pronunciation: "Ah-sahn-teh sah-nah kwah m-sah-ah-dah wah-koh." }
    },
    hi: { // Hindi (India)
      0: { text: "रेलवे स्टेशन कहाँ है?", pronunciation: "Railway station kahaan hai?" },
      1: { text: "यह कितने का है?", pronunciation: "Yeh kitne ka hai?" },
      2: { text: "कृपया मुझे मेनू दे सकते हैं?", pronunciation: "Kripya mujhe menu de sakte hain?" },
      3: { text: "आपातकालीन: कृपया डॉक्टर को बुलाएं!", pronunciation: "Aapaatkaaleen: Kripya doctor ko bulaayein!" },
      4: { text: "मदद के लिए आपका बहुत-बहुत धन्यवाद।", pronunciation: "Madad ke liye aapka bahut bahut dhanyavaad." }
    }
  };

  // State: Unit Converter
  const [fTemp, setFTemp] = useState<number>(72);
  const [cTemp, setCTemp] = useState<number>(22.2);
  const [miles, setMiles] = useState<number>(10);
  const [km, setKm] = useState<number>(16.1);
  const [lbs, setLbs] = useState<number>(50);
  const [kg, setKg] = useState<number>(22.7);

  const handleTempConvert = (val: number, isF: boolean) => {
    if (isF) {
      setFTemp(val);
      setCTemp(Number(((val - 32) * 5 / 9).toFixed(1)));
    } else {
      setCTemp(val);
      setFTemp(Number(((val * 9 / 5) + 32).toFixed(1)));
    }
  };

  const handleDistanceConvert = (val: number, isMiles: boolean) => {
    if (isMiles) {
      setMiles(val);
      setKm(Number((val * 1.60934).toFixed(1)));
    } else {
      setKm(val);
      setMiles(Number((val / 1.60934).toFixed(1)));
    }
  };

  const handleWeightConvert = (val: number, isLbs: boolean) => {
    if (isLbs) {
      setLbs(val);
      setKg(Number((val * 0.453592).toFixed(1)));
    } else {
      setKg(val);
      setLbs(Number((val / 0.453592).toFixed(1)));
    }
  };

  // State: Visa lookup table
  const [selectedVisaDest, setSelectedVisaDest] = useState("Japan");
  const visaDatabase: Record<string, { requirements: string; validity: string; vaccines: string; link: string }> = {
    Japan: {
      requirements: "eVisa or No Visa required for up to 90 days for US, EU, and Canada passport holders. Online registration via Visit Japan Web recommended.",
      validity: "90 days (Single or Multiple Entry)",
      vaccines: "None mandatory. Standard health screening at terminal gates.",
      link: "https://www.mofa.go.jp/j_info/visit/visa/index.html"
    },
    Canada: {
      requirements: "eTA (Electronic Travel Authorization) required for visa-exempt travelers arriving by air. Online registration takes 5 minutes.",
      validity: "Up to 6 months per stay",
      vaccines: "None mandatory.",
      link: "https://www.canada.ca/en/immigration-refugees-citizenship/services/visit-canada.html"
    },
    Tanzania: {
      requirements: "eVisa required for most western countries. Can be applied online in advance or secured on arrival at Dar es Salaam / Kilimanjaro airports.",
      validity: "90 days (Single Entry)",
      vaccines: "Yellow Fever Certificate MANDATORY if arriving from a transmission-risk country.",
      link: "https://visa.immigration.go.tz/"
    },
    India: {
      requirements: "e-Tourist Visa (eVisa) is mandatory and must be applied online at least 4 days before flying. Bring a printed copy.",
      validity: "30 days, 1 year, or 5 years (Double/Multiple Entry)",
      vaccines: "Oral Polio Vaccine certificate if coming from infected countries.",
      link: "https://indianvisaonline.gov.in/evisa/tvoa.html"
    },
    Italy: {
      requirements: "Schengen Visa or ETIAS (starting late 2024/2025) for visa-exempt passport holders. Covers all European Schengen members.",
      validity: "90 days within any 180-day window",
      vaccines: "None mandatory.",
      link: "https://vistoforitaly.esteri.it/home/en"
    }
  };

  // State: Travel Checklist (Functional checklist state)
  const [todoList, setTodoList] = useState([
    { id: 1, text: "Check passport validity (must have at least 6 months left)", checked: true },
    { id: 2, text: "Purchase comprehensive health and trip delay insurance", checked: false },
    { id: 3, text: "Notify local credit card banks of flight departure dates", checked: false },
    { id: 4, text: "Verify visa prerequisites & secure eVisa printout", checked: false },
    { id: 5, text: "Exchange $150 USD into local base cash equivalents", checked: false },
    { id: 6, text: "Setup international cellular data roaming or buy eSIM", checked: false }
  ]);
  const [newTodoInput, setNewTodoInput] = useState("");

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodoInput.trim()) return;
    setTodoList([...todoList, { id: Date.now(), text: newTodoInput, checked: false }]);
    setNewTodoInput("");
  };

  const handleToggleTodo = (id: number) => {
    setTodoList(prev => prev.map(t => t.id === id ? { ...t, checked: !t.checked } : t));
  };

  const handleDeleteTodo = (id: number) => {
    setTodoList(prev => prev.filter(t => t.id !== id));
  };

  return (
    <div id="utility-tools-page" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-left">
      
      {/* Page Title */}
      <div className="border-b border-gray-100 dark:border-slate-800 pb-6 mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="font-display font-black text-2xl sm:text-3xl text-gray-950 dark:text-white flex items-center gap-2">
            <Globe className="h-6.5 w-6.5 text-ocean" />
            <span>Traveler's Smart Toolbox</span>
          </h2>
          <p className="text-xs font-sans text-gray-500 mt-1">
            Access essential conversion tools, visa guidelines, unit calculators, translation glossaries, and travel packing preparation checklists.
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex bg-gray-55 dark:bg-slate-900 p-1 rounded-xl border border-gray-100 dark:border-slate-800 flex-wrap gap-1">
          {[
            { id: "converter", label: "Currency", icon: DollarSign },
            { id: "translator", label: "Translator", icon: Languages },
            { id: "units", label: "Unit Converter", icon: Scale },
            { id: "visa", label: "Visa Finder", icon: AlertCircle },
            { id: "checklist", label: "My Checklist", icon: ShieldCheck },
          ].map((tool) => {
            const Icon = tool.icon;
            return (
              <button
                id={`tool-tab-btn-${tool.id}`}
                key={tool.id}
                onClick={() => setActiveTool(tool.id as any)}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-2xs font-sans font-bold uppercase tracking-wider transition-all ${
                  activeTool === tool.id
                    ? "bg-white dark:bg-slate-800 text-ocean dark:text-sky shadow-sm border border-gray-100 dark:border-slate-700"
                    : "text-gray-500 hover:text-gray-900 dark:text-slate-400 dark:hover:text-white"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{tool.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* RENDER ACTIVE TOOL PANEL */}

      {/* 1. CURRENCY CONVERTER */}
      {activeTool === "converter" && (
        <div id="tool-panel-currency" className="max-w-xl mx-auto bg-white dark:bg-slate-900 rounded-3xl p-6 border border-gray-100 dark:border-slate-800 shadow-lg text-xs font-sans space-y-6">
          <div className="text-center">
            <h3 className="font-display font-bold text-base text-gray-950 dark:text-white">Exchange Rate Converter</h3>
            <p className="text-2xs text-gray-400 mt-0.5">Calculations update instantly using cached financial matrices.</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-[10px] uppercase font-mono text-gray-400 font-bold mb-1">Base Capital Amount</label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-gray-500 font-bold">$</span>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => { setAmount(parseFloat(e.target.value) || 0); }}
                  className="w-full pl-7 pr-3 py-2.5 border border-gray-200 dark:border-slate-800 rounded-xl bg-gray-55 dark:bg-slate-950 text-xs font-sans"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] uppercase font-mono text-gray-400 font-bold mb-1">From Currency</label>
                <select
                  value={fromCurrency}
                  onChange={(e) => setFromCurrency(e.target.value)}
                  className="w-full px-3 py-2.5 border border-gray-200 dark:border-slate-800 rounded-xl bg-gray-55 dark:bg-slate-950 font-sans text-xs"
                >
                  <option value="USD">USD (United States Dollar)</option>
                  <option value="EUR">EUR (Eurozone)</option>
                  <option value="JPY">JPY (Japanese Yen)</option>
                  <option value="CAD">CAD (Canadian Dollar)</option>
                  <option value="TZS">TZS (Tanzanian Shilling)</option>
                  <option value="INR">INR (Indian Rupee)</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] uppercase font-mono text-gray-400 font-bold mb-1">To Currency</label>
                <select
                  value={toCurrency}
                  onChange={(e) => setToCurrency(e.target.value)}
                  className="w-full px-3 py-2.5 border border-gray-200 dark:border-slate-800 rounded-xl bg-gray-55 dark:bg-slate-950 font-sans text-xs"
                >
                  <option value="USD">USD (United States Dollar)</option>
                  <option value="EUR">EUR (Eurozone)</option>
                  <option value="JPY">JPY (Japanese Yen)</option>
                  <option value="CAD">CAD (Canadian Dollar)</option>
                  <option value="TZS">TZS (Tanzanian Shilling)</option>
                  <option value="INR">INR (Indian Rupee)</option>
                </select>
              </div>
            </div>

            <button
              id="currency-convert-btn"
              onClick={handleConvertCurrency}
              className="w-full py-2.5 bg-ocean hover:bg-ocean-dark text-white rounded-xl font-bold flex items-center justify-center space-x-1"
            >
              <RefreshCw className="h-4 w-4" />
              <span>Convert Cash</span>
            </button>

            {/* Results Display */}
            <div className="bg-gray-55 dark:bg-slate-950 p-4 rounded-2xl text-center border border-gray-100 dark:border-slate-850">
              <span className="text-[10px] uppercase font-mono text-gray-400">Total Converted Funds</span>
              <p className="font-display font-black text-2xl text-gray-900 dark:text-white mt-1">
                {amount} {fromCurrency} = <span className="text-ocean dark:text-sky">{convertedResult} {toCurrency}</span>
              </p>
              <span className="text-[9px] text-gray-400 font-sans block mt-1">1 {fromCurrency} = {exchangeRates[fromCurrency]?.[toCurrency] || 1} {toCurrency}</span>
            </div>
          </div>
        </div>
      )}

      {/* 2. LANGUAGE TRANSLATOR */}
      {activeTool === "translator" && (
        <div id="tool-panel-translator" className="max-w-2xl mx-auto bg-white dark:bg-slate-900 rounded-3xl p-6 border border-gray-100 dark:border-slate-800 shadow-lg text-xs font-sans space-y-6">
          <div className="text-center">
            <h3 className="font-display font-bold text-base text-gray-950 dark:text-white">Cultural phrasebook</h3>
            <p className="text-2xs text-gray-400 mt-0.5">Quick translations and phonetic indicators to facilitate local talk.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Phrase Selector */}
            <div className="space-y-2 col-span-1 border-r border-gray-100 dark:border-slate-800 pr-4">
              <span className="text-[10px] uppercase font-mono text-gray-400 font-bold block mb-1">Pick phrase</span>
              {commonPhrases.map((phrase, i) => (
                <button
                  key={phrase.id}
                  onClick={() => setInputPhraseIndex(i)}
                  className={`w-full text-left p-2.5 rounded-xl transition-all border text-xs leading-tight ${
                    inputPhraseIndex === i
                      ? "bg-ocean/10 text-ocean border-ocean/30 font-semibold dark:bg-sky/15 dark:text-sky dark:border-sky/20"
                      : "bg-gray-55 dark:bg-slate-950 border-transparent text-gray-700 dark:text-slate-300 hover:bg-gray-100/50"
                  }`}
                >
                  {phrase.text}
                </button>
              ))}
            </div>

            {/* Target Language Selection & Translation result */}
            <div className="col-span-2 space-y-4">
              <div>
                <label className="block text-[10px] uppercase font-mono text-gray-400 font-bold mb-1">Target Language</label>
                <div className="flex gap-1.5 flex-wrap">
                  {[
                    { code: "ja", name: "Japanese" },
                    { code: "es", name: "Spanish" },
                    { code: "fr", name: "French" },
                    { code: "sw", name: "Swahili" },
                    { code: "hi", name: "Hindi" }
                  ].map((l) => (
                    <button
                      key={l.code}
                      onClick={() => setSelectedLanguage(l.code)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        selectedLanguage === l.code
                          ? "bg-ocean text-white dark:bg-sky dark:text-slate-950"
                          : "bg-gray-150 hover:bg-gray-200 text-gray-700 dark:bg-slate-800 dark:text-slate-300"
                      }`}
                    >
                      {l.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Converted Output Display */}
              <div className="bg-gray-55 dark:bg-slate-950 p-4 rounded-2xl border border-gray-100 dark:border-slate-850 text-left space-y-3.5">
                <div>
                  <span className="text-[9px] uppercase font-mono text-gray-400">English Original Phrase</span>
                  <p className="font-sans font-bold text-gray-800 dark:text-white mt-0.5">"{commonPhrases[inputPhraseIndex].text}"</p>
                </div>

                <div className="pt-3.5 border-t border-gray-100 dark:border-slate-800/80">
                  <span className="text-[9px] uppercase font-mono text-ocean dark:text-sky block font-bold">Local Translation</span>
                  <p className="font-display font-black text-xl text-gray-900 dark:text-white mt-1">
                    {translations[selectedLanguage]?.[inputPhraseIndex]?.text}
                  </p>
                  
                  <div className="mt-2 p-2.5 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-lg">
                    <span className="text-[9px] uppercase font-mono text-gray-400 block font-bold">Phonetic Pronunciation:</span>
                    <p className="font-mono text-xs text-gray-600 dark:text-slate-300 italic mt-0.5">
                      "{translations[selectedLanguage]?.[inputPhraseIndex]?.pronunciation}"
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. UNIT CALCULATOR */}
      {activeTool === "units" && (
        <div id="tool-panel-units" className="max-w-2xl mx-auto bg-white dark:bg-slate-900 rounded-3xl p-6 border border-gray-100 dark:border-slate-800 shadow-lg text-xs font-sans space-y-6">
          <div className="text-center">
            <h3 className="font-display font-bold text-base text-gray-950 dark:text-white">Metric & Imperial Unit Converter</h3>
            <p className="text-2xs text-gray-400 mt-0.5">Seamless translation of temperature gauges, distances, and weight indices.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Temp */}
            <div className="bg-gray-55 dark:bg-slate-950 p-4 rounded-2xl border border-gray-100 dark:border-slate-850 space-y-4">
              <h4 className="font-display font-bold text-xs text-gray-900 dark:text-white flex items-center gap-1.5 pb-2 border-b border-gray-150">
                <span>Temperature</span>
              </h4>
              <div className="space-y-3">
                <div>
                  <label className="block text-[10px] text-gray-400 font-bold mb-0.5">Fahrenheit (°F)</label>
                  <input
                    type="number"
                    value={fTemp}
                    onChange={(e) => handleTempConvert(parseFloat(e.target.value) || 0, true)}
                    className="w-full px-2 py-1.5 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-lg text-xs font-sans"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-gray-400 font-bold mb-0.5">Celsius (°C)</label>
                  <input
                    type="number"
                    value={cTemp}
                    onChange={(e) => handleTempConvert(parseFloat(e.target.value) || 0, false)}
                    className="w-full px-2 py-1.5 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-lg text-xs font-sans"
                  />
                </div>
              </div>
            </div>

            {/* Distance */}
            <div className="bg-gray-55 dark:bg-slate-950 p-4 rounded-2xl border border-gray-100 dark:border-slate-850 space-y-4">
              <h4 className="font-display font-bold text-xs text-gray-900 dark:text-white flex items-center gap-1.5 pb-2 border-b border-gray-150">
                <span>Distance</span>
              </h4>
              <div className="space-y-3">
                <div>
                  <label className="block text-[10px] text-gray-400 font-bold mb-0.5">Miles (mi)</label>
                  <input
                    type="number"
                    value={miles}
                    onChange={(e) => handleDistanceConvert(parseFloat(e.target.value) || 0, true)}
                    className="w-full px-2 py-1.5 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-lg text-xs font-sans"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-gray-400 font-bold mb-0.5">Kilometers (km)</label>
                  <input
                    type="number"
                    value={km}
                    onChange={(e) => handleDistanceConvert(parseFloat(e.target.value) || 0, false)}
                    className="w-full px-2 py-1.5 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-lg text-xs font-sans"
                  />
                </div>
              </div>
            </div>

            {/* Weight */}
            <div className="bg-gray-55 dark:bg-slate-950 p-4 rounded-2xl border border-gray-100 dark:border-slate-850 space-y-4">
              <h4 className="font-display font-bold text-xs text-gray-900 dark:text-white flex items-center gap-1.5 pb-2 border-b border-gray-150">
                <span>Luggage Weight</span>
              </h4>
              <div className="space-y-3">
                <div>
                  <label className="block text-[10px] text-gray-400 font-bold mb-0.5">Pounds (lbs)</label>
                  <input
                    type="number"
                    value={lbs}
                    onChange={(e) => handleWeightConvert(parseFloat(e.target.value) || 0, true)}
                    className="w-full px-2 py-1.5 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-lg text-xs font-sans"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-gray-400 font-bold mb-0.5">Kilograms (kg)</label>
                  <input
                    type="number"
                    value={kg}
                    onChange={(e) => handleWeightConvert(parseFloat(e.target.value) || 0, false)}
                    className="w-full px-2 py-1.5 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-lg text-xs font-sans"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. VISA INFORMATION */}
      {activeTool === "visa" && (
        <div id="tool-panel-visa" className="max-w-2xl mx-auto bg-white dark:bg-slate-900 rounded-3xl p-6 border border-gray-100 dark:border-slate-800 shadow-lg text-xs font-sans space-y-6">
          <div className="text-center">
            <h3 className="font-display font-bold text-base text-gray-950 dark:text-white">Official Visa & Vaccine Requirements</h3>
            <p className="text-2xs text-gray-400 mt-0.5">Lookup passport requirements, landing entry validity, and vaccine checks.</p>
          </div>

          <div className="space-y-5">
            <div className="flex gap-2 justify-center flex-wrap">
              {Object.keys(visaDatabase).map((dest) => (
                <button
                  key={dest}
                  onClick={() => setSelectedVisaDest(dest)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    selectedVisaDest === dest
                      ? "bg-ocean text-white dark:bg-sky dark:text-slate-950"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-slate-800 dark:text-slate-300"
                  }`}
                >
                  {dest}
                </button>
              ))}
            </div>

            {/* Requirements detail cards */}
            <div className="bg-gray-55 dark:bg-slate-950 p-5 rounded-2xl border border-gray-150 text-left space-y-4">
              <div className="flex items-center space-x-2.5 pb-3 border-b border-gray-200 dark:border-slate-800">
                <Globe className="h-5 w-5 text-ocean" />
                <h4 className="font-display font-bold text-sm text-gray-950 dark:text-white">Embassy guidelines for entry into {selectedVisaDest}</h4>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <span className="text-[9px] uppercase font-mono text-gray-400 block">General Visa Prerequisites</span>
                  <p className="text-xs text-gray-700 dark:text-slate-300 leading-normal font-sans font-medium">
                    {visaDatabase[selectedVisaDest].requirements}
                  </p>
                </div>

                <div className="space-y-1">
                  <span className="text-[9px] uppercase font-mono text-gray-400 block">Stay Validity Allowance</span>
                  <p className="text-xs text-gray-700 dark:text-slate-300 font-sans font-bold">
                    {visaDatabase[selectedVisaDest].validity}
                  </p>
                </div>

                <div className="space-y-1 col-span-1 md:col-span-2 pt-3 border-t border-gray-150">
                  <span className="text-[9px] uppercase font-mono text-red-500 font-bold block mb-1">Mandatory Immunization Checks</span>
                  <p className="text-xs text-gray-700 dark:text-slate-300 leading-normal font-sans">
                    {visaDatabase[selectedVisaDest].vaccines}
                  </p>
                </div>
              </div>

              {/* Official Link */}
              <div className="pt-3 border-t border-gray-200 dark:border-slate-800 flex justify-end">
                <a
                  href={visaDatabase[selectedVisaDest].link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center space-x-1.5 text-xs text-ocean hover:text-ocean-dark dark:text-sky font-bold"
                >
                  <span>Official Visa Application Portal</span>
                  <Globe className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. TRAVEL PREPARATION CHECKLIST */}
      {activeTool === "checklist" && (
        <div id="tool-panel-checklist" className="max-w-xl mx-auto bg-white dark:bg-slate-900 rounded-3xl p-6 border border-gray-100 dark:border-slate-800 shadow-lg text-xs font-sans space-y-5">
          <div className="text-center">
            <h3 className="font-display font-bold text-base text-gray-950 dark:text-white">Trip Preparation Checklist</h3>
            <p className="text-2xs text-gray-400 mt-0.5">Ensure vital regulatory, banking, and data guidelines are checked before flying.</p>
          </div>

          {/* Add custom todo input */}
          <form onSubmit={handleAddTodo} className="flex gap-2">
            <input
              type="text"
              required
              placeholder="e.g. Charge primary camera battery packs..."
              value={newTodoInput}
              onChange={(e) => setNewTodoInput(e.target.value)}
              className="flex-grow px-3 py-2 bg-gray-55 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded-xl text-xs"
            />
            <button
              type="submit"
              className="px-4 bg-ocean text-white hover:bg-ocean-dark rounded-xl text-xs font-bold flex items-center justify-center space-x-1"
            >
              <Plus className="h-4 w-4" />
              <span>Add</span>
            </button>
          </form>

          {/* Todo List render */}
          <div className="space-y-2">
            {todoList.map((todo) => (
              <div
                key={todo.id}
                className="flex items-center justify-between p-3 bg-gray-55 dark:bg-slate-950 border border-gray-100 dark:border-slate-800/80 rounded-xl"
              >
                <div
                  onClick={() => handleToggleTodo(todo.id)}
                  className="flex items-center space-x-2.5 cursor-pointer flex-grow"
                >
                  <div className={`h-4.5 w-4.5 rounded-lg border flex items-center justify-center transition-all ${
                    todo.checked 
                      ? "bg-emerald-green border-emerald-green text-white" 
                      : "border-gray-300 dark:border-slate-700"
                  }`}>
                    {todo.checked && <Check className="h-3 w-3" />}
                  </div>
                  <span className={`text-xs font-sans ${todo.checked ? "line-through text-gray-400" : "text-gray-700 dark:text-slate-300"}`}>
                    {todo.text}
                  </span>
                </div>

                <button
                  onClick={() => handleDeleteTodo(todo.id)}
                  className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg transition-colors"
                  title="Delete item"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
