
export const fetchUser = async () => {
    const response = await fetch('http://test.com/api/user');
    const data = await response.json();
    return data;
}

export const fetchUserWithCB = async (cb) => {
    const response = await fetch('http://test.com/api/user');    
    if(!response.ok){
        return cb({data:null,isSuccess:false})
    }
    const data = await response.json();
    return cb(data,true);
}
