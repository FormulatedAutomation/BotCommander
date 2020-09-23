import Link from "next/link";
import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/router";
import MENU from '../constants/menu';


const Layout = (props) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const router = useRouter();
  const isActive = (path) => {
    return router.pathname.includes(path) ? `bg-gray-100` : `bg-white`;
  };

  return (
    <div>
      <Head>
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </Head>
      <div className="h-screen flex overflow-hidden bg-white">
        {drawerOpen && (
          <div className="md:hidden">
            <div className="fixed inset-0 z-30 transition-opacity ease-linear duration-300">
              <div className="absolute inset-0 bg-gray-600 opacity-75"></div>
            </div>
            <div className="fixed inset-0 flex z-40">
              <div className="flex-1 flex flex-col max-w-xs w-full bg-white transform ease-in-out duration-300 ">
                <div className="absolute top-0 right-0 -mr-14 p-1">
                  <button
                    onClick={() => setDrawerOpen(false)}
                    className="flex items-center justify-center h-12 w-12 rounded-full focus:outline-none focus:bg-gray-600"
                    aria-label="Close sidebar"
                  >
                    <svg
                      className="h-6 w-6 text-white"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                  <div className="flex-shrink-0 flex items-center px-4">
                    Hello!
                  </div>
                  <nav className="mt-5 px-2">
                    {MENU.map((item, i) => (
                      <Link href={item.link} key={i}>
                      <a
                        href="#"
                        className={`group ${isActive(
                          item.link
                        )} flex items-center px-2 py-2 text-base leading-6 font-medium text-gray-900 rounded-md focus:outline-none focus:bg-gray-200 transition ease-in-out duration-150`}
                      >
                        {item.icon}
                        {item.label}
                      </a>
                    </Link>
                    ))}

                  </nav>
                </div>
              </div>
              <div className="flex-shrink-0 w-14"></div>
            </div>
          </div>
        )}

        <div className="hidden md:flex md:flex-shrink-0">
          <div className="flex flex-col w-64 border-r border-gray-200 bg-white">
            <div className="h-0 flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
              <div className="flex items-center flex-shrink-0 px-4">
                <h3 className="text-lg font-bold">StatelessRPA</h3>
              </div>
              <nav className="mt-5 flex-1 px-2 bg-white">
                {MENU.map((item, i) => (
                  <Link href={item.link} key={i}>
                  <a
                    className={`group ${isActive(
                      item.link
                    )} flex items-center px-2 py-2 text-sm leading-5 font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 transition ease-in-out duration-150`}
                  >
                    {item.icon}
                    {item.label}
                  </a>
                </Link>
                ))}


              </nav>
            </div>
          </div>
        </div>
        <div
          className={`flex flex-col w-0 flex-1 overflow-hidden ${props.wrapperClass}`}
        >
          <div className="flex items-center md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3">
            <button
              onClick={() => setDrawerOpen(true)}
              className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:bg-gray-200 transition ease-in-out duration-150"
              aria-label="Open sidebar"
            >
              <svg
                className="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
          {props.children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
