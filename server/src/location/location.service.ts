import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Scope,
} from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import {
  DeleteLocationResponseFailDto,
  DeleteLocationResponseSuccessDto,
} from './dto/delete-location-response.dto';
import { FindLocationResponse } from './dto/find-location-response.dto';
import { FindMyLocationResponse } from './dto/find-my-location-response.dto';
import Imysql from 'mysql2/typings/mysql/lib/protocol/packets';
import { MYSQL_CONNECTION } from 'src/constants';
import { Connection } from 'mysql2/promise';
import { REQUEST } from '@nestjs/core';

@Injectable({ scope: Scope.REQUEST })
export class LocationService {
  constructor(
    @Inject(MYSQL_CONNECTION) private conn: Connection,
    @Inject(REQUEST) private readonly request,
  ) {}

  async create(createLocationDto: CreateLocationDto) {
    const { locationId } = createLocationDto;
    const {
      user: { idx: userIdx },
    } = this.request;

    try {
      if (!locationId) throw '장소 id를 입력해주세요';
      const [res]: [Imysql.ResultSetHeader, Imysql.FieldPacket[]] =
        await this.conn.query(
          `INSERT INTO USER_LOCATION (userId, locationId) VALUES (${userIdx}, ${locationId})`,
        );
      this.conn.commit();
      return {
        idx: res.insertId,
      };
    } catch (err) {
      this.conn.rollback();
      return {
        idx: null,
      };
    }
  }

  async findAll(name): Promise<FindLocationResponse[]> {
    const [res]: [Imysql.ResultSetHeader, Imysql.FieldPacket[]] = await this
      .conn.query(`SELECT idx
                        , name
                        , code
                     FROM LOCATION
                    WHERE name like '%${name}%';`);

    let location: FindLocationResponse[] = [].slice.call(res, 0);

    return location;
  }

  find(): FindMyLocationResponse {
    return;
  }

  async remove(
    id: number,
  ): Promise<DeleteLocationResponseSuccessDto | DeleteLocationResponseFailDto> {
    const {
      user: { idx: userIdx },
    } = this.request;

    try {
      const [res]: [Imysql.ResultSetHeader, Imysql.FieldPacket[]] =
        await this.conn.query(
          `DELETE FROM USER_LOCATION WHERE userId=${userIdx} AND locationId=${id}`,
        );
      console.log(res);
      this.conn.commit();
      return {
        count: res.affectedRows,
      };
    } catch (err) {
      this.conn.rollback();
      throw new HttpException(
        '동네 삭제 중 에러가 발생했습니다.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
