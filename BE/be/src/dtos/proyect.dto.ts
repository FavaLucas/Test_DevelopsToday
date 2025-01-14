export class countryDTO {
  countryCode: string;
  name: string;
} 

export class countryInfoDTO {
  commonName: string;
  officialName: string;
  countryCode: string;
  region: string;
  borders: countryBorders[]
}

export class countryBorders {
  commonName: string;
  officialName: string;
  countryCode: string;
  region: string;
  borders: string[]
}

export class populationDTO {
  country: string;
  code: string; 
  iso3: string;
  //Revisar tipo de dato de populationCount
  pupulationCounts: pupulationCounts[]
}

export class pupulationCounts {
  year: number;
  value: number
}


export class flagDTO {
  name: string;
  flag: string;
  iso2: string;
  iso3: string;
}