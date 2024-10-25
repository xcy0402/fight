export const getQueryString=(name)=> {
    let query = window.location.search.substring(1);
    let vars = query.split("&");
    for (let i = 0; i < vars.length; i++) {
        let pair = vars[i].split("=");
        if (pair[0] == name) { return pair[1]; }
    }
    return ('');
}

export const getRefAddress=()=>{
    const add1= getQueryString('ref')||'';
    if(add1) return add1;
    const add2=localStorage.getItem('ref')||'';
    if(add2) return add2;
    return false;
}