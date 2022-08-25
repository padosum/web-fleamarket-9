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
      return {
        idx: res.insertId,
      };
    } catch (err) {
      return {
        idx: null,
      };
    }
  }

  async findAll(name = '') {
    const {
      user: { idx: userIdx },
    } = this.request;

    const sql = `
    SELECT * FROM (SELECT idx
                        , name
                        , code
                     FROM LOCATION
                    WHERE name like '%${name}%'
                      AND LENGTH(name) - LENGTH(REPLACE(name, ' ', '')) > 1
                      AND LOCATION.idx NOT IN (SELECT USER_LOCATION.locationId 
                                                 FROM USER_LOCATION 
							                                   WHERE USER_LOCATION.userId = ${userIdx})
                                                 LIMIT 20) location; 
    `;

    const [res]: [Imysql.ResultSetHeader, Imysql.FieldPacket[]] =
      await this.conn.query(sql);

    return res;
  }

  async find(): Promise<FindMyLocationResponse[]> {
    const {
      user: { idx: userIdx },
    } = this.request;

    const [res] = await this.conn.query(`SELECT lo.idx
                                              , lo.name
                                           FROM USER_LOCATION ul
                                          INNER JOIN LOCATION lo
                                             ON ul.locationId = lo.idx
                                          INNER JOIN USER u
                                             ON ul.userId = u.idx
                                          WHERE ul.userId = ${userIdx};`);

    let location: FindMyLocationResponse[] = [].slice.call(res, 0);

    return location;
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
      return {
        count: res.affectedRows,
      };
    } catch (err) {
      throw new HttpException(
        '동네 삭제 중 에러가 발생했습니다.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
