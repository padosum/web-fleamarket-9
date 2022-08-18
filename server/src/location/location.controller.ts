import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { LocationService } from './location.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FindLocationResponse } from './dto/find-location-response.dto';
import {
  DeleteLocationResponseFailDto,
  DeleteLocationResponseSuccessDto,
} from './dto/delete-location-response.dto';
import { FindMyLocationResponse } from './dto/find-my-location-response.dto';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';

@Controller('location')
@ApiTags('Location API')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @ApiOperation({
    summary: 'location 추가 API',
    description: 'location을 추가한다.',
  })
  @UseGuards(AuthenticatedGuard)
  @Post()
  create(@Body() createLocationDto: CreateLocationDto) {
    return this.locationService.create(createLocationDto);
  }

  @ApiOperation({
    summary: 'location 조회 API',
    description: 'location을 조회한다.',
  })
  @ApiResponse({
    type: [FindLocationResponse],
    description: 'success',
    status: 200,
  })
  @Get()
  findAll(@Query('name') name: string): FindLocationResponse {
    return this.locationService.findAll(name);
  }

  @ApiOperation({
    summary: '현재 user의 location 조회 API',
    description: '현재 user의 location을 조회한다.',
  })
  @ApiResponse({
    type: FindMyLocationResponse,
    description: 'success',
    status: 200,
  })
  @Get('/me')
  find(): FindMyLocationResponse {
    return this.locationService.find();
  }

  @ApiOperation({
    summary: 'location 삭제 API',
    description: 'location을 삭제한다.',
  })
  @ApiResponse({
    type: DeleteLocationResponseSuccessDto,
    description: 'success',
    status: 200,
  })
  @ApiResponse({
    type: DeleteLocationResponseFailDto,
    description: 'fail',
    status: 400,
  })
  @Delete(':id')
  remove(
    @Param('id') id: string,
  ): DeleteLocationResponseSuccessDto | DeleteLocationResponseFailDto {
    return this.locationService.remove(+id);
  }
}
