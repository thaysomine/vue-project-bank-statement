import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist';

GlobalWorkerOptions.workerSrc = '/pdf.worker.mjs';

export function usePdfParser() {
  async function pdfToJson(file: File): Promise<TransactionItem[]> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = async () => {
        try {
          const typedArray = new Uint8Array(reader.result as ArrayBuffer);

          // Carregar o PDF usando pdfjs
          const pdf = await getDocument({ data: typedArray }).promise;
          let textContent = "";

          for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const text = await page.getTextContent();
            text.items.forEach((item: any) => {
              textContent += (item.str + "\n");
            });
          }

          const lines = textContent.split("\n").map(line => line.trim()).filter(line => line);
          console.log(lines);
          const transactions = parseBankStatement(lines);
          const categorizedTransactions = separateByCategory(transactions);
          console.log(categorizedTransactions);

          resolve(transactions);
        } catch (err) {
          reject(err);
        }
      };

      reader.readAsArrayBuffer(file);
    });
  }
  return { pdfToJson };
}
