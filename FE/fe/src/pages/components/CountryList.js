"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const CountryList = () => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      const response = await axios.get('http://localhost:8080/countries/AvailableCountries');
      setCountries(response.data);
    };

    fetchCountries();
  }, []);

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-4">Country List</h1>
      <ul className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {countries.map(country => (
          <li key={country.code} className="border rounded p-4 hover:bg-gray-100">
            <Link href={`/country/${country.code}`} className="text-blue-500 hover:underline">
              {country.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default dynamic(() => Promise.resolve(CountryList), { ssr: false });
