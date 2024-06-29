import { Routes } from 'nest-router';

import { FacilitiesWorkspaceModule } from './facilities-workspace/facilities.module';
import { FacilitiesModule } from './facilities/facilities.module';
import { UnitWorkspaceModule } from './unit-workspace/unit.module';

const routes: Routes = [
  {
    path: '/facilities',
    module: FacilitiesModule,
  },
  {
    path: '/workspace/facilities',
    module: FacilitiesWorkspaceModule,
    children: [
      {
        path: '/:facId/units',
        module: UnitWorkspaceModule,
      },
    ],
  },
];

export default routes;
