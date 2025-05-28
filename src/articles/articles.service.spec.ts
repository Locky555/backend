import { Test, TestingModule } from '@nestjs/testing';
import { ArticlesService } from './articles.service';
import { getModelToken } from '@nestjs/mongoose';
import { Article } from './schemas/article.schema';

const mockArticleModel = {
  find: jest.fn(),
  findById: jest.fn(),
  findByIdAndUpdate: jest.fn(),
  save: jest.fn(),
  create: jest.fn(),
  exec: jest.fn(),
};

describe('ArticlesService', () => {
  let service: ArticlesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ArticlesService,
        {
          provide: getModelToken(Article.name),
          useValue: mockArticleModel,
        },
      ],
    }).compile();

    
    service = module.get<ArticlesService>(ArticlesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
