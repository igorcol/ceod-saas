import * as XLSX from 'xlsx';

export function excelToJson(file: File): Promise<Blob> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        
        reader.onload = (event: ProgressEvent<FileReader>) => {
            try {
                const data = new Uint8Array(event.target!.result as ArrayBuffer);
                const workbook = XLSX.read(data, { type: 'array' });

                const firstSheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[firstSheetName];
                
                const jsonData = XLSX.utils.sheet_to_json(worksheet);
                const result = { users: jsonData };

                const jsonString = JSON.stringify(result, null, 2);
                const blob = new Blob([jsonString], { type: "application/json" });
                
                resolve(blob);
            } catch (error) {
                reject(error);
            }
        };
        
        reader.onerror = () => {
            reject(new Error("Error reading file"));
        };
        
        reader.readAsArrayBuffer(file);
    });
}

export function downloadJsonFile(jsonFile: Blob, fileName: string) {
    if (jsonFile) {
        try {
            const url = URL.createObjectURL(jsonFile)
            const link = document.createElement("a")
            link.href = url
            const fileNameWithoutExtension = fileName.replace(/\.[^/.]+$/, "");
            link.download = `${fileNameWithoutExtension}.json`

            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
            URL.revokeObjectURL(url)
        }
        catch (error) {
            console.error("Erro ao baixar o arquivo:", error);
        }
    }
}