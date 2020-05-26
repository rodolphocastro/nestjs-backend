import { Test, TestingModule } from '@nestjs/testing';
import { StateService } from './state.service';
import { ConteudoModel } from '../conteudo.model';

describe('StateService', () => {
  let service: StateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StateService],
    }).compile();

    service = module.get<StateService>(StateService);
    const conteudo = new ConteudoModel();
    conteudo.id = 1;
    conteudo.name = 'Meu Conteudo';
    service.insert(conteudo);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should allow CRUD operations', () => {
    expect(service).toHaveProperty<ConteudoModel[]>('list');
    expect(service).toHaveProperty<ConteudoModel>('get');
    expect(service).toHaveProperty<void>('insert');
    expect(service).toHaveProperty<void>('delete');
  });

  it('should list its elements', () => {
    let result: ConteudoModel[];
    expect(() => {
      result = service.list();
    }).not.toThrow();
    expect(result).toBeDefined();
  });

  it('should get an element by its id', () => {
    let result: ConteudoModel;
    expect(() => {
      result = service.get(1);
    }).not.toThrow();
    expect(result).toBeDefined();
  });

  it('should delete an element', () => {
    const subject = service.list()[0];
    expect(() => service.delete(subject)).not.toThrow();
    expect(service.list()).toHaveLength(0);
  });

  it('should flag an element as watched when found by its id', () => {
    let result: ConteudoModel;
    expect(() => {
      result = service.get(1);
    }).not.toThrow();
    expect(result).toHaveProperty<boolean>('watched', true);
  });
});
