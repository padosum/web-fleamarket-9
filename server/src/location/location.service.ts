import { Injectable } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import {
  DeleteLocationResponseFailDto,
  DeleteLocationResponseSuccessDto,
} from './dto/delete-location-response.dto';
import { FindLocationResponse } from './dto/find-location-response.dto';
import { FindMyLocationResponse } from './dto/find-my-location-response.dto';

@Injectable()
export class LocationService {
  create(createLocationDto: CreateLocationDto) {
    return 'This action adds a new location';
  }

  findAll(name): FindLocationResponse {
    return;
  }

  find(): FindMyLocationResponse {
    return;
  }

  remove(
    id: number,
  ): DeleteLocationResponseSuccessDto | DeleteLocationResponseFailDto {
    return;
  }
}
