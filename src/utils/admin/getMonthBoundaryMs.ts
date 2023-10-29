// jshint esversion:6

export function getMonthBoundaryMs() {
    let date_today = new Date();

    let firstDay = new Date(date_today.getFullYear(), date_today.getMonth(), 1);

    console.log(`Current year is: ${date_today.getFullYear()}`);

    console.log(`Index of current month is: ${date_today.getMonth()}`);

    console.log('Currrent MS', firstDay.getTime())

    let lastDay = new Date(date_today.getFullYear(), date_today.getMonth() + 1, 0);

    console.log(`The first date of the current month is: ${firstDay.toString()}`);

    console.log(`The last date of the current month is: ${lastDay.toString()}`);

    console.log("Last time ms", lastDay.getTime())

    return (
        {
            firstDayMs: firstDay.getTime(),
            lastDayMs: lastDay.getTime()
        }
    )
}