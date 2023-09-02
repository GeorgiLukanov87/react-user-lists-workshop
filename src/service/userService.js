const baseUrl = 'http://localhost:3030/jsonstore/phonebook';

export const getAll = async () => {
    const response = await fetch(baseUrl);
    const result = await response.json();

    return Object.values(result);
};

export const getOne = async (userId) => {
    try {
        const response = await fetch(`${baseUrl}/${userId}`)
        const result = await response.json();
        return result

    } catch (error) {
        console.log('There was an error', error);
    }
};
//gogogo
export const create = async (userData) =>{
    const response = await fetch(baseUrl,{
        method: 'POST',
        headers: {
            'content-type' : 'application/json',
        },
        body: JSON.stringify(userData)
    });

    const result = await response.json();
    console.log(result)
    return result
}

export const edit = async (userData) =>{
    console.log(userData)
    const id = userData._id
    const response = await fetch(`${baseUrl}/${id}`,{
        method: 'PUT',
        headers: {
            'content-type' : 'application/json',
        },
        body: JSON.stringify(userData)
    });

    const result = await response.json();
    console.log(result)
    return result
}

export const remove = async (userId) =>{
    const response = await fetch(`${baseUrl}/${userId}`,{
        method: 'DELETE',
    });

    const result = await response.json();
    console.log(result)
    return result
}
