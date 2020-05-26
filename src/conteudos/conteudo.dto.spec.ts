import { ConteudoCreateDto, ConteudoUpdateDto, ConteudoFactory } from './conteudo.dto';
import { Chance } from "chance";
import { ConteudoModel } from './conteudo.model';

const seeder = Chance();

describe('ConteudoCreateDto', () => {
  it('should be defined', () => {
    expect(new ConteudoCreateDto()).toBeDefined();
  });
});

describe('ConteudoUpdateDto', () => {
  it('should be defined', () => {
    expect(new ConteudoUpdateDto()).toBeDefined();
  });
});

describe('ConteudoFactory', () => {
  it('should create a model from a create dto', () => {
    const subject = new ConteudoCreateDto();
    subject.id = seeder.integer();
    subject.name = seeder.name();
    let result: ConteudoModel;
    expect(() => {
      result = ConteudoFactory.buildModelFromCreate(subject);
    }).not.toThrow();
    expect(result).toBeDefined();
    expect(result.id).toBe(subject.id);
  });

  it('should apply updates to a model from a update dto', () => {
    const subject = new ConteudoUpdateDto();
    subject.name = seeder.name();
    const result = new ConteudoModel();
    result.id = seeder.integer();
    expect(() =>
      ConteudoFactory.applyUpdateToModel(result, subject))
      .not.toThrow();
    expect(result.name).toBe(subject.name);
  });
});