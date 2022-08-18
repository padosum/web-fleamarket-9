import { Inject, Injectable } from '@nestjs/common';
import { Connection } from 'mysql2';
import { MYSQL_CONNECTION } from 'src/constants';
import { CategoryResponseDto } from './dto/category-response.dto';

@Injectable()
export class CategoryService {
  constructor(@Inject(MYSQL_CONNECTION) private conn: Connection) {}
  async findAll(): Promise<CategoryResponseDto> {
    const [result]: any = await this.conn.query(
      `SELECT idx, name FROM CATEGORY`,
    );

    return result;
  }
}
