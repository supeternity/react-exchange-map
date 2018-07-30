import React from 'react';

const MutateNumber = (num) => {
    let s = {
        res: num,
        arr: undefined,
        form: (v) => { v = v.replace(/(?<=\d)(?=(\d\d\d)+(?!\d))/g, ' '); return v; }
    }

    s.res = s.res.toString();
    /\./.test(s.res) ? s.arr = s.res.split('.') : s.res = s.form(s.res);
    s.arr ? s.arr[0] = s.form(s.arr[0]) : ' ';
    s.arr ? s.res = s.arr.join('.') : ' ';
    console.log(s);
    return <span>{s.res}</span>;
}

export default MutateNumber;