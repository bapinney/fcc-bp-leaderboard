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
                <td>{this.props.user.firstName}</td>
                <td>123</td>
                <td>234</td>
                <td>567</td>
            </tr>
        );
    }
};

var DataTable = React.createClass ({
    
    handleInput: function(e) {
        this.props.cbParent(e);
    },
    
    render: function() {
        var rows = [];
        var results = [
            {firstName: "John", lastName: "Smith"},
            {firstName: "Russ", lastName: "Kerry"}
        ];
        
        for (var i=0; i < results.length; i++) {
            rows.push(<UserRow user={results[i]}/>)
        }
        
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
                    {rows}
                </tbody>
            </table>
        );
    }
});


ReactDOM.render(
    <AppContainer />,
    document.getElementById("app"));