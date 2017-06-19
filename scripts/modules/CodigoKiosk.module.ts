import { CodigoViewer } from './CodigoViewer.module';
import { ConfigService } from '../services/Config.service';
import { FileManipulator } from './FileManipulator.module';
/**
*Inherits from CodigoViewer.  Contains methods used for playing Kiosk Projects.
*
*/
export class CodigoKiosk extends CodigoViewer {
    private configService = new ConfigService();
    constructor() {
        //We use dependency injection
        super(new FileManipulator);
        this.getConfig();
    }
    async getConfig() {
        let config = await this.configService.get();
        $('#project-name').html(config.projectName);
        $('#project-id').html(config.projectId.toString());
        $('#project-version').html(config.projectVersion);
    }
}