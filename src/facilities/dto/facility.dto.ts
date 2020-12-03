import { LinkDTO } from './link.dto';
export class FacilityDTO {
  constructor(
    facId: number,
    orisCode: number,
    facilityName: string,
    state: string,
    links: Array<LinkDTO>,
  ) {
    this.facId = facId;
    this.orisCode = orisCode;
    this.name = facilityName;
    this.state = state;
    this.links = links;
  }
  facId: number;
  orisCode: number;
  name: string;
  state: string;
  links: Array<LinkDTO>;
  //description: string;
  //county: string;
  //sicCode: number;
  //epaRegion: number;
  //nercRegion: string;
  //airsId: string ;
  //findSid: string;
  //stateId: string;
  //latitude: number;
  //longitude: number;
  //frsId: string;
  //payeeId: number;
  //permitExpDate: Date;
  //latlonSource: string;
  //tribalLandCd: string;
  //payefirstEcmpsRptPeriodId: number;
}
