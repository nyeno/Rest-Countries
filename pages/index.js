import Link from "next/link";

import React, { useState, useEffect, useCallback } from "react";
import SearchIcon from "@mui/icons-material/Search";
import Pagination from "../comps/Paginate";
import Drop from "../comps/Drop";
import Image from "next/image";

export const getStaticProps = async () => {
  const res = await fetch("https://restcountries.com/v2/all");
  const data = await res.json();

  return {
    props: { countries: data },
  };
};

const Countries = ({ countries }) => {
  const [wordEntered, setWordEntered] = useState("");

  const [searching, setSearching] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);

  const [postsPerPage] = useState(16);

  const [countriesToDisplay, setCountiesToDisplay] = useState(countries);

  // Get current posts

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const filteredCountres = countriesToDisplay.slice(
    firstPostIndex,
    lastPostIndex
  );

  //

  const regions = [
    { id: 1, name: "Filter by Region" },
    { id: 2, name: "Africa" },
    { id: 3, name: "Americas" },
    { id: 4, name: "Asia" },
    { id: 5, name: "Europe" },
    { id: 6, name: "Oceania" },
  ];

  const currentPosts = countries.slice(firstPostIndex, lastPostIndex);
  const [filteredData, setFilteredData] = useState(currentPosts);
  const [selected, setSelected] = useState(regions[0]);

  const handleFilter = useCallback((filterRegion) => {
    let filteredRegion = countries.filter((select) => {
      return select.region.toLowerCase() === filterRegion.name.toLowerCase();
    });
    if (filterRegion.name === "Filter by Region") {
      setCountiesToDisplay(countries);
      setCurrentPage(1);
    } else {
      setCountiesToDisplay(filteredRegion);
      setCurrentPage(1);
    }
  }, []);

  const handleSearch = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = countries.filter((value) => {
      return value.name.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData(currentPosts);
      setSearching(false);
    } else {
      setFilteredData(newFilter);
      setSearching(true);
    }
  };

  useEffect(() => {
    handleFilter(selected);
    //console.log(selected);
  }, [selected, handleFilter]);

  return (
    <div className="py-6 px-[5vw] lg:px-14">
      <div className="lg:flex lg:justify-between mb-8">
        <div className="my-8 bg-white text-light-input dark:text-white dark:bg-dark-element lg:w-5/12 w-full py-4 lg:px-8 px-4 space-x-4 rounded-md shadow-md">
          <SearchIcon />
          <input
            type="text"
            placeholder="Search for something..."
            value={wordEntered}
            onChange={handleSearch}
            className="outline-0"
          />
        </div>
        <Drop regions={regions} selected={selected} setSelected={setSelected} />
      </div>

      {filteredData.length != 0 && searching && (
        <div className="grid lg:grid-cols-4 gap-12 grid-cols-1">
          {filteredData.map((country, key) => {
            return (
              <Link href={"/" + country.name.toLowerCase()} key={country.name}>
                <a className="bg-white dark:bg-dark-element rounded-xl pb-8 shadow transition ease-in-out hover:-translate-y-1 hover:scale-105">
                  <Image src={country.flags.png} className="rounded-t-xl h-2/6 w-full" width="100%" height="75%" layout="responsive" alt="Countrty flag"/>
                  <h3 className="font-bold my-4 ml-6 text-lg">{ country.name }</h3>

                  <p className="ml-6 mb-2">
                    <span className="font-semibold">Population: </span>
                    {country.population.toLocaleString()}
                  </p>
                  <p className="ml-6 mb-2">
                    <span className="font-semibold">Region: </span>
                    {country.region}
                  </p>
                  <p className="ml-6 mb-2">
                    <span className="font-semibold">Capital: </span>
                    {country.capital}
                  </p>
                </a>
              </Link>
            );
          })}
        </div>
      )}

      {!searching && (
        <div className="grid lg:grid-cols-4 gap-12 grid-cols-1">
          {filteredCountres.map((country, key) => {
            return (
              <Link href={"/" + country.name.toLowerCase()} key={country.name}>
                <a className="bg-white dark:bg-dark-element rounded-xl lg:mb-0 pb-8 shadow transition ease-in-out hover:-translate-y-1 hover:scale-105">
                  <Image src={country.flags.png} className="rounded-t-xl h-2/6 w-full" width="95%" height="75%" layout="responsive" alt="Countrty flag"/>
                  <h3 className="font-bold my-6 ml-6 text-lg">{ country.name }</h3>

                  <p className="ml-6 mb-2">
                    <span className="font-semibold">Population: </span>
                    {country.population.toLocaleString()}
                  </p>
                  <p className="ml-6 mb-2">
                    <span className="font-semibold">Region: </span>
                    {country.region}
                  </p>
                  <p className="ml-6 mb-2">
                    <span className="font-semibold">Capital: </span>
                    {country.capital}
                  </p>
                </a>
              </Link>
            );
          })}
        </div>
      )}

      {!searching && (
        <Pagination
          totalPosts={countriesToDisplay.length}
          postsPerPage={postsPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          //onClick={() => setFilteredData(currentPosts)}
          //paginate={setFilteredData(currentPosts)}
        />
      )}
    </div>
  );
};

export default Countries;
