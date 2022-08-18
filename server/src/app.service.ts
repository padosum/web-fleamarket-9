import { Inject, Injectable } from '@nestjs/common';
import { MYSQL_CONNECTION } from 'src/constants';

@Injectable()
export class AppService {
  constructor(@Inject(MYSQL_CONNECTION) private conn: any) {}
  async getHello(): Promise<string> {
    const [location] = await this.conn.query(`SELECT * FROM LOCATION`);
    console.log(location);
    return 'Hello World! Fleamarket';
  }
}
