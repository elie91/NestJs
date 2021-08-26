import { HttpService, Injectable } from '@nestjs/common';
import { IUpdateActivity } from './pipedrive.interface';

@Injectable()
export class PipedriveService {
  constructor(private httpService: HttpService) {}

  /** You can this API Key to play with Pipedrive's API */
  private readonly apiKey = '0247338e7729ebe37a5bc7af67a3fb5c21419a30';

  /**
   * This is the base url for Pipedrive API
   * Full documentation: https://developers.pipedrive.com/docs/api/v1
   */
  private readonly baseUrl = 'https://api.pipedrive.com/v1/';

  /**
   * Get Pipedrive Activity
   */
  async getActivity(activityId: number) {
    return this.httpService
      .get(`${this.baseUrl}activities/${activityId}?api_token=${this.apiKey}`)
      .toPromise()
      .then((response) => response.data.data);
  }

  /**
   * Update Pipedrive Activity
   */
  async updateActivity(activityId: number, body: IUpdateActivity) {
    return this.httpService
      .put(
        `${this.baseUrl}activities/${activityId}?api_token=${this.apiKey}`,
        body,
      )
      .toPromise()
      .then((response) => response.data.data);
  }
}
