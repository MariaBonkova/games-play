export const request = async (method, url, data) => {

    try {
        let buildRequest;

        if (method === 'GET') {
            buildRequest = fetch(url);

        } else {
            buildRequest = fetch(url, {
                method,
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(data)
            })

        }
        const response = await buildRequest;
        return await response.json();

    } catch (err) {
        console.log(err)
    }
}
export const get =request.bind({},'GET')
export const post =request.bind({},'POST')
export const put =request.bind({},'PUT')
export const del =request.bind({},'DELETE')
