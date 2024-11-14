import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ArticleService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.article.findMany();
  }

  findOne(id: string) {
    return this.prisma.article.findUnique({ where: { id } });
  }

  search(query: string) {
    return `This action returns articles with a query: ${query}`;
  }

  create(createArticleDto: any) {
    return this.prisma.article.create({
      data: createArticleDto,
    });
  }
}
