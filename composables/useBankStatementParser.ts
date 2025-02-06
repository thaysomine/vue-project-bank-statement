export function parseBankStatement(lines: string[]) {
  const bankStatement: Array<{ Data: string; Descrição: string; Tipo: string; Valor: string; Categoria: string }> = [];

  let currentDate = "";
  let currentCategory = "";
  let transactionBuffer: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // Detecta uma nova data (formato "01 DEZ 2024")
    if (/^\d{2} \w{3} \d{4}$/.test(line)) {
      currentDate = line;
      continue;
    }

    // Identifica categorias de transação
    if (line.includes("Total de entradas")) {
      currentCategory = "Entrada";
      continue;
    }
    if (line.includes("Total de saídas")) {
      currentCategory = "Saída";
      continue;
    }

    // Verifica se a linha indica um tipo de transação
    if (
      line.includes("Transferência recebida pelo Pix") ||
      line.includes("Transferência recebida") ||
      line.includes("Reembolso recebido pelo Pix") ||
      line.includes("Transferência enviada pelo Pix") ||
      line.includes("Pagamento de boleto efetuado") ||
      line.includes("Compra no débito via NuPay") ||
      line.includes("Compra no débito")
    ) {
      transactionBuffer = [line]; // Inicia um buffer para armazenar os detalhes da transação
      continue;
    }

    // Se a transação já começou a ser capturada, adiciona mais detalhes
    if (transactionBuffer.length > 0) {
      transactionBuffer.push(line);

      // Se a última linha é um valor numérico válido, processa a transação
      if (/^-?\d+,\d{2}$/.test(line)) {
        const tipo = transactionBuffer[0]; // O tipo está na primeira linha do buffer
        const descricao = transactionBuffer.slice(1, -1).join(" "); // Junta as linhas da descrição
        const valor = transactionBuffer[transactionBuffer.length - 1]; // O valor está na última linha do buffer

        bankStatement.push({
          Data: currentDate,
          Descrição: descricao,
          Tipo: tipo,
          Valor: valor,
          Categoria: currentCategory
        });

        transactionBuffer = []; // Limpa o buffer após salvar a transação
      }
    }
  }

  return bankStatement;
}