import { databaseService } from '@pjblog/core';
import { BlogPluginEntity } from './entity';
import { getBlogPluginConfigs } from './utils';

export class BlogServer extends databaseService {
  /**
   * Get entity repository
   * @usage
   * 
   *  this.repository.query(....)
   */
  get repository() {
    return this.manager.getRepository(BlogPluginEntity);
  }

  /**
   * Get plugin runtiming configs
   * @usage
   * 
   *  this.configs.abc
   */
  get configs() {
    return getBlogPluginConfigs();
  }

  public all(i: number) {
    return this.repository.find({
      take: i
    });
  }
}