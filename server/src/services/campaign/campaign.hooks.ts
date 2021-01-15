import * as authentication from '@feathersjs/authentication';
import { cleanCampaign } from '../../middleware/clean-campaign';
import { fixObjectId } from '../../middleware/convert-id';
import { attachCreatedAt, attachUpdatedAt } from '../../middleware/created-at';
import { disallow } from '../../middleware/disallow';
import { reformatCampaign } from '../../middleware/reformat-campaign';
import { attachOwner, validateOwner } from '../../middleware/owner';
import { stripUneditableProps } from '../../middleware/strip-uneditable-props';
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = authentication.hooks;

export default {
  before: {
    all: [ authenticate('jwt') ],
    find: [fixObjectId],
    get: [fixObjectId],
    create: [reformatCampaign, attachOwner, attachCreatedAt, attachUpdatedAt],
    update: [disallow],
    patch: [validateOwner, stripUneditableProps, cleanCampaign, attachUpdatedAt],
    remove: [validateOwner]
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
