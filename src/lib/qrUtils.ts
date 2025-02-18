import qr from 'qrcode'
// TODO: gera qr codes

// Estrutura para a criação do QrCode
export interface QRCodeData {
    id: number;
    data: string;
    version: number;
    backgroundImg?: string | null;
    watermark?: string | null;
}


// Cria o QR code e salva em BUFFER (variavel)
export function CreateAndBufferQrCode(QRData:QRCodeData) {
    const DATA = QRData.data
    const VERSION = QRData.version
    return new Promise((resolve, reject) => {
        try {
            const qrBuffer = qr.toBuffer(DATA, { //! .toBuffer() não funciona no frontEnd
                type: 'png',  
                version: VERSION,  
                errorCorrectionLevel: 'H',  
                margin: 0  
            });
            // Buffer com a imagem do QR code
            resolve(qrBuffer); 
        } catch (err) {
            reject('Erro na criação do QR Code: ' + err);
        }
    });
}

