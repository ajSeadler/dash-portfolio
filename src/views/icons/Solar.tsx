import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Solar = () => {
  const [meme, setMeme] = useState<{ url: string; title: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMeme = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('https://meme-api.com/gimme');
      const data = await res.json();
      setMeme({ url: data.url, title: data.title });
    } catch {
      setMeme({
        url: 'https://i.imgur.com/8Km9tLL.jpg',
        title: 'Fallback Meme',
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMeme();
  }, []);

  return (
    <div className="relative max-w-screen mx-auto px-8 py-4 bg-gray-900 rounded-2xl shadow-xl overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-4"
      >
        <div>
          <h5 className="text-gray-400 uppercase text-xs tracking-widest">Via Reddit</h5>
          <h2 className="mt-1 text-2xl font-bold text-white">A Quick Laugh</h2>
        </div>

        <div className="bg-gray-800 rounded-lg overflow-hidden shadow-inner min-h-[300px] flex items-center justify-center">
          {isLoading ? (
            <div className="w-full h-[60vh] bg-gray-700 animate-pulse rounded-md" />
          ) : (
            meme && (
              <motion.img
                src={meme.url}
                alt={meme.title}
                className="w-full max-h-[60vh] object-contain"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
              />
            )
          )}
        </div>

        {!isLoading && meme?.title && (
          <p className="text-gray-300 text-sm line-clamp-2">{meme.title}</p>
        )}

        <motion.button
          onClick={(e) => {
            e.stopPropagation();
            fetchMeme();
          }}
          className="mt-4 inline-block px-6 py-2 rounded-full bg-[#14213d] text-white font-medium tracking-wide shadow hover:bg-opacity-90 transition"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          Next Meme
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Solar;
