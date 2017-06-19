export class Config {
    public projectName: string;
    public projectId: number;
    public projectVersion: string;
    constructor({projectName,projectId,projectVersion}) {
        this.projectName = projectName;
        this.projectId = projectId;
        this.projectVersion = projectVersion;
    }

}