
import { HookContext } from '@feathersjs/feathers';
import { NotAcceptable } from '@feathersjs/errors';
import { cloneDeep } from 'lodash';

import { ICharacter, IContent, Stat } from '../interfaces';
import { content } from '../interfaces';
const allContent: IContent = cloneDeep(content);

export async function reformatCharacter(context: HookContext): Promise<HookContext> {

  const archetypeName = context.data?.archetype?.archetype;
  const archetypeData = allContent.vagabonds[archetypeName];
  if(!archetypeData) {
    throw new NotAcceptable(`Archetype ${archetypeName} does not exist.`);
  }

  const newChar: ICharacter = {
    name: context.data.character.name,
    campaign: context.data.campaignId,
    archetype: context.data.archetype.archetype,
    species: context.data.character.species,
    adjectives: context.data.character.adjectives,
    demeanor: context.data.character.demeanor,
    pronouns: context.data.character.pronouns,
    background: [],
    drives: context.data.drives.drives,
    nature: context.data.natures.nature,
    connections: [],
    stats: {
      [Stat.Charm]: archetypeData.stats[Stat.Charm],
      [Stat.Cunning]: archetypeData.stats[Stat.Cunning],
      [Stat.Finesse]: archetypeData.stats[Stat.Finesse],
      [Stat.Luck]: archetypeData.stats[Stat.Luck],
      [Stat.Might]: archetypeData.stats[Stat.Might]
    },
    feats: context.data.feats.feats,
    skills: context.data.skills.skills,
    moves: context.data.moves.moves,
    items: [],
    reputation: {}
  };

  newChar.stats[context.data.bonus.stat as Stat] += 1;

  allContent.core.factions.forEach(fact => {
    newChar.reputation[fact.name] = { notoriety: 0, prestige: 0 };
  });

  archetypeData.background.forEach((bg, i) => {
    const answer = context.data.background.backgrounds[i];

    if(bg.type === 'answers') {
      newChar.background[i] = {
        question: bg.question,
        answer: answer.realText || answer.text
      };
    }

    if(bg.type === 'faction') {
      newChar.background[i] = {
        question: bg.question,
        answer
      };

      const repChange = bg.reputation?.delta ?? 0;
      if(repChange < 0) {
        newChar.reputation[answer].notoriety += repChange;
      } else {
        newChar.reputation[answer].prestige += repChange;
      }
    }
  });

  context.data = newChar;

  return context;
}
