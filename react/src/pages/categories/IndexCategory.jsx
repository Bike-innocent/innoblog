import React from 'react';
import { Tab } from '@headlessui/react';
import Categories from './Categories';
import SubCategories from './SubCategories';
// import Tags from './Tags';

function IndexCategory() {
  return (
    <div className="w-full  px-2 py-16 sm:px-0">
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
          <Tab as={React.Fragment}>
            {({ selected }) => (
              <button
                className={`w-full rounded py-2.5 font-medium leading-5 text-blue-700
                  ${selected ? 'bg-blue-300' : 'text-black hover:bg-gray-100'}
                `}
              >
                Categories
              </button>
            )}
          </Tab>
          <Tab as={React.Fragment}>
            {({ selected }) => (
              <button
                className={`w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700
                  ${selected ? 'bg-blue-300' : 'text-black hover:bg-gray-100'}
                `}
              >
                SubCategories
              </button>
            )}
          </Tab>
          {/* <Tab as={React.Fragment}>
            {({ selected }) => (
              <button
                className={`w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700
                   ${selected ? 'bg-blue-300' : 'text-black hover:bg-gray-100'}
                `}
              >
                Tags
              </button>
            )}
          </Tab> */}
        </Tab.List>
        <Tab.Panels className="mt-2">
          <Tab.Panel className="rounded-xl bg-white p-3 shadow">
            <Categories />
          </Tab.Panel>
          <Tab.Panel className="rounded-xl bg-white p-3 shadow">
            <SubCategories />
          </Tab.Panel>
          {/* <Tab.Panel className="rounded-xl bg-white p-3 shadow">
            <Tags />
          </Tab.Panel> */}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}

export default IndexCategory;
