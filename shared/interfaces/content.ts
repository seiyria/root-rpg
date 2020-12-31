import { Stat } from './character';

export interface IContentConnection {
  text: string;
}

export interface IContentDrive {
  text: string;
}

export interface IContentFaction {
  name: string;
}

export interface IContentFeat {
  text: string;
}

export interface IContentMove {
  archetype: string;
  text: string;
}

export interface IContentNature {
  text: string;
}

export interface IContentSkill {
  text: string;
}

export interface IContentCore {
  connections: Record<string, IContentConnection>;
  drives: Record<string, IContentDrive>;
  factions: IContentFaction[];
  feats: Record<string, IContentFeat>;
  moves: Record<string, IContentMove>;
  names: string[];
  natures: Record<string, IContentNature>;
  pronouns: string[];
  skills: Record<string, IContentSkill>;
  species: string[];
}

export interface IContentBackgroundReputationChange {
  prestige?: number;
  notoriety?: number;
}

export interface IContentBackgroundAnswer {
  text: string;
  type?: string;
  input?: string;
}

export interface IContentBackgroundQuestion {
  question: string;
  type: string;
  answers?: IContentBackgroundAnswer[];
  reputation?: IContentBackgroundReputationChange;
}

export interface IContentVagabondDrive {
  name: string;
}

export interface IContentVagabondNature {
  name: string;
}

export interface IContentVagabondConnection {
  name: string;
  text: string;
}

export interface IContentVagabondFeat {
  name: string;
}

export interface IContentVagabondSkill {
  name: string;
}

export interface IContentVagabondMove {
  name: string;
}

export interface IContentVagabond {
  archetype: string;
  description: string;
  species: string[];
  adjectives: string[];
  items: string[];
  demeanor: string[];
  background: IContentBackgroundQuestion[];
  drives: IContentVagabondDrive[];
  natures: IContentVagabondNature[];
  connections: IContentVagabondConnection[];
  stats: Record<Stat, number>;
  feats: IContentVagabondFeat[];
  numSkills: number;
  skills: IContentVagabondSkill[];
  defaultMove: string;
  moves: IContentVagabondMove[];
}

export interface IContent {
  core: IContentCore;
  vagabonds: Record<string, IContentVagabond>;
}