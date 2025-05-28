import { IsString, IsOptional } from 'class-validator';

export class CreateArticleDto {
  @IsString()
  title: string;
  @IsString()
  @IsOptional()
  authors?: string;

  @IsString()
  @IsOptional()
  abstract?: string;
}
