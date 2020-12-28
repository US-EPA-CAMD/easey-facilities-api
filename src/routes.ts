import { Routes } from "nest-router";

import { FacilitiesModule } from "./facilities/facilities.module";
import { UnitsModule } from "./units/units.module";

const routes: Routes = [
  {
    path: '/facilities',
    module: FacilitiesModule,
    children: [
      {
        path: ':id/units',
        module: UnitsModule,
      },
      // {
      //   path: '/:id/stack-pipes',
      //   module: StackPipesModule,
      // },
      // {
      //   path: '/:id/contacts',
      //   module: ContactsModule,
      // },
    ],
  },
];

export default routes;