import React, { Component } from 'react';
import dedupeLeads from './utils/dedupeLeads';
import './App.css';

class App extends Component {
  state = {
    errorMessage: '',
    inputValue: '',
    outputValue: '',
    removedLeads: [],
  };

  dedupeInput = (ev) => {
    const { state } = this;
    ev.preventDefault();

    try {
      const leads = JSON.parse(state.inputValue)['leads'];

      if (leads) {
        const { dedupedLeads, removedLeads } = dedupeLeads(leads);

        this.setState({
          outputValue: JSON.stringify({ leads: dedupedLeads }, undefined, 2),
          errorMessage: '',
          removedLeads,
        });
      }
    } catch {
      this.setState({
        errorMessage:
          'The input must be valid JSON and include a key "leads" with an array as a value.',
      });
    }
  };

  formatJSON = (ev) => {
    const value = ev.target.value;

    try {
      const parsedJSON = JSON.parse(value);

      if (parsedJSON) {
        this.setState({
          inputValue: JSON.stringify(parsedJSON, undefined, 2),
          errorMessage: '',
        });
      }
    } catch (error) {
      this.setState({ inputValue: ev.target.value, errorMessage: error.message });
    }
  };

  updateInputValue = (ev) => {
    const inputValue = ev.target.value;

    this.setState({ inputValue });
  };

  render() {
    const { state } = this;

    return (
      <main className="App">
        <h1>Marketo Take-Home</h1>

        <form className="textAreas" onSubmit={this.dedupeInput}>
          <p>Put JSON of leads into input, press dedupe, and watch the magic!</p>

          <div className="buttonContainer">
            <button className="button" type="submit">
              Dedupe!
            </button>
          </div>

          <section className="textAreaContainer">
            <label>Input:</label>
            <textarea
              cols="50"
              rows="20"
              onBlur={this.formatJSON}
              onChange={this.updateInputValue}
              value={state.inputValue}
              name="input"
            />
            <p className="errorBox">{state.errorMessage}</p>
          </section>

          <section className="textAreaContainer">
            <label>Output:</label>
            <textarea cols="50" rows="20" readOnly value={state.outputValue} name="output" />
          </section>
        </form>

        <section className="logArea">
          {state.removedLeads.length > 0 && <p>Removed:</p>}

          {/* Key as index here isn't necessary, but it's in here to prevent a lint warning 🤷‍♂️ */}
          {state.removedLeads.map((removedLead, index) => (
            <pre key={index}>{JSON.stringify(removedLead, undefined, 2)}</pre>
          ))}
        </section>
      </main>
    );
  }
}

export default App;
