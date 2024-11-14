import { Body, Controller, Get, Post } from '@nestjs/common';
import { ArticleService } from './article.service';
import { createArticleDto } from './dto/create-article.dto';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get()
  findAll() {
    return this.articleService.findAll();
  }

  @Get(':id')
  findOne(id: string) {
    return this.articleService.findOne(id);
  }

  @Get('search/:query')
  search(query: string) {
    return this.articleService.search(query);
  }

  @Post()
  create(@Body() createArticleDto: createArticleDto) {
    return this.articleService.create(createArticleDto);
  }
}
