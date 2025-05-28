import { Controller, Get, Post, Body, Patch, Param, UsePipes, ValidationPipe } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { Query } from '@nestjs/common';
import { AddCommentDto } from './dto/add-comment.dto';
import { Article } from './schemas/article.schema';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  create(@Body() createArticleDto: CreateArticleDto) {
    return this.articlesService.create(createArticleDto);
  }

  @Get()
  findAll(
    @Query('search') search?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    return this.articlesService.findAll({
      search,
      page: parseInt(page || '1'),
      limit: parseInt(limit || '10'),
    });
  }

  @Get(':id')
findOne(@Param('id') id: string) {
  return this.articlesService.findOne(id);
}
@Patch(':id')
updateArticle(@Param('id') id: string, @Body() dto: Partial<Article>) {
  return this.articlesService.updateArticle(id, dto);
}

@Post(':id/comments')
addComment(@Param('id') id: string, @Body() dto: AddCommentDto) {
  return this.articlesService.addComment(id, dto);
}
  @Patch(':id/review')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  updateStatus(@Param('id') id: string, @Body() updateStatusDto: UpdateStatusDto) {
    return this.articlesService.updateStatus(id, updateStatusDto.status);
  }
}
