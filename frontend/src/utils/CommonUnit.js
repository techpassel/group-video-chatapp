import moment from 'moment';

export const dateInFormat = (date) => {
    date = new Date(date);
    const time = moment(date).format('LT');
    let additionalInfo = null;
    const today = new Date();
    if (moment(date).startOf('day').isSame(moment(today).startOf('day'))) {
        additionalInfo = 'Today,';
    } else if (moment(date).startOf('day').isSame(moment(today).subtract(1, 'days').startOf('day'))) {
        additionalInfo = 'Yesterday,';
    } else if (date.getFullYear() === today.getFullYear()) {
        additionalInfo = moment(date).format('D MMM,')
    } else {
        additionalInfo = moment(date).format('L,')
    }
    return additionalInfo ? additionalInfo + " " + time : time;
}