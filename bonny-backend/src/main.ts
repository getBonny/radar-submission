import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv'
dotenv.config()

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  await app.listen(process.env.PORT).then(() => console.log(`listening on port ${process.env.PORT}`));
}

bootstrap();
