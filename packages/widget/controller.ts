import { Controller } from './utils';
import { Component, Water } from '@pjblog/http';
import type TEST from './index';

type IResponse = number;

@Controller('GET', '/ping')
export class TestController extends Component<TEST, IResponse> {
  public response(): IResponse {
    return Date.now();
  }

  @Water()
  public zzz() {
    return (context: IResponse) => {
      console.log(context)
      console.log('done')
    }
  }
}