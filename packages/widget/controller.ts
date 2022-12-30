import { Controller } from './utils';
import { Component, Water, Request } from '@pjblog/http';

@Controller('GET', '/ping')
export class TestController extends Component<number> {
  constructor(req: Request) {
    super(req, Date.now());
  }

  @Water(1)
  public zzz() {
    console.log('done');
  }
}