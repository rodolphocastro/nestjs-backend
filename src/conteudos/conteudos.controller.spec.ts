import { Test, TestingModule } from '@nestjs/testing';
import { ConteudosController } from './conteudos.controller';
import { StateService, ConteudoState } from './state/state.service';
import { ConteudoModel } from './conteudo.model';
import { ConteudosModule } from './conteudos.module';
import { ConteudoCreateDto, ConteudoUpdateDto } from './conteudo.dto';

// TODO: Implementar testes para cada rota.

describe('Conteudos Controller', () => {
  let controller: ConteudosController;

  const state: ConteudoState = {
    insert: jest.fn(),
    delete: jest.fn(),
    get: (id: number): ConteudoModel => {
      const result = new ConteudoModel();
      result.id = id;
      return result;
    },
    list: (): ConteudoModel[] => {
      const result = new ConteudoModel();
      result.id = 1;
      return [
        result
      ];
    }
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConteudosModule]
    })
      .overrideProvider(StateService).useValue(state)
      .compile();

    controller = module.get<ConteudosController>(ConteudosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should respond GET / with a list of elements', () => {
    const result = controller.listConteudo();
    expect(result).toBeDefined();
    expect(result).toHaveLength(1);
  });

  it('should respond GET /:id with an element, if found', () => {
    const result = controller.getConteudo(1);
    expect(result).toBeDefined();
  });

  it('should respond GET /:id with 404 Not Found, if not found', () => {
    jest.spyOn(state, 'get').mockImplementationOnce(() => { throw "Not Found" });
    let result: ConteudoModel;
    expect(() => result = controller.getConteudo(-1)).toThrow();
    expect(result).not.toBeDefined();
  });

  it('should allow POST / with a new element', () => {
    const input = new ConteudoCreateDto();
    input.id = 2;
    input.name = 'My Content';
    let result: ConteudoModel;
    expect(() => result = controller.createConteudo(input)).not.toThrow();
    expect(result).toBeDefined();
  });

  it('should respond POST / with a BadRequest when an element with the same ID exists', () => {
    jest.spyOn(state, 'insert').mockImplementationOnce(() => { throw "Exists" });
    let result: ConteudoModel;
    expect(() => result = controller.createConteudo(new ConteudoCreateDto())).toThrow();
    expect(result).not.toBeDefined();
  });

  it('should allow PUT /:id with an element', () => {
    let result: ConteudoModel;
    expect(() => result = controller.updateConteudo(1, new ConteudoUpdateDto()))
      .not.toThrow();
    expect(result).toBeDefined();
  });

  it('should allow DELETE /:id with a valid id', () => {
    expect(() => controller.deleteConteudo(1)).not.toThrow();
  })
});
