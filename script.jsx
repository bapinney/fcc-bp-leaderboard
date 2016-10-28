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
                    <DataTable ref={(st) => this.DataTable = st} ></DataTable>
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
                <td>{this.props.alltime}</td>
                <td>{this.props.recent}</td>
                <td>{this.props.lastUpdate}</td>
            </tr>
        );
    }
};

class DataTable extends React.Component {
    
       
    componentWillMount() {
        console.log("At component will mount!");
        this.rowsRetrieved = false;
        //If you don't use it in `render(), it shouldn't be on the state. 
        this.fetchData()
        .then(function(response) {
            console.dir(response);
            var rows = [];
            var results = response;
            console.dir(this);
            for (var i=0; i < results.length; i++) {
                rows.push(<UserRow key={i} user={results[i]}/>)
            }
            this.tableRows = rows;
            this.rowsRetrieved = true;
            console.dir(this.tableRows);
            this.forceUpdate();
        }.bind(this), //Bind allows us to access React's 'this' inside
        function(error) {
            console.log("at error");
            return null;
        });
    }
    
    fetchData() {
        console.log("fetchData called!");
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
    
    render() {
        
        return (
            <table className="rankTable">
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>All-time</th>
                        <th>Recent</th>
                        <th>Last Update</th>
                    </tr>
                </thead>
                <tbody>
                {this.tableRows}
                </tbody>
            </table>
        );
    }
};


ReactDOM.render(
    <AppContainer />,
    document.getElementById("app"));