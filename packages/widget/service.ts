import { injectable } from 'inversify';
import { getBlogPluginConfigs } from './utils';

@injectable()
export class BlogPluginService {
  get configs() {
    return getBlogPluginConfigs();
  }

  public sum(a: number, b: number) {
    return a + b + this.configs.abc;
  }
}