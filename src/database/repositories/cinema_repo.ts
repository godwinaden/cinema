

// creating a custom type for any json object
type JSONValue =
    | string
    | number
    | boolean
    | { [x: string]: JSONValue }
    | Array<JSONValue>;


class CinemaRepo{
    json: JSONValue = {
        full_name: "Username"
    };

    createCinema(cinema: JSONValue){

    }
}