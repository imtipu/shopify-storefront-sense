import {GoArrowRight} from 'react-icons/go';

export default function FooterEmailSubscribe() {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <h2 className="text-xl xl:text-2xl text-zinc-700 font-medium tracking-wide leading-16">
        Get 20% off your first order
      </h2>
      <p className="text-sm xl:text-md text-zinc-600 font-normal tracking-wide leading-7">
        Join our email list for exclusive offers and the latest news.
      </p>
      <form className="flex flex-col w-full max-w-md py-8 mb-10">
        <div className="flex border-2 border-zinc-600 items-center justify-center overflow-hidden relative rounded-2xl h-12 bg-white/50">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="px-3 py-1.5 text-sm font-medium text-zinc-700 h-full ring-0 border-none outline-none w-full"
          />
          <button
            type="submit"
            className="px-3 py-1.5 h-full ml-auto flex flex-col items-center justify-center"
          >
            <GoArrowRight size={18} />
          </button>
        </div>
      </form>
    </div>
  );
}
