import {useSearchStore} from '~/stores/search';
import {motion} from 'motion/react';
import {useEffect, useRef} from 'react';
import { SearchIcon, XIcon } from 'lucide-react';

export default function SearchBar() {
  const {isOpen, setOpen} = useSearchStore();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  return (
    <motion.div
      initial={{opacity: 0, y: -20}}
      animate={{opacity: 1, y: 0}}
      exit={{opacity: 0, y: -20}}
      transition={{duration: 0.3, ease: [0.32, 0.72, 0, 1]}}
      className="absolute top-0 left-0 w-full h-16 bg-white z-50 flex items-center border-b border-zinc-100"
    >
      <div className="container mx-auto px-4 max-w-6xl">
        <form className="flex items-center w-full gap-4">
          <div className="flex-1 flex items-center gap-2 border-b border-zinc-200 pb-1">
            <SearchIcon size={20} className="text-zinc-400" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search Dunhill..."
              className="w-full bg-transparent outline-none text-base h-10"
              onKeyDown={(e) => {
                if (e.key === 'Escape') setOpen(false);
              }}
            />
          </div>
          <button
            type="button"
            className="p-2 hover:bg-zinc-50 rounded-full transition-colors"
            onClick={() => setOpen(false)}
          >
            <XIcon size={20} className="text-zinc-600" />
          </button>
        </form>
      </div>
    </motion.div>
  );
}