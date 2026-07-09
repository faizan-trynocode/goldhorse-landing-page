import { Search } from "lucide-react";

export default function HelpCenterSearchBar() {
  return (
    <div className="flex h-10 w-full max-w-[280px] rounded overflow-hidden shadow-sm border border-gray-100 shrink-0">
      <input
        type="text"
        placeholder="Please enter your question."
        className="flex-1 px-4 text-sm text-black outline-none placeholder:text-gray-400 font-sans bg-[#fafafa]"
      />
      <button className="h-full w-12 bg-[#bfa15f] hover:bg-[#a88d53] transition-colors flex items-center justify-center shrink-0">
        <Search className="text-white w-4 h-4" />
      </button>
    </div>
  );
}
