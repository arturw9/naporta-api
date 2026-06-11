import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsOptional, IsString } from 'class-validator'

export class FindOrdersQueryDto {
  @ApiPropertyOptional({ example: 'PED-001' })
  @IsOptional()
  @IsString()
  number?: string

  @ApiPropertyOptional({ example: 'PENDING' })
  @IsOptional()
  @IsString()
  status?: string

  @ApiPropertyOptional({ example: '2026-06-01' })
  @IsOptional()
  @IsString()
  startDate?: string

  @ApiPropertyOptional({ example: '2026-06-30' })
  @IsOptional()
  @IsString()
  endDate?: string
}
