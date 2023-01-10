export const getAllPodcastShows = async () => {
    let data;
    let error;
    fetch('https://podcast-api.netlify.app/shows', { cache: "force-cache" })
        .then((res) => {
            data = res.json();
        }).catch((err) => {
            error = err;
        });
    console.log(data, error);
    return { data, error };
};
export const getSinglePodcastShow = (/** @type {string} */ id) => {
    let data;
    let error;
    fetch(`https://podcast-api.netlify.app/id/${ id }`, { cache: "force-cache" })
        .then((res) => {
            data = res.json();
        }).catch((err) => {
            error = err;
        });
    console.log(data, error, status);
    return { data, error, status };
};