import { ConteudoModel } from './conteudo.model';
import { Chance } from "chance";

const seeder = Chance();

function buildCounteudo(seeder: Chance.Chance): ConteudoModel {
  const newModel = new ConteudoModel();
  newModel.id = seeder.integer({ min: 0 });
  newModel.name = seeder.word();
  newModel.duration = seeder.integer({ min: 0 });
  newModel.provider = seeder.word();
  newModel.mediaType = seeder.word();
  newModel.providerId = seeder.word();
  newModel.expiresAt = seeder.date();
  newModel.watched = seeder.bool();
  return newModel;
}

describe('ConteudoModel', () => {
  const subject = buildCounteudo(seeder);

  it('should be defined', () => {
    expect(subject).toBeDefined();
  });

  it('should have an id, name, duration, provider, media type, provider id, expiration date and watched', () => {
    expect(subject).toHaveProperty<number>('id');
    expect(subject).toHaveProperty<string>('name');
    expect(subject).toHaveProperty<number>('duration');
    expect(subject).toHaveProperty<string>('provider');
    expect(subject).toHaveProperty<string>('mediaType');
    expect(subject).toHaveProperty<string>('providerId');
    expect(subject).toHaveProperty<Date>('expiresAt');
    expect(subject).toHaveProperty<boolean>('watched');
  });

  it('expired should be true when expiresAt is in the past', () => {
    subject.expiresAt = new Date();
    subject.expiresAt.setDate(-30);
    expect(subject).toHaveProperty<boolean>('expired', true);
  });

  it('expired should be true when expiresAt is in the past', () => {
    subject.expiresAt = new Date();
    subject.expiresAt.setDate(30);
    expect(subject).toHaveProperty<boolean>('expired', false);
  });
});
