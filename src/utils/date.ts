export const compareDate = (date: string) => {
  const dateRegex = /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/

  if (!dateRegex.test(String(date))) {
    console.log(date)
    return 'Formato invalido'
  }

  const todayDate = new Date()
  const newDate = new Date(date)


  if (todayDate.getTime() > newDate.getTime()) {
    return 'A data informada precisa ser maior que a data de hoje'
  }
}