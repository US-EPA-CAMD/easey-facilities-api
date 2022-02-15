import { Routes } from "nest-router";

import { FacilitiesModule } from "./facilities/facilities.module";

const routes: Routes = [
  {
    path: '/facilities',
    module: FacilitiesModule,
  },
];

export default routes;
