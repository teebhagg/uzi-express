interface NavItem {
  title: string;
  href: string;
  external?: boolean;
}

interface SearchItem {
  mainNav: NavItem[];
  sidebarNav: NavItem[];
}

export const searchData: SearchItem = {
  mainNav: [
    {
      title: "Documentation",
      href: "/docs",
    },

    {
      title: "GitHub",
      href: "https://github.com/accretence",
      external: true,
    },
  ],
  sidebarNav: [
    {
      title: "Products",
      href: "/products",
    },
    {
      title: "Blog",
      href: "/blog",
    },
    {
      title: "Orders",
      href: "/profile/orders",
    },
    {
      title: "Payments",
      href: "/profile/payments",
    },
    {
      title: "Contact",
      href: "/contact",
    },
    {
      title: "About",
      href: "/about",
    },
  ],
};
