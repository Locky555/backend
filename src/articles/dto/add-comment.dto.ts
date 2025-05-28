import { IsString } from 'class-validator';

export class AddCommentDto {
  @IsString()
  author: string;
  @IsString()
  content: string;
}
