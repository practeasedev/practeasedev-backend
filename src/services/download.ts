import fs from 'fs';
import path from 'path';
import { RESPONSE_STATUS } from '../common/constants';

export const getProjectFolderPath = (projectName: String) => {
    const folderPath = path.join(__dirname, '../projects/hero-section.zip');
    if (fs.existsSync(folderPath)) {
        return {
            status: RESPONSE_STATUS.Success,
            success: true,
            message: 'Successfully fetched folder name',
            data: folderPath,
        }
    } else {
        return {
            status: RESPONSE_STATUS.Bad_Request,
            success: false,
            message: 'Not able to find project folder path',
            data: '',
        }
    }
}