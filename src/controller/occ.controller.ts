import { Body, Controller, Logger, Post, Response } from '@nestjs/common';
import { OccService } from 'src/service/occ.service';

@Controller('occ')
export class OccControler {
  private readonly logger: Logger = new Logger(OccControler.name);

  constructor(private readonly occService: OccService) {}

  @Post('updateEmail')
  async updateEmail(@Body() email: Array<any>, @Response() response) {
    const profileUpdated = [];
    const profileNotUpdated = [];

    for (let i = 0; i < email.length; i++) {
      try {
        const { currentEmail, changeTo } = email[i];
        const current = await this.occService.getProfile(currentEmail);
        const change = await this.occService.getProfile(changeTo);

        if (current && !change) {
          const updated = await this.occService.updateProfile(
            current.id,
            changeTo,
          );

          const profileUpdatedObj = {
            id: updated.id,
            email: currentEmail,
            changeTo: updated.email,
          };

          profileUpdated.push(profileUpdatedObj);
          this.logger.log(
            `Profile ${updated.id} updated - ${JSON.stringify(updated.email)}`,
          );
        } else if (current && change) {
          const message = `It is not possible to update the ${currentEmail} email profile because a profile using the ${changeTo} email already exists`;
          const profileNotUpdatedObj = {
            email: currentEmail,
            changeTo,
            message,
          };
          profileNotUpdated.push(profileNotUpdatedObj);
          this.logger.error(message);
        } else if (!current && change) {
          const message = `There is no email ${currentEmail} profile, only email ${changeTo}`;
          const profileNotUpdatedObj = {
            email: currentEmail,
            changeTo,
            message,
          };
          profileNotUpdated.push(profileNotUpdatedObj);
          this.logger.error(message);
        } else {
          const message = `There are none registered at the OCC with e-mails ${currentEmail} and ${changeTo}`;
          const profileNotUpdatedObj = {
            email: currentEmail,
            changeTo,
            message,
          };
          profileNotUpdated.push(profileNotUpdatedObj);
          this.logger.error(message);
        }
      } catch (error) {
        this.logger.error(error.message);
        return response.status(500).json({ message: error.message });
      }
    }

    return response.status(200).json({ profileUpdated, profileNotUpdated });
  }
}
