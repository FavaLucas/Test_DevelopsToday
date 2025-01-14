"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Link from 'next/link';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import dynamic from 'next/dynamic';

const CountryDetails = () => {
  const router = useRouter();
  const { code } = router.query;
  const [countryInfo, setCountryInfo] = useState(null);
  const [populationData, setPopulationData] = useState([]);
  const [flagUrl, setFlagUrl] = useState(null);

  useEffect(() => {
    if (code) {
      const fetchCountryInfo = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/countries/countryInfo/${code}`);
          setCountryInfo(response.data.countryInfo);

          // Fetch population data
          const populationResponse = await axios.post(process.env.NEXT_PUBLIC_POPULATION_DATA_URL, { country: response.data.countryInfo.commonName });
          if (populationResponse.data && populationResponse.data.data) {
            setPopulationData(populationResponse.data.data.populationCounts);
          } else {
            console.error('Error fetching population data:', populationResponse.data);
          }

          // Fetch flag URL
          const flagResponse = await axios.post(process.env.NEXT_PUBLIC_FLAG_URL, { country: response.data.countryInfo.commonName });
          if (flagResponse.data && flagResponse.data.data) {
            setFlagUrl(flagResponse.data.data.flag);
          } else {
            console.error('Error fetching flag data:', flagResponse.data);
          }

        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      fetchCountryInfo();
    }
  }, [code]);

  if (!countryInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-4">{countryInfo.commonName} ({countryInfo.officialName})</h1>
      {flagUrl && <img src={flagUrl} alt={`${countryInfo.commonName} flag`} className="w-20 h-auto mb-4" />}
      <p className="mb-4"><strong>Region:</strong> {countryInfo.region}</p>
      <h2 className="text-2xl font-semibold mb-2">Border Countries</h2>
      <ul className="mb-4">
        {countryInfo.borders.map(border => (
          <li key={border.countryCode} className="hover:bg-gray-100 p-2">
            <Link href={`/country/${border.countryCode}`} className="text-blue-500 hover:underline">
              {border.commonName}
            </Link>
          </li>
        ))}
      </ul>
      <h2 className="text-2xl font-semibold mb-2">Population Over Time</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={populationData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="value" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default dynamic(() => Promise.resolve(CountryDetails), { ssr: false });
