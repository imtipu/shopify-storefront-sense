import { MotionNavLink } from '~/components/motion/NavLink';

import type { HeaderQuery } from 'storefrontapi.generated';

interface Props {
    menu: HeaderQuery['menu'];
    publicStoreDomain: string;
    primaryDomainUrl: string;
}

export default function MainMenu(props: Props) {
    const {menu, publicStoreDomain, primaryDomainUrl} = props;
    return (
      <div className="flex flex-col items-center justify-center w-full">
        <nav
          role="navigation"
          aria-label="Main menu"
          className="flex flex-row w-full justify-center items-center"
            >

                {(menu || FALLBACK_HEADER_MENU).items.map((item, index) => {
                    if (!item.url) return null;

                    const url =
                      item.url.includes('myshopify.com') ||
                      item.url.includes(publicStoreDomain) ||
                      item.url.includes(primaryDomainUrl)
                        ? new URL(item.url).pathname
                        : item.url;
                    return (
                      <MotionNavLink
                        initial={{opacity: 0, y: -5}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 0.2}}
                        to={url}
                        className={activeLinkClass}
                        key={index}
                      >
                        {item.title}
                      </MotionNavLink>
                    );
                })}
        </nav>
      </div>
    );
}

function activeLinkClass({
  isActive,
  isPending,
}: {
  isActive: boolean;
  isPending: boolean;
}) {
  let className =
    'header-menu-item text-sm px-2 py-3 transition-all duration-200 ease-in-out tracking-wide hover:text-zinc-800 hover:scale-105';
  if (isActive) {
    className += ' font-medium text-zinc-800';
  } else {
    className += ' font-light text-zinc-600';
  }
  if (isPending) {
    className += ' text-gray-500';
  }
  return className;
}


const FALLBACK_HEADER_MENU = {
  id: 'gid://shopify/Menu/199655587896',
  items: [
    {
      id: 'gid://shopify/MenuItem/461609500728',
      resourceId: null,
      tags: [],
      title: 'Collections',
      type: 'HTTP',
      url: '/collections',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609533496',
      resourceId: null,
      tags: [],
      title: 'Blog',
      type: 'HTTP',
      url: '/blogs/journal',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609566264',
      resourceId: null,
      tags: [],
      title: 'Policies',
      type: 'HTTP',
      url: '/policies',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609599032',
      resourceId: 'gid://shopify/Page/92591030328',
      tags: [],
      title: 'About',
      type: 'PAGE',
      url: '/pages/about',
      items: [],
    },
  ],
};
