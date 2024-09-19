import { Routes } from 'nest-router';

import { FacilitiesWorkspaceModule } from './facilities-workspace/facilities.module';
import { FacilitiesModule } from './facilities/facilities.module';
import { UnitWorkspaceModule } from './unit-workspace/unit.module';
import { StackPipeWorkspaceModule } from './stack-pipe-workspace/stack-pipe.module';
import { UnitStackConfigurationWorkspaceModule } from './unit-stack-configuration-workspace/unit-stack-configuration.module';

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
        path: '/:orisCode/units',
        module: UnitWorkspaceModule,
      },
      {
        path: '/:orisCode/stack-pipes',
        module: StackPipeWorkspaceModule,
      },
      {
        path: '/:orisCode/unit-stack-configurations',
        module: UnitStackConfigurationWorkspaceModule,
      },
    ],
  },
];

export default routes;
