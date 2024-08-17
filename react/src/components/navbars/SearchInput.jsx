import React from 'react';
import { Input } from '@nextui-org/react';
import { AiOutlineLike } from 'react-icons/ai';
const SearchInput = ({ isSearchOpen, handleSearchToggle }) => {
  return (
    <div className="relative flex items-center">
      {isSearchOpen ? (
        <div className="absolute inset-0 z-50 flex items-center bg-gray-800 p-2 rounded-lg">
          <Input
            isClearable
            radius="md"
            size="md"
            classNames={{
              label: "text-black/50 dark:text-white/90",
              input: [
                "bg-transparent",
                "text-black dark:text-white/90",
                "placeholder:text-default-700/50 dark:placeholder:text-white/60",
              ],
              innerWrapper: "bg-transparent",
              inputWrapper: [
                "bg-gray-100",
                "dark:bg-default/60",
                "backdrop-blur-xl",
                "backdrop-saturate-200",
                "hover:bg-default-200/70",
                "dark:hover:bg-default/70",
                "group-data-[focus=true]:bg-default-200/50",
                "dark:group-data-[focus=true]:bg-default/60",
                "!cursor-text",
              ],
            }}
            placeholder="Type to search..."
            startContent={
              <AiOutlineLike className="text-black/50 mb-0.5 dark:text-white/90 pointer-events-none flex-shrink-0" />
            }
            endContent={
              <button onClick={handleSearchToggle}>
                <AiOutlineLike className="text-black/50 dark:text-white/90 pointer-events-none flex-shrink-0" />
              </button>
            }
          />
        </div>
      ) : (
        <button onClick={handleSearchToggle}>
          <AiOutlineLike className="text-white" />
        </button>
      )}
    </div>
  );
};

export default SearchInput;
