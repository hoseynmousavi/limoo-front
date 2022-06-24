import numberCorrection from "../helpers/numberCorrection"

const dateConstant = {
    months: ["فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور", "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"],
    leastYear: 1320,
    defaultYear: 1390,
    thisYear: numberCorrection(new Date().toLocaleString("fa-ir", {year: "numeric"})),
    defaultDay: 15,
    defaultMonth: 6,
    defaultHour: 0,
    defaultMinute: 15,
    noLimitTime: "23:59",
    weekConstant: {
        0: "sunday",
        1: "monday",
        2: "tuesday",
        3: "wednesday",
        4: "thursday",
        5: "friday",
        6: "saturday",
    },
}

export default dateConstant