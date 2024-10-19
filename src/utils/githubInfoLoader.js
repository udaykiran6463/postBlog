export const githubInfoLoader = async() => {
    const response = await fetch('https://api.github.com/users/udaykiran6463');
    return response.json();
};