import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Article, ArticleDocument } from './schemas/article.schema';
import { CreateArticleDto } from './dto/create-article.dto';
import { AddCommentDto } from './dto/add-comment.dto';

@Injectable()
export class ArticlesService {
  constructor(@InjectModel(Article.name) private articleModel: Model<ArticleDocument>) {}

  async create(createArticleDto: CreateArticleDto): Promise<Article> {
    const createdArticle = new this.articleModel(createArticleDto);
    return createdArticle.save();
  }

  async findAll(query: { search?: string; page?: number; limit?: number }): Promise<Article[]> {
    const { search = '', page = 1, limit = 10 } = query;
    const skip = (page - 1) * limit;
  
    const filter = search
      ? { title: { $regex: search, $options: 'i' } }  
      : {};
  
    return this.articleModel
      .find(filter)
      .skip(skip)
      .limit(limit)
      .exec();
  }
  
  
  async updateStatus(id: string, status: string): Promise<Article> {
    const updated = await this.articleModel.findByIdAndUpdate(id, { status }, { new: true }).exec();
    if (!updated) {
      throw new NotFoundException(`Article with id ${id} not found`);
    }
    return updated;
  }

  async findOne(id: string): Promise<Article> {
    const article = await this.articleModel.findById(id).exec();
    if (!article) {
      throw new NotFoundException(`Article with id ${id} not found`);
    }
    return article;
  }
  async addComment(id: string, dto: AddCommentDto): Promise<Article> {
    const article = await this.articleModel.findById(id);
    if (!article) throw new NotFoundException('Article not found');
  
    article.comments.push({ ...dto, createdAt: new Date() });
    return article.save();
  }
  async updateArticle(id: string, updateDto: Partial<Article>): Promise<Article> {
    const updated = await this.articleModel.findByIdAndUpdate(id, updateDto, { new: true }).exec();
    if (!updated) throw new NotFoundException(`Article ${id} not found`);
    return updated;
  }
  
  
  
}
