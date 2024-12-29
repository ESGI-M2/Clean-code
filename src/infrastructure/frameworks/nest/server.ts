import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import DatabaseAdapter from '@triumph/shared-infrastructure/database-adapter/database-adapter.interface';

class NestServer {
  private readonly serverName = 'Nest';
  private readonly serverPort = parseInt(process.env.PORT || '3000');

  async bootstrap() {
    const applicationContext = await NestFactory.createApplicationContext(AppModule);

    const databaseAdapter = applicationContext.get(DatabaseAdapter);
    await databaseAdapter.connect();

    const application = await NestFactory.create(AppModule);
    await application.listen(this.serverPort, () => {
      console.log(`\x1b[34m%s\x1b[0m`, `${this.serverName} server is running on port ${this.serverPort}`);
    });
  }
}

new NestServer().bootstrap();
