export function classifyCategory(description: string, type: string): string {
    const categories = {
      food: ["ifood", "restaurante", "mc donalds", "zé delivery", "mercado", "conveniencia", "padaria"],
      recreation: ["netflix", "google", "spotify", "jogos", "playstation", "parque", "loja"],
      bills: ["boleto", "companhia", "imobiliaria", "internet", "aluguel", "condominio"],
      transport: ["uber", "99pop", "gasolina", "metrô", "ônibus", "pedágio"],
      weed: ["augusto mazzero"],
    };
  
    const lowerDesc = description.toLowerCase();
  
    for (const [category, keywords] of Object.entries(categories)) {
      if (keywords.some(keyword => lowerDesc.includes(keyword))) {
        return category;
      }
    }

    return "Outros";
  }

  export function groupTransactionsByDescription(transactions: any[]) {
    const groupedTransactions: { [description: string]: any } = {};
  
    transactions.forEach(transaction => {
      const { description, date, type, value, movement } = transaction;
  
      if (!groupedTransactions[description]) {
        groupedTransactions[description] = {
          date,
          description,
          type,
          value: 0,
          movement,
          count: 0, // Contador para saber quantas transações foram agrupadas
        };
      }
  
      // Somamos os valores das transações agrupadas
      groupedTransactions[description].value += value;
      groupedTransactions[description].count += 1;
    });
  
    // Retorna os valores agrupados como um array
    return Object.values(groupedTransactions);
  }
  

  export function separateByCategory(transactions: any[]) {
    const categorized: { [key: string]: any[] } = {};
  
    transactions.forEach(transaction => {
      if (!categorized[transaction.category]) {
        categorized[transaction.category] = [];
      }
      categorized[transaction.category].push(transaction);
    });
  
    return categorized;
  }