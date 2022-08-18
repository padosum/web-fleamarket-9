import { Inject, Injectable } from '@nestjs/common';
import { MYSQL_CONNECTION } from 'src/constants';
import {
  CreateUserResponseFailDto,
  CreateUserResponseSuccessDto,
} from './dto/create-user-response.dto';
import { CreateUserDto } from './dto/create-user.dto';
import {
  GetUserResponseFailDto,
  GetUserResponseSuccessDto,
} from './dto/get-user-response.dto';
import Imysql from 'mysql2/typings/mysql/lib/protocol/packets';

import { hash } from 'bcrypt';
import { Connection } from 'mysql2/promise';

@Injectable()
export class UsersService {
  constructor(@Inject(MYSQL_CONNECTION) private conn: Connection) {}

  async create(
    createUserDto: CreateUserDto,
  ): Promise<CreateUserResponseSuccessDto | CreateUserResponseFailDto> {
    const { id, password, name } = createUserDto;

    try {
      if (!id) throw '아이디를 입력해주세요';
      if (!password) throw '패스워드를 입력해주세요';
      if (!name) throw '이름을 입력해주세요';

      const existingId = await this.getUserInfoById(id);

      if (existingId.id) throw '이미 존재하는 아이디입니다.';

      const saltOrRound = 10;
      const hashedPassword = await hash(password, saltOrRound);

      const [insertRes] = await this.conn.query(
        `INSERT INTO USER (id, password, name) VALUES ('${id}', '${hashedPassword}', '${name}')`,
      );

      return {
        name,
        message: null,
      };
    } catch (err) {
      return {
        name: null,
        message: err,
      };
    }
  }
  async getUserInfoByIdx(
    idx: number,
  ): Promise<GetUserResponseSuccessDto | GetUserResponseFailDto> {
    const [user]: [Imysql.ResultSetHeader, Imysql.FieldPacket[]] =
      await this.conn.query(
        `SELECT id, password, name FROM USER WHERE idx = ${idx}`,
      );

    return user[0]
      ? {
          id: user[0].id,
          name: user[0].name,
        }
      : {
          message: '존재하지 않는 사용자입니다.',
        };
  }

  async getUserInfoById(id: string) {
    const [user]: [Imysql.ResultSetHeader, Imysql.FieldPacket[]] =
      await this.conn.query(
        `SELECT id, password, name FROM USER WHERE id = '${id}'`,
      );

    return user[0]
      ? {
          id: user[0].id,
          name: user[0].name,
          password: user[0].password,
        }
      : {};
  }
}
