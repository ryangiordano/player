/**
  This will have functionality for both the kiosk player and the digital signage player.
 */
import { FileManipulator } from './FileManipulator.module';
export abstract class CodigoViewer {
    constructor(public fileManipulator:FileManipulator) {
       
    }
}