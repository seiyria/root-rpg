// Initializes the `Campaign` service on path `/campaign`
import { ServiceAddons } from '@feathersjs/feathers';

import { Application } from '../../declarations';
import { Campaign } from './campaign.class';
import hooks from './campaign.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'campaign': Campaign & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/campaign', new Campaign(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('campaign');

  service.hooks(hooks);
}
