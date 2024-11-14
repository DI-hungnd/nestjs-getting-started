import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  MaxLength,
  MinLength,
  IsOptional,
} from 'class-validator';

export class createArticleDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  @MinLength(3)
  readonly title: string;

  @IsString()
  @IsOptional()
  @MaxLength(500)
  @ApiProperty({ required: false })
  readonly description?: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly body: string;

  @IsString()
  @ApiProperty()
  readonly author_id: string;
}
