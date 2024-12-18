import DatabaseAdapter from '@triumph/shared-infrastructure/database-adapter/database-adapter.interface';
import ExpressApplication from './src/express-application';
import container from './src/ioc/container.registry';
import IndexRoute from './src/routes/index-route'; // Importation de IndexRoute

class ExpressServer {
  private readonly serverName = 'Express';
  private readonly serverPort = parseInt(process.env.PORT || '3000');

  constructor(private readonly expressApplication: ExpressApplication) {}

  async bootstrap() {
    const databaseAdapter = container.resolve<DatabaseAdapter>('DatabaseAdapter');
    await databaseAdapter.connect();

    const expressApplication = this.expressApplication.configureExpressApplication();

    const indexRoute = new IndexRoute();
    indexRoute.configureRoutes(expressApplication);

    await expressApplication.listen(this.serverPort, () => {
      console.log(`\x1b[34m%s\x1b[0m`, `${this.serverName} server is running on port ${this.serverPort}`);
    });
  }
}

const expressApplication = container.resolve<ExpressApplication>('ExpressApplication');
new ExpressServer(expressApplication).bootstrap();
