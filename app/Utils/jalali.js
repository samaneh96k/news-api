
const moment=require("jalali-moment");
exports.formatData=date=>{
    return moment(date).locale("fa").format("D MMM yyyy");
}