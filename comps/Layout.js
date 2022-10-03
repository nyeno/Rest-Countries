import Brightness4OutlinedIcon from "@mui/icons-material/Brightness4Outlined";

import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import Head from "next/head";

const Layout = ({ children }) => {
  const { systemTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const renderThemeChanger = () => {
    if (!mounted) return null;

    const currentTheme = theme === "system" ? systemTheme : theme;

    if (currentTheme === "dark") {
      return (
        <button
          className="space-x-2 lg:space-x-4 font-semibold"
          onClick={() => setTheme("light")}
        >
          <Brightness4OutlinedIcon fontSize="small" className="lg:mr-4 mr-2" />
          Change Theme
        </button>
      );
    } else {
      return (
        <button
          className="space-x-2 lg:space-x-4 font-semibold"
          onClick={() => setTheme("dark")}
        >
          <Brightness4OutlinedIcon fontSize="small" className="lg:mr-4 mr-2" />
          Change Theme
        </button>
      );
    }
  };

  return (
    <>
      <Head>
        <title>Countries and flags</title>
        <meta
          name="description"
          content="Countries of the planet with theme switcher"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@300;600;800&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      <div>
        <header className="flex justify-between z-50 lg:px-12 px-6 py-6 bg-white dark:bg-dark-element drop-shadow sticky top-0">
          <h1 className="font-extrabold lg:text-2xl text-md">
            Where in the world?
          </h1>
          {renderThemeChanger()}
        </header>
        {children}
        <footer className="mt-8 text-center">
          Created by Eno Nyenooke Laura
        </footer>
      </div>
    </>
  );
};

export default Layout;
