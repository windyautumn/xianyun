export  function computeTime( arr_time, dep_time ){
    // 如果参数有一个是空值，直接返回
    if(!arr_time || !dep_time) return;

    const arrTime = arr_time.split(":"); 
    const depTime = dep_time.split(":");
    if(arrTime[0] < depTime[0]){
        arrTime[0] += 24;
    }

    // 到达时间的分钟
    const end = arrTime[0] * 60 + (+arrTime[1]);
    // 出发时间的分钟
    const start = depTime[0] * 60 + (+depTime[1]);
    // 相隔的分钟
    const dis = end - start;


    // 小时
    const hours =  Math.floor(dis / 60);
    // 分钟
    const min = dis % 60;

    return `${hours}小时${min}分钟`;
}