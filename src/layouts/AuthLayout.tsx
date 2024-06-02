import { useEffect, useRef, useState } from "react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";

export default function Authlayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headerRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [footerHeight, setFooterHeight] = useState(0);
  const [childrenContainerHeight, setChildrenContainerHeight] = useState(0);
  const [footerCollapsed, setFooterCollapsed] = useState(false);

  const handleFooterCollapse = () => {
    setFooterCollapsed(!footerCollapsed);
  };

  const calculateHeights = () => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.clientHeight);
    }
    if (footerRef.current) {
      setFooterHeight(footerRef.current.clientHeight);
    }
    setChildrenContainerHeight(
      window.innerHeight - headerHeight - footerHeight
    );
  };

  useEffect(() => {
    // Initial height calculation
    calculateHeights();
  }, [
    headerRef,
    footerRef,
    headerHeight,
    footerHeight,
    childrenContainerHeight,
    footerCollapsed,
  ]);

  useEffect(() => {
    window.addEventListener("resize", calculateHeights);
    window.addEventListener("load", calculateHeights);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", calculateHeights);
      window.removeEventListener("load", calculateHeights);
    };
  }, [headerHeight, footerHeight]);

  const headerLinks = [
    {
      name: "Login",
      url: "/login",
      active: window.location.pathname === "/login",
    },
    {
      name: "Register",
      url: "/register",
      active: window.location.pathname === "/register",
    },
  ];

  const footerLinks = [
    {
      sectionName: "Company",
      subLinks: [
        { title: "About Us", url: "/about" },
        { title: "Contact Us", url: "/contact" },
        { title: "Careers", url: "/careers" },
      ],
    },
    {
      sectionName: "Help",
      subLinks: [
        { title: "Payments", url: "/payments" },
        { title: "Shipping", url: "/shipping" },
        { title: "Cancellation & Returns", url: "/cancellation" },
      ],
    },
    {
      sectionName: "Policy",
      subLinks: [
        { title: "Return Policy", url: "/return" },
        { title: "Terms of Use", url: "/terms" },
        { title: "Privacy Policy", url: "/privacy" },
      ],
    },
  ];

  return (
    <div className="h-full bg-gray-100 overflow-hidden">
      <Header
        showTopBanner
        topBannerText="🎉 50% off on all products"
        links={headerLinks}
        logo="🛒X Mart"
        headerRef={headerRef}
      />
      <div
        className="w-full p-4 overflow-auto"
        style={{
          marginTop: headerHeight,
          height: `${childrenContainerHeight}px`,
        }}
      >
        {children}
      </div>
      <Footer
        footerRef={footerRef}
        collapsed={footerCollapsed}
        handleCollapse={handleFooterCollapse}
        links={footerLinks}
      />
    </div>
  );
}
