import { Module } from '@nestjs/common';
import { CountriesService } from 'src/services/data.service';

@Module({
  imports: [],
  providers: [CountriesService],
  exports: [CountriesService],
})
export class DataModule { }