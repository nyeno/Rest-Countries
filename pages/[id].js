import { useRouter } from "next/router";
import { useState } from "react";

import HomeIcon from "@mui/icons-material/Home";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowBack from "@mui/icons-material/ArrowBack";

import Data from "../data.json";

export const getStaticPaths = async () => {
  const res = await fetch("https://restcountries.com/v2/all");
  const data = await res.json();
  // map data to an array of path objects with params (id)
  const paths = data.map((country) => {
    return {
      params: { id: country.name.toLowerCase() },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const id = context.params.id;
  //console.log(id)
  const res = await fetch("https://restcountries.com/v2/name/" + id);
  const data = await res.json();

  return {
    props: { country: data },
  };
};

const Details = ({ country }) => {
  function convertAlpha(border) {
    const newFilter = Data.filter((value) => {
      return value.alpha3Code.toLowerCase() == border.toLowerCase();
    });

    //console.log(newFilter[0].name)
    return newFilter[0].name;
  }

  function allMembers(obj) {
    let arr = [];
    if (obj != undefined) {
      obj.forEach((el) => arr.push(el.name));
      return arr.join(", ");
    } else {
      return "None";
    }
  }

  const router = useRouter();

  const handleClick = (e) => {
    e.preventDefault();
    router.push("/" + e.target.innerText.toLowerCase());
  };

  return (
    <div className="">
      <div className="py-10 flex justify-between px-[5vw] lg:px-16 ">
        <button
          onClick={() => router.back()}
          className="px-8 py-2 rounded-lg shadow bg-white dark:bg-dark-element"
        >
          <ArrowBackIcon fontSize="small" className="mr-3" />
          Back
        </button>
        <button
          onClick={() => router.push("/")}
          className="px-6 py-2 rounded-lg shadow bg-white dark:bg-dark-element"
        >
          <HomeIcon fontSize="small" className="mr-3" />
          Home
        </button>
      </div>
      <section className="lg:flex lg:justify-between px-[5vw] lg:px-16">
        <div className="lg:basis-3/4 my-8 lg:my-0">
          <img
            src={country[0].flags.svg}
            className="rounded-xl lg:w-5/6 w-full shadow"
          />
        </div>
        <div className="lg:grid lg:grid-cols-2">
          <h1 className="col-span-2 text-3xl font-bold lg:mb-0 my-8">
            {" "}
            {country[0].name}{" "}
          </h1>
          <div className="space-y-2">
            <h3>
              <span className="font-semibold">Native Name: </span>
              {country[0].nativeName}
            </h3>
            <h3>
              <span className="font-semibold">Population: </span>
              {country[0].population.toLocaleString()}
            </h3>
            <h3>
              <span className="font-semibold">Region: </span>
              {country[0].region}
            </h3>
            <h3>
              <span className="font-semibold">Sub Region: </span>
              {country[0].subregion}
            </h3>
            <h3>
              <span className="font-semibold">Capital: </span>
              {country[0].capital}
            </h3>
          </div>
          <div className="lg:ml-6 lg:mt-0 mt-8 space-y-2">
            <h3>
              <span className="font-semibold">Top Level Domain: </span>
              {country[0].topLevelDomain}
            </h3>
            <h3>
              <span className="font-semibold">Currencies: </span>
              {allMembers(country[0].currencies)}
            </h3>
            <h3>
              <span className="font-semibold">Languages: </span>
              {allMembers(country[0].languages)}
            </h3>
          </div>
          {country[0].borders && (
            <div className="col-span-2 font-semibold lg:flex items-center mt-10 lg:mt-6">
              Border Countries:
              <div className="basis-3/4 lg:ml-4 mt-2 lg:mt-0 space-y-4 ">
                {country[0].borders.map((border) => (
                  <button
                    onClick={handleClick}
                    className="px-6 py-2 lg:ml-4 mr-4 font-normal shadow rounded-md bg-white dark:bg-dark-element"
                    key={border}
                  >
                    {convertAlpha(border)}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Details;
