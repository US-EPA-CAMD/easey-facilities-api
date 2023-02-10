import { Routes } from 'nest-router';
import { FacilitiesWorkspaceModule } from './facilities-workspace/facilities.module';

import { FacilitiesModule } from './facilities/facilities.module';

const routes: Routes = [
  {
    path: '/facilities',
    module: FacilitiesModule,
  },
  {
    path: '/workspace/facilities',
    module: FacilitiesWorkspaceModule,
  },
];

export default routes;
