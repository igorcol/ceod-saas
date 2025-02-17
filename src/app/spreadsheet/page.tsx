"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { downloadJsonFile, excelToJson } from "@/lib/fileUtils";
import { Car, Download, Upload } from "lucide-react";
import { useState } from "react";

const page: React.FC = () => {
    const [fileName, setFileName] = useState<string>('')
    const [file, setFile] = useState<File>()
    const [isConverted, setIsConverted] = useState(false)
    const [convertedFile, setConvertedFile] = useState<File>()

    // TODO: SALVAR O ARQUIVO CONVERTIDO INTERNAMENTE NO PROJETO

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFile(event.target.files?.[0])
        setFileName(event.target.files?.[0]?.name || '')
        setIsConverted(false)
    }
    
    const handleConvert = async () => {
        if (file) {
            let new_blob = await excelToJson(file)
            let new_file = new File([new_blob], file.name, { type: new_blob.type })
            setConvertedFile(new_file)
            setIsConverted(true) 
        }
    }

    const handleDownload = () => {
        if (convertedFile) {
            downloadJsonFile(convertedFile, fileName)
        }
    }
    

    return (
        <main>
            <h1 className="text-xl font-bold">Converter Planilha</h1>

            <div className="pt-2 space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Adicione uma Planilha</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col w-full max-w-sm items-start gap-2" >
                        <Label htmlFor="spreedsheet">Arquivo XLS ou XLSX</Label>
                        <Input id="spreedsheet" type="file" accept=".xlsx,.xls" onChange={handleFileChange} />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button className="bg-blue-700 hover:bg-blue-900" onClick={()=>handleConvert()} disabled={!file}>
                        <Upload className="mr-2 h-4 w-4" /> Converter para JSON
                    </Button>
                </CardFooter>
            </Card>

            { isConverted &&

                <Card>
                    <CardHeader>
                        <CardTitle>{fileName?.replace(/\.[^/.]+$/, "")}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>Sua planilha foi convertida para JSON.</p>
                    </CardContent>
                    <CardFooter>
                        <Button className="bg-green-600 hover:bg-green-900"  onClick={handleDownload}>
                            <Download className="mr-2 h-4 w-4"/> Download JSON
                        </Button>
                    </CardFooter>
                </Card>
            
            }
            </div>
        </main>
    );
};

export default page;