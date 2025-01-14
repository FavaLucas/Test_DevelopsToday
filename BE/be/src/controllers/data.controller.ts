import { Controller, Get, HttpException, HttpStatus, Param } from "@nestjs/common";
import { CountriesService } from "src/services/data.service";

@Controller('/countries')

export class CountriesController {
  constructor(private countriesService: CountriesService) { }

  @Get('/AvailableCountries')
  public async getAvailableCountries(): Promise<any[]> {
    try {
      return await this.countriesService.getAvailableCountries();
    } catch (error) {
      throw error;
    };
  };

  @Get('/countryInfo/:countryCode')
  public async GetCountryInfo(@Param('countryCode') countryCode: string): Promise<any> {
    try {
      const countryInfo = await this.countriesService.GetCountryInfo(countryCode);

      return {
        countryInfo
      };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    };
  }
}


