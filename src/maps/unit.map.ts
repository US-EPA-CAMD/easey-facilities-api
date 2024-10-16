import { Injectable } from '@nestjs/common';
import { BaseMap } from '@us-epa-camd/easey-common/maps';

import { UnitDTO } from '../dtos/unit.dto';
import { Unit } from '../entities/unit.entity';
import { Unit as UnitWorkspace } from '../entities/workspace/unit.entity';

@Injectable()
export class UnitMap extends BaseMap<Unit | UnitWorkspace, UnitDTO> {
  private getBeginDate(entity: Unit | UnitWorkspace): Date {
    const methods = entity.location?.methods;
    if (!methods) return null;

    const beginDateEpoch = Math.min(
      ...methods.map(m => new Date(m.beginDate).getTime()),
    );
    return Number.isFinite(beginDateEpoch) ? new Date(beginDateEpoch) : null;
  }

  private getEndDate(entity: Unit | UnitWorkspace): Date {
    const opStatuses = entity.opStatuses;
    if (!opStatuses) return null;

    const unitRetireDateEpoch = Math.min(
      ...entity.opStatuses
        .filter(s => s.opStatusCode === 'RET')
        .map(s => new Date(s.beginDate).getTime()),
    );
    return Number.isFinite(unitRetireDateEpoch)
      ? new Date(unitRetireDateEpoch - 24 * 60 * 60 * 1000) // Retire date in epoch milliseconds minus 1 day.
      : null;
  }

  private getOpStatusCode(entity: Unit | UnitWorkspace): string {
    const opStatuses = entity.opStatuses;
    if (!opStatuses) return null;

    const activeOpStatus = opStatuses.reduce((acc, cur) => {
      if (!acc) return cur;
      if (new Date(cur.beginDate).getTime() > new Date(acc.beginDate).getTime()) {
        return cur;
      }
    }, null);

    return activeOpStatus?.opStatusCode ?? null;
  }

  public async one(entity: Unit | UnitWorkspace): Promise<UnitDTO> {
    return {
      id: entity.id,
      unitId: entity.name,
      facilityId: entity.facId,
      beginDate: this.getBeginDate(entity),
      endDate: this.getEndDate(entity),
      nonLoadBasedIndicator: entity.nonLoadBasedIndicator,
      opStatusCd: this.getOpStatusCode(entity),
      associatedMonitorPlanIds:
        entity.location?.plans?.map(plan => plan.id) ?? [],
    };
  }
}
