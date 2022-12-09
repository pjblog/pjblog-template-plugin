import { Logger } from '@pjblog/logger';
import { Provider, Consumer, LifeError, Meta } from '@pjblog/manager';
import { TypeORM } from '@pjblog/typeorm';
import { Http, getWaterFall } from '@pjblog/http';
import { Plugin } from '@pjblog/core';
import { BlogPluginEntity } from './entity';
import { TestController } from './controller';
import { GetControlArticles } from '@pjblog/core';
import { IConfigs } from './utils';

@Provider
export default class Test extends Plugin<IConfigs> {
  @Consumer(Logger) private readonly Logger: Logger;
  @Consumer(TypeORM) private readonly TypeORM: TypeORM;
  @Consumer(Http) private readonly Http: Http;

  constructor(meta: Meta) {
    super(meta);
    /**
     * 在重启时候自动注入数据库描述
     */
    TypeORM.entities.add(BlogPluginEntity)
  }

  get logger() {
    return this.Logger.value;
  }

  get http() {
    return this.Http;
  }

  /**
   * 新安装插件时候的生命周期
   * 一般会将数据表描述卸乳
   */
  public async install(): Promise<void> {
    await this.TypeORM.synchronize(BlogPluginEntity);
    // 尝试获取表列表
    const res = await this.TypeORM.value.manager.getRepository(BlogPluginEntity).findAndCount();
    console.log('res:', ...res);
    this.logger.info('TEST Install.');
  }

  /**
   * 卸载插件时候专有生命周期
   */
  public async uninstall(): Promise<void> {
    this.logger.info('TEST UnInstall.');
  }

  public onerror(e: LifeError): void {
    this.logger.error(e.stack)
  }

  /**
   * 服务器启动时候逻辑处理
   * @returns 
   */
  public async initialize(): Promise<void | (() => Promise<void>)> {
    // 添加路由
    this.http.addController(this, TestController);

    // 通过waterFallHooks动态拦截嵌入插件功能
    const water = getWaterFall(GetControlArticles);
    water.add('getList2', {
      after: 'getList',
      callback(ctx, value) {
        console.log('getList2', ctx.path, value.length);
        return value;
      }
    })

    // 尝试从storage获取数据
    console.log('abc', this.storage.get('abc'));
    
    this.logger.info('TEST Initialized.');
    return async () => {
      water.del('getList2');
      this.http.delController(TestController);
      this.logger.info('TEST Terminated.');
    }
  }
}