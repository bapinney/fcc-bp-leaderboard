console.log("Inside script.jsx");

var AppContainer = React.createClass({
    getInitialState: function() {
        return null;
    },
    
    uiReceived: function(e) {
        this.renderedMD.updateMarkup(e.target.value);
    },
    
    render: function() {
        //Remember JSX expressions must have exactly one outermost element.
        return (
            <div>
                <div className="logo">
                    Camper Leaderboard
                </div>
                <div className="maincontainer">
                    <DataTable></DataTable>
                </div>
            </div>
        )
    }
});

class UserRow extends React.Component {
    render() {
        return (
            <tr>
                <td>{this.props.user.username}</td>
                <td>{this.props.user.alltime.toLocaleString()}</td>
                <td>{this.props.user.recent.toLocaleString()}</td>
                <td>{this.props.user.lastUpdate}</td>
            </tr>
        );
    }
};

class DataTable extends React.Component {
    
    constructor(props) {
        super(props);
        this. fetchData = this. fetchData.bind(this);
    }
    
    componentWillMount() {
        //Set to null so render does not generate an error.  When the data is returned and the state is updated, the view will be re-rendered;
        this.setState({tableRows: null});
        console.log("At component will mount!");
        this.rowsRetrieved = false;
        //If you don't use it in `render(), it shouldn't be on the state. 
        
        this.fetchData()
        .then(function(response) {
            var rows = [];
            var results = response;;
            for (var i=0; i < results.length; i++) {
                rows.push(<UserRow key={i} user={results[i]}/>)
            }
            this.setState({tableRows: rows});
        }.bind(this), //Bind allows us to access React's 'this' inside
        
        function(error) {
            console.log("at error");
            return false;
        });
    }
    
    fetchData(sortBy = "recent") {
        console.log("fetchData called addd!");
        
        if (sortBy == "recent") {
            return new Promise(function(resolve, reject) {
                fetch('https://fcctop100.herokuapp.com/api/fccusers/top/recent')
                .then(function(response) {
                    resolve(response.json());
                })
                .catch(function(error) {
                    reject(error.message);
                });
            });
        }
        else {
            return new Promise(function(resolve, reject) {
                fetch('https://fcctop100.herokuapp.com/api/fccusers/top/alltime')
                .then(function(response) {
                    resolve(response.json());
                })
                .catch(function(error) {
                    reject(error.message);
                });
            });
        }
    }
    
    sortBy(e) {
        var sortby = e.target.dataset.sortby;
        console.log(`sortby is ${sortby}`);
        this.fetchData(sortby)
        .then(function(response) {
            var rows = [];
            var results = response;;
            for (var i=0; i < results.length; i++) {
                rows.push(<UserRow key={i} user={results[i]}/>)
            }
            this.setState({tableRows: rows, sortBy: sortby});
            this.forceUpdate();
        }.bind(this), //Bind allows us to access React's 'this' inside
        
        function(error) {
            console.log("at error");
            return false;
        });
    }
    
    render() {
        
        return (
            <table className="rankTable">
                <thead>
                    <tr>
                        <th>Username</th>
                        <th data-sortBy="alltime" onClick={ (e) => this.sortBy(e)}>All-time {this.state.sortBy == "alltime" ? <span>&#9663;</span> : null}</th>
                        <th data-sortBy="recent" onClick={ (e) => this.sortBy(e)}>Recent
                        {this.state.sortBy == "recent" ? <span>&#9663;</span> : null}</th>
                        <th>Last Update</th>
                    </tr>
                </thead>
                <tbody>
                {this.state.tableRows}
                </tbody>
            </table>
        );
    }
};


ReactDOM.render(
    <AppContainer />,
    document.getElementById("app"));