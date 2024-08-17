import React from 'react';
import { Dialog, Transition } from '@headlessui/react';
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  LinkedinShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  LinkedinIcon,
} from 'react-share';
import { BsLink } from 'react-icons/bs';
import { Fragment } from 'react';

const Share = ({ isOpen, onClose, postUrl }) => {
  const handleCopyLink = () => {
    navigator.clipboard.writeText(postUrl);
    alert('Link copied to clipboard!');
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Share this post
                </Dialog.Title>
                <div className="mt-4 flex justify-center space-x-4">
                  <FacebookShareButton url={postUrl}>
                    <FacebookIcon size={48} round />
                  </FacebookShareButton>
                  <TwitterShareButton url={postUrl}>
                    <TwitterIcon size={48} round />
                  </TwitterShareButton>
                  <WhatsappShareButton url={postUrl}>
                    <WhatsappIcon size={48} round />
                  </WhatsappShareButton>
                  <LinkedinShareButton url={postUrl}>
                    <LinkedinIcon size={48} round />
                  </LinkedinShareButton>
                  <button onClick={handleCopyLink} className="flex flex-col items-center">
                    <BsLink size={48} className="text-gray-600" />
                    <span className="text-sm">Copy Link</span>
                  </button>
                </div>

                <div className="mt-6">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={onClose}
                  >
                    Close
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Share;
