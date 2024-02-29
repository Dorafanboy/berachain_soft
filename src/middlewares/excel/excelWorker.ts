import * as ExcelJS from 'exceljs';
import { Hex } from 'viem';
import { columns, logsPath } from './excelWorkerData';

const workbook = new ExcelJS.Workbook();
const worksheet = workbook.addWorksheet('Logs');

export async function createExcelTable() {
    worksheet.columns = [columns.address, columns.privateKey, columns.berachainXp, columns.status];

    await workbook.xlsx.writeFile(logsPath);
}

export async function addAddress(address: Hex) {
    worksheet.addRow({ address: address });

    await workbook.xlsx.writeFile(logsPath);
}

export async function addPrivateKey(privateKey: Hex) {
    const lastRow = worksheet.lastRow;
    lastRow!.getCell(columns.privateKey.key).value = privateKey;

    await workbook.xlsx.writeFile(logsPath);
}

export async function updateBerachainXp(berachainXp: number) {
    const lastRow = worksheet.lastRow;
    lastRow!.getCell(columns.berachainXp.key).value = berachainXp;

    await workbook.xlsx.writeFile(logsPath);
}

export async function updateStatus(status: string) {
    const lastRow = worksheet.lastRow;
    lastRow!.getCell(columns.status.key).value = status;

    await workbook.xlsx.writeFile(logsPath);
}
