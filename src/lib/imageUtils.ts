import { Jimp } from 'jimp';


export async function GenerateQrImage( // antigo OverlayQRCode
  qrBuffer: Buffer,
  backImg: string,
  watermark: string,
  outputPath: string,
  saveName: string
) {
  Promise.all([
    Jimp.read(backImg),
    Jimp.read(qrBuffer),
    Jimp.read(watermark)
  ]).then(([backImg, qrBuffer, watermark]) => {

    // Verifica se a imagem foi carregada corretamente
    if (!qrBuffer || !backImg) {
      throw new Error("Falha ao carregar as imagens.");
    }

    qrBuffer.resize({ w: 500, h: 500 });

    // Defina as coordenadas onde você quer colocar o QR code na imagem base
    const x_qr = Math.floor((backImg.bitmap.width - qrBuffer.bitmap.width) / 2);
    const y_qr = Math.floor((backImg.bitmap.height - qrBuffer.bitmap.height) / 2);
    const x_wm = Math.floor((backImg.bitmap.width - watermark.bitmap.width) / 2);
    const y_wm = Math.floor((backImg.bitmap.height - watermark.bitmap.height) / 2);

    // Coloca a imagem do QR code sobre a imagem base
    backImg.composite(qrBuffer, x_qr, y_qr);
    backImg.composite(watermark, x_wm, y_wm);

    // Salvar a imagem resultante
    backImg.write(`${outputPath}/${saveName}.png`, () => {
      console.log('Imagem final salva como QR_Final.png');
    });
  }).catch(err => {
    console.error('Erro ao carregar as imagens:', err);
  });
}