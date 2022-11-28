import { defineWidget } from '@pjblog/core';
import { BlogPluginEntity } from './entity';
import { HttpBlogPlugin } from './http';
import { BlogPluginService } from './service';
import { TConfigs } from './types';

export default defineWidget<TConfigs>({
  entities: [BlogPluginEntity],
  controllers: [HttpBlogPlugin],
  services: [BlogPluginService],
  configs: [
    {
      type: 'number',
      name: 'abc',
      label: '测试变量',
      defaultValue: 10,
      number: {
        max: 100,
        min: 1,
        step: 1,
        unit: '条',
        style: {
          width: 200,
        }
      }
    }
  ],
  mount(context) {
    const abc = context.getConfig('abc');
    console.log('init value.abc is', abc);
    console.log('dictionary', context.meta.dictionary);
    console.log('mounted...')
    return () => {
      console.log('unmounted ...')
    }
  }
})