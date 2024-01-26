import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { envVariables } from 'src/config/config';

@Injectable()
export class OccService {
  private url: string;
  private appKey: string;
  constructor(private readonly httpService: HttpService) {
    (this.url = envVariables.url), (this.appKey = envVariables.appKey);
  }
  async getLoginToken(url: string, appKey: string) {
    const response = await lastValueFrom(
      this.httpService.post(
        `https://${url}/ccadmin/v1/login`,
        'grant_type=client_credentials',
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Bearer ${appKey}`,
          },
        },
      ),
    );

    if (response.status === 200) {
      return response.data.access_token;
    }
  }
  async getProfile(email: string) {
    const response = await lastValueFrom(
      this.httpService.get(
        `https://${this.url}/ccadmin/v1/profiles?fields=id,firstName,lastName,email&q=email eq "${email}" or login eq "${email}"&queryFormat=SCIM`,
        {
          headers: {
            Authorization: `Bearer ${await this.getLoginToken(
              this.url,
              this.appKey,
            )}`,
          },
        },
      ),
    );

    return response.data.items[0];
  }

  async updateProfile(id: string, email: string) {
    const data = {
      login: email,
      email,
    };

    const response = await lastValueFrom(
      this.httpService.put(
        `https://${this.url}/ccadmin/v1/profiles/${id}?fields=id,email,login,firstName,lastName`,
        data,
        {
          headers: {
            Authorization: `Bearer ${await this.getLoginToken(
              this.url,
              this.appKey,
            )}`,
          },
        },
      ),
    );

    return response.data;
  }
}
