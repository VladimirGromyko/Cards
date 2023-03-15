export const changeDateView = (oldDate:string) => {
    let newDate = oldDate.slice(0, 10).split('-').reverse().join('.')
  return newDate
}