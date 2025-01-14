import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DevtoolsModule } from '@nestjs/devtools-integration';
import { DataModule } from './modules/data.module';
import { CountriesController } from './controllers/data.controller';
import { CountriesService } from './services/data.service';


@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    DevtoolsModule.register({
      http: process.env.NODE_ENV !== 'production',
    }),
  ],
  controllers: [AppController, CountriesController],
  providers: [AppService, CountriesService],
})
export class AppModule {}
