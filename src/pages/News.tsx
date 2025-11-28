import { Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Newspaper } from 'lucide-react';
import { THEME } from '../lib/theme.ts';
import { DATA } from '../lib/data.ts';

export default function News() {
  return (
    <div className={`min-h-screen ${THEME.bg} p-4 md:p-8 font-sans`}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-[#6F4E37] hover:text-[#8A9A5B] transition-colors mb-4"
          >
            <ArrowLeft size={20} />
            <span className="font-semibold">Back to Home</span>
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <Newspaper className="text-[#8A9A5B]" size={32} />
            <h1 className={`text-4xl font-bold ${THEME.text}`}>News</h1>
          </div>
          <p className="text-[#6F4E37] text-lg">
            Stay updated with the latest news and updates.
          </p>
        </div>

        {/* News Content */}
        <div className="space-y-6">
          {DATA.news.map((item) => (
            <div key={item.id} className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-[#E8DCCA] shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-bold uppercase tracking-widest text-[#8A9A5B]">
                  {item.category}
                </span>
                <span className="text-xs text-[#888]">•</span>
                <span className="text-xs text-[#888]">{item.date}</span>
              </div>
              <h2 className="text-2xl font-bold text-[#4B3832] mb-2">
                {item.title}
              </h2>
              <p className="text-[#6F4E37] leading-relaxed mb-4">
                {item.description}
              </p>
              {item.ctaLink && item.ctaText && (
                <a
                  href={item.ctaLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#8A9A5B] text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
                >
                  <span>{item.ctaText}</span>
                  <ExternalLink size={16} />
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

