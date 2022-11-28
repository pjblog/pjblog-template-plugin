import { TConfigs } from './types';
import { 
  createPluginRouter, 
  TPackageJson, 
  container, 
  ModularContext 
} from '@pjblog/core';

export const PKG = require('../../package.json') as TPackageJson;
export const BlogPluginRouter = createPluginRouter(PKG.name);

export function getBlogPluginConfigs() {
  const context = container.get(PKG.name) as ModularContext<TConfigs>
  if (!context) return {} as TConfigs;
  return context.configs_value;
}

export function numberable(defaultValue: number = 0) {
  return (v: any) => {
    if (!v) return defaultValue;
    return Number(v);
  }
}