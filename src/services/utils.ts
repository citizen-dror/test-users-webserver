export const macthHeb = (str: string) => {
    return (str.match(/^[-\u0590-\u05FF]+$/))
}
export const macthInt = (str: string) => {
    const parsed = parseInt(str, 10);
    return (!isNaN(parsed));
}
/**
 * convert YYYY-MM-DD string to date 
 * @param sqlDate 
 * @returns 
 */
export const sqlDateToDate = (sqlDate: string) => {
    const res = new Date(sqlDate);
    return res;
}
/**
 * foramt date to formated string
 * @param date 
 * @param toSqlformat convert to YYYY-MM-DD if true, and to DD/MM/YYYY if false 
 * @returns 
 */
export const formatDate = (date: Date, toSqlformat: boolean) => {
    let month = '' + (date.getMonth() + 1);
    let day = '' + date.getDate();
    const year = date.getFullYear();
    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;
    if (toSqlformat)
        return [year, month, day].join('-');
    else
        return [day, month, year].join('/');
}

/**
 * convert sql date string foramt to ui date format
 * @param sqlDate YYYY-MM-DD foramt
 * @returns DD/MM/YYYY format
 */
export const sqlDateToUiFormat =(sqlDate: string) =>{
    const date = sqlDateToDate(sqlDate);
    return formatDate(date, false);
}