import { inject } from 'inversify';
import { HTTPController } from '@typeservice/http';
import { BlogPluginRouter, getBlogPluginConfigs, numberable } from './utils';
import { BlogServer } from './dbo';
import { BlogPluginService } from './service';
import { HTTPRouterMiddleware, HTTPRequestQuery } from '@typeservice/http';
import { Controller, BlogUserInfoMiddleware, BlogUserLoginedMiddleware, BlogUserLoginedWithAdminMiddleware } from '@pjblog/core';

@HTTPController()
export class HttpBlogPlugin extends Controller {
  @inject(BlogPluginService) private readonly service: BlogPluginService;

  get configs() {
    return getBlogPluginConfigs();
  }

  @BlogPluginRouter({
    pathname: '/control/sum',
    methods: 'GET'
  })
  @HTTPRouterMiddleware(BlogUserInfoMiddleware)
  @HTTPRouterMiddleware(BlogUserLoginedMiddleware)
  @HTTPRouterMiddleware(BlogUserLoginedWithAdminMiddleware)
  public getAll(
    @HTTPRequestQuery('a', numberable(0)) a: number,
    @HTTPRequestQuery('b', numberable(0)) b: number,
  ) {
    const dbo = new BlogServer(this.dataSource.manager);
    return dbo.all(this.service.sum(a, b));
  }
}