import fs from 'fs';
import { IDatabase } from '../middlewares/utils/interfaces';
import { headersFilePath, stateFilePath } from './databaseData';

export function saveData(data: IDatabase) {
    if ('accountIndex' in data && 'remainingModules' in data) {
        fs.writeFileSync(stateFilePath, JSON.stringify({ ...data }, null, 2));
    }

    if ('address' in data && 'acceptLanguage' in data && 'secChUa' in data && 'userAgent' in data) {
        const database = fs.readFileSync(headersFilePath, 'utf8');
        const jsonData = database ? JSON.parse(database.toString()) : [];

        jsonData.push(data);

        const jsonString = JSON.stringify(jsonData, null, 2);
        fs.writeFileSync(headersFilePath, jsonString);
    }
}

export function loadState() {
    if (fs.existsSync(stateFilePath)) {
        const state = JSON.parse(fs.readFileSync(stateFilePath, 'utf8'));
        return state;
    } else {
        return { index: 0, remainingModules: 0 };
    }
}
