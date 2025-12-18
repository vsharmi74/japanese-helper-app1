import React, { useState } from 'react';
import { Book, Languages, ArrowLeft, Volume2 } from 'lucide-react';

const COLORS = ["#FFCDD2", "#F8BBD0", "#E1BEE7", "#D1C4E9", "#C5CAE9", "#BBDEFB", "#B3E5FC", "#B2EBF2", "#B2DFDB", "#C8E6C9"];
const PHRASES = [
  { en: "hello", jp: "こんにちは (konnichiwa)" },
  { en: "thank you", jp: "ありがとう (arigatou)" },
  { en: "sorry", jp: "ごめんなさい (gomen nasai)" },
  { en: "yes", jp: "はい (hai)" },
  { en: "no", jp: "いいえ (iie)" },
  { en: "good morning", jp: "おはよう (ohayou)" },
  { en: "good night", jp: "おやすみ (oyasumi)" },
  { en: "how are you", jp: "元気ですか (genki desu ka)" },
  { en: "nice to meet you", jp: "はじめまして (hajimemashite)" },
  { en: "see you later", jp: "またね (mata ne)" },
  { en: "excuse me", jp: "すみません (sumimasen)" },
  { en: "i love you", jp: "愛してる (aishiteru)" },
  { en: "what is your name?", jp: "お名前は何ですか (onamae wa nan desu ka)" },
  { en: "i don't understand", jp: "わかりません (wakarimasen)" },
  { en: "please", jp: "お願いします (onegaishimasu)" },
  { en: "congratulations", jp: "おめでとう (omedetou)" },
  { en: "good luck", jp: "頑張って (ganbatte)" },
  { en: "how much?", jp: "いくらですか (ikura desu ka)" },
  { en: "where is...?", jp: "…はどこですか (… wa doko desu ka)" }
];
const TRANSLATION_DICT = PHRASES.reduce((acc, item) => {
  acc[item.en.toLowerCase().replace(/[?.]/g, '')] = item.jp;
  return acc;
}, {});
const speakText = (text) => {
  if (!window.speechSynthesis) { alert("Text-to-speech is not supported."); return; }
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'ja-JP'; utterance.rate = 0.9;
  window.speechSynthesis.speak(utterance);
};
const TranslatorScreen = ({ inputText, setInputText, outputText, isLoading, onTranslate, onNavigate }) => (
  <div className="flex flex-col h-full bg-[#f5f5f5] animate-in fade-in duration-300">
    <div className="p-4 space-y-2">
      <label className="text-gray-600 font-semibold text-sm ml-1">Enter English Text:</label>
      <textarea className="w-full p-4 rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-[#6200EE] outline-none resize-none text-lg bg-white" rows={4} placeholder="Type here (e.g., Hello)..." value={inputText} onChange={(e) => setInputText(e.target.value)} />
    </div>
    <div className="px-4 flex-1">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 h-full max-h-64 p-4 relative overflow-hidden flex flex-col">
        <label className="text-xs font-bold text-gray-400 absolute top-2 left-3 uppercase tracking-wider">Translation</label>
        <div className="mt-6 flex-1 text-xl text-gray-800 font-medium leading-relaxed flex items-start justify-between overflow-y-auto">
          <div className="flex-1 pr-2">{isLoading ? (<div className="flex items-center text-gray-400 animate-pulse"><Languages className="w-5 h-5 mr-2" /> Translating...</div>) : (outputText || <span className="text-gray-300 italic">Japanese text will appear here...</span>)}</div>
          {outputText && !isLoading && (<button onClick={() => speakText(outputText)} className="text-[#6200EE] hover:bg-[#6200EE]/10 p-2 rounded-full transition-colors active:scale-95"><Volume2 className="w-6 h-6" /></button>)}
        </div>
      </div>
    </div>
    <div className="p-4 space-y-3 mt-auto mb-16">
      <button onClick={onTranslate} className="w-full bg-[#03DAC5] hover:bg-[#018786] active:scale-95 transition-all text-white font-bold py-3 px-6 rounded-full shadow-md flex items-center justify-center text-lg"><Languages className="w-5 h-5 mr-2" />TRANSLATE</button>
      <button onClick={onNavigate} className="w-full bg-[#6200EE] hover:bg-[#3700b3] active:scale-95 transition-all text-white font-bold py-3 px-6 rounded-full shadow-md flex items-center justify-center text-lg"><Book className="w-5 h-5 mr-2" />VIEW PHRASES</button>
    </div>
  </div>
);
const PhrasesScreen = ({ onNavigate }) => (
  <div className="flex flex-col h-full bg-[#f5f5f5] animate-in slide-in-from-right duration-300">
      <div className="p-4 pb-2"><h2 className="text-gray-700 text-lg font-bold">Common Phrases</h2><p className="text-gray-500 text-sm">Tap speaker icon to listen</p></div>
    <div className="flex-1 overflow-y-auto px-3 pb-20 space-y-3">
      {PHRASES.map((phrase, index) => {
          const bgColor = COLORS[index % COLORS.length];
          return (
            <div key={index} style={{ backgroundColor: bgColor }} className="p-4 rounded-xl shadow-sm border border-black/5 flex justify-between items-start">
              <div className="flex-1"><p className="font-bold text-gray-800 text-lg capitalize">{phrase.en}</p><p className="text-gray-900 mt-1 font-medium text-base">{phrase.jp}</p></div>
              <button onClick={() => speakText(phrase.jp)} className="bg-white/40 hover:bg-white/60 text-gray-800 p-3 rounded-full ml-3 transition-colors active:scale-95"><Volume2 className="w-5 h-5" /></button>
            </div>
          );
      })}
    </div>
    <div className="absolute bottom-20 left-0 right-0 px-4 pointer-events-none">
      <button onClick={onNavigate} className="pointer-events-auto w-full bg-[#6200EE] hover:bg-[#3700b3] text-white font-bold py-3 px-6 rounded-full shadow-lg flex items-center justify-center active:scale-95 transition-all"><ArrowLeft className="w-5 h-5 mr-2" />BACK TO TRANSLATOR</button>
    </div>
  </div>
);
export default function App() {
  const [currentScreen, setCurrentScreen] = useState('translator');
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const handleTranslate = async () => {
    if (!inputText.trim()) return;
    setIsLoading(true);
    const cleanInput = inputText.toLowerCase().trim().replace(/[?.]/g, '');
    const localResult = TRANSLATION_DICT[cleanInput];
    if (localResult) { setOutputText(localResult); setIsLoading(false); return; }
    try {
      const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(inputText)}&langpair=en|ja`);
      const data = await response.json();
      if (data.responseData && data.responseData.translatedText) { setOutputText(data.responseData.translatedText); } 
      else { setOutputText("Could not translate this text."); }
    } catch (error) { console.error(error); setOutputText("Error: Check internet connection."); } finally { setIsLoading(false); }
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-800 font-sans">
      <div className="relative w-full max-w-md h-[800px] max-h-[100vh] bg-white sm:rounded-[2.5rem] sm:border-[8px] sm:border-gray-900 overflow-hidden shadow-2xl flex flex-col">
        <div className="bg-[#6200EE] h-8 w-full flex items-center justify-between px-6"><div className="text-white/80 text-xs font-medium">9:41</div><div className="flex space-x-1"><div className="w-3 h-3 bg-white/80 rounded-full"></div><div className="w-3 h-3 bg-white/80 rounded-full"></div></div></div>
        <div className="bg-[#6200EE] p-4 shadow-md z-10 flex items-center justify-center relative"><h1 className="text-white text-xl font-bold tracking-wide">Japanese Helper</h1></div>
        <div className="flex-1 overflow-hidden relative bg-[#f5f5f5]">
          {currentScreen === 'translator' ? (<TranslatorScreen inputText={inputText} setInputText={setInputText} outputText={outputText} isLoading={isLoading} onTranslate={handleTranslate} onNavigate={() => setCurrentScreen('phrases')} />) : (<PhrasesScreen onNavigate={() => setCurrentScreen('translator')} />)}
        </div>
        <div className="h-[50px] bg-[#2196F3] w-full flex items-center justify-center shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-20"><span className="text-white/60 text-xs font-semibold tracking-widest">ANDROID NAVIGATION</span></div>
        <div className="bg-black h-4 w-full sm:hidden"></div>
      </div>
    </div>
  );
}