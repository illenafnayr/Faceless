// logs all adjectives in adjectives.js
// console.log(adjectives);

//returns a random word from the array of adjectives
let randomAdjective = (array) => {
    let rng = Math.floor(Math.random() * array.length);
    let randomAdjective = array[rng];
    return randomAdjective
}

let randomPokemon = () => {
    let rng = Math.floor(Math.random() * 150 + 1);
    axios.get(`https://pokeapi.co/api/v2/pokemon/${rng}`).then((response) => {
        pokemon = response.data.name;
        return pokemon
    })
}

let pokemon = randomPokemon();

//successfully logs a random adjective each time function is invoked
// console.log(randomAdjective(adjectives)
// );

class App extends React.Component {
    state= {
        file: null,
        username: "",
        posts: []
    }

    rngUsername = () => {
        randomPokemon();
        this.setState({
            username: `${randomAdjective(adjectives)} ${pokemon}`
        })
    }

    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        })
    }

    handleFile = (event) => {
        this.setState({
            file: event.target.files[0]
        })
        console.log(event.target.files[0])
    }

    componentDidMount = () => {
        axios.get('/posts').then((response) => {
            this.setState({
                posts: response.data
            })
        })
    }

    // handlUpload = () => {
    //     event.preventDefault();
    //     axios
    //         .post('/posts', formData)
    //         .then((response) => {
    //             console.log(response)
    //         })
    // }

    create = (event) => {
        event.preventDefault();
        let formData = new FormData()
        formData = {
            file: this.state.file
        }
        // formData.append('img', this.state.file)
        // formData.append('username', this.state.username)
        // formData.append('title', this.state.title)
        // formData.append('body', this.state.body)
        console.log(formData)
        axios
            .post('/posts', formData)
            .then(
                (response) => {
                    console.log(response)
                    // this.setState({
                    //     username: "",
                    //     posts: response.data
                    // })
                }
            )
    }
        hideForm = () => {
            // document.querySelector('#createPostContainer').style.display = 'none'
        }

        componentDidMount = () => {
            axios.get('/posts').then((response) => {
                this.setState({
                    foods: response.data
                })
            })
        }


    render = ()=>{
        return(
            <div>
            <h2>One and Done</h2>
                <div id="createPostContainer">
                    <form
                    encType="multipart/form-data"
                    multiple
                    onFocus={this.rngUsername}
                    onSubmit={this.create}>

                        <input type="hidden" name="username" value={this.state.username}/>

                        {/* <label htmlFor="title">Title: </label><br/>
                        <input
                            type="text"
                            name="title"
                            id="title"
                            onChange={this.handleChange}/><br/> */}

                        <textarea
                            name="body"
                            id="body" cols="30" rows="10" placeholder="whats on your mind..."
                            onChange={this.handleChange}>
                        </textarea><br/>

                        <label htmlFor="imgsrc">Select Image:</label><br/>
                        <input
                            type="file"
                            name="imgsrc"
                            id="imgsrc"
                            onChange={this.handleFile}/><br/>

                        <input
                            type="submit"
                            name="submit"
                            value="Create Post"
                            // onClick={this.hideForm}
                            />
                    </form>

                </div>

                <ul>
                <div className="posts">
                    {this.state.posts.map((post,index) => {
                        return (
                            <li key={index}>
                            {post.username}
                            <br/>

                            </li>
                        )
                    })}
                </div>
                </ul>

            </div>
        )
    }
}

ReactDOM.render(
    <App></App>,
    document.querySelector('#root')
)
