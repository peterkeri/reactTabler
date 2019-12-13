import React, { Component }  from 'react';
import Table from './components/test/Table';
import Form from './components/test/CreateForm';

class App extends Component {
  state = {
    data: [],
  }  


  removeRow = index => {
    const { data } = this.state
  
    this.setState({
      data: data.filter((data, i) => {
        return i !== index
      }),
    })
  }

  handleSubmit = row => {
    this.setState({ data: [...this.state.data, row] })
  }


  render() {
    const { data } = this.state

    return (
      <div className="container">
        <Table data={data} removeRow={this.removeRow}/>

        <Form handleSubmit={this.handleSubmit}/>
      </div>
    )
  }
}

export default App;
