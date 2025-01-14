import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import clienteAxios, { AxiosResponse } from 'axios';

@Injectable()
export class CountriesService {

  public async getAvailableCountries(): Promise<any[]> {
    try {
      const response: AxiosResponse<any, any> = await clienteAxios.get(`${process.env.AVAILABLE_COUNTRIES_URL}`);
      return response.data.map((country: any) => ({
        code: country.countryCode,
        name: country.name,
      }));
    } catch (error) {
      throw new Error(`Failed to fetch available countries: ${error.message}`);
    }
  }

  public async GetCountryInfo(countryCode: string): Promise<any> {
    try {
      const response: AxiosResponse<any, any> = await clienteAxios.get(`${process.env.BORDER_COUNTRIES_URL}/${countryCode}`);
      const { commonName, officialName, region, borders } = response.data;

      return {
        commonName,
        officialName,
        region,
        borders: borders.map((border: any) => ({
          commonName: border.commonName,
          officialName: border.officialName,
          countryCode: border.countryCode,
        })),
      };
    } catch (error) {
      throw new Error(`Failed to fetch country info: ${error.message}`);
    }
  }

  // public async GetPopulation(countryCode: string): Promise<any> {
  //   try {
  //     const countryName = await this.getCountryNameByCode(countryCode);

  //     const response: AxiosResponse<any, any> = await clienteAxios.post(
  //       `${process.env.POPULATION_DATA_URL}`,
  //       { country: countryName }
  //     );

  //     if (!response.data || !response.data.data || response.data.error) {
  //       throw new Error(`API response error: ${response.data?.msg || 'Unknown error'}`);
  //     }

  //     const countryData = response.data.data;
  //     if (countryData.country !== countryName) {
  //       throw new Error(`Population data not found for country: ${countryName}`);
  //     }

  //     const latestPopulation = countryData.populationCounts.slice(-1)[0];
  //     return {
  //       year: latestPopulation.year,
  //       population: latestPopulation.value,
  //     };
  //   } catch (error) {
  //     throw new Error(`Failed to fetch population data: ${error.message}`);
  //   }
  // }


  // public async GetFlag(countryCode: string): Promise<any> {
  //   try {
  //     const countryName = await this.getCountryNameByCode(countryCode);

  //     const response: AxiosResponse<any, any> = await clienteAxios.post(`${process.env.FLAG_URL}`, {
  //       "country": countryName
  //     });
  //     const countryData = response.data.data.find((item: any) => item.name === countryName);

  //     if (!countryData) {
  //       throw new Error(`Flag not found for country: ${countryName}`);
  //     }

  //     return {
  //       name: countryData.name,
  //       flagUrl: countryData.flag,
  //     };
  //   } catch (error) {
  //     throw new Error(`Failed to fetch flag: ${error.message}`);
  //   }
  // }


  // private async getCountryNameByCode(countryCode: string): Promise<string> {
  //   const countries = await this.getAvailableCountries();
  //   const country = countries.find(country => country.code.toUpperCase() === countryCode.toUpperCase());
  //   if (!country) {
  //     throw new Error(`Country code ${countryCode} not found in available countries.`);
  //   }
  //   return country.name;

  // }
}
