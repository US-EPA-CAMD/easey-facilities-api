import { LinkDTO } from './link.dto';

export class FacilityDTO {
  facId: number;
  orisCode: number;
  name: string;
  state: string;
  region: number;
  links: LinkDTO[];
}
