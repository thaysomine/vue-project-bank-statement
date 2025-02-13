interface Transaction {
    date: number,
    description: string,
    type: string,
    value: number,
    movement: string,
    category?: string
  }