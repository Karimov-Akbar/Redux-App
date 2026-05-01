const API_URL = 'https://randomuser.me/api/';

let nextId = 1;

export async function fetchRandomUser() {
    const response = await fetch(API_URL);
    const data = await response.json();
    const raw = data.results[0];

    return{
        id: nextId++,
        username: raw.login.username,
        sex: raw.gender,
        name: `${raw.name.first} ${raw.name.last}`,
        email: raw.email,
        address: `${raw.location.street.number} ${raw.location.street.name}, ${raw.location.city}, ${raw.location.country}`,
        birthday: new Date(raw.dob.date).toLocaleDateString(),
    };
}