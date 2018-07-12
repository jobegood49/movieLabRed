const data = require('./data.js')

const resolvers = {
    Query: {
        movies() {
            return data.movies;
        },
        movie(root, {
            id
        }) {
            return data.movies.find(movie => movie.id === parseInt(id));
        },
        people() {
            console.log("hello");
            return data.people;
        },
        person(root, { id }) {
            return data.people.find(person => person.id === parseInt(id));
        }
    },
    Movie: {
        director(movie) {
            if (!movie.director) return null;
            return data.people.find(person => person.id === movie.director);
        },
        stars(movie) {
            return data.people.filter(person => (
                person.filmography.find(credit => (
                    credit === movie.id && person.id !== movie.director
                ))
            ));
        },
    },
    Person: {
        filmography(person) {
            // const { filmography} = data.people.find(p => {
            //     if (p.id === person.id)
            //         return p.filmography
            // })
            // return data.movies.filter(movie => filmography.includes(movie.id))
            return data.movies.filter(movie => person.filmography.includes(movie.id))
        }
    },
    Mutation: {
        addPerson(root, args) {
            const newPerson = {
                id: data.people.length + 1,
                name: args.name,
                birthday: args.birthday,
                placeOfBirth: args.placeOfBirth,
                bio: args.bio,
                filmography: args.filmography
            }
            data.people.push(newPerson);
            return newPerson;
        }
    }
}


module.exports = resolvers