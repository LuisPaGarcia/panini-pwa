//@ts-check
import React, { Component } from "react";
import styled from "styled-components";
import grupos from "./utils/grupos.stickers";
import { ONE, DUPLICATE, MISSING } from "./data/const";
import {
  loadFromIndexedDB,
  saveToIndexedDB as FillInitialData,
  updateStatus
} from "./utils/IndexDBManager";

const WrapperSticker = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
`;

const Title = styled.div`
  color: white;
  display: grid;
  padding: 1.5rem;
  background-color: dimgray;
  border: 1px darkgray solid;
  text-align: center;
  font-size: 25px;
`;

const Sticker = styled.div`
  display: grid;
  border-radius: 5px;
  padding: 20px;
  margin: 2px;
  border: 1px solid #fff;
  text-align: center;
  font-size: 1.2em;
  cursor: pointer;
  color: #fff;
  background-color: black;
`;

// Searchbox creation
const SearchBox = styled.input``;

// Filter reusable button created
const FilterButton = styled.button``;

export default class AppX extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    FillInitialData()
      .then(data => {
        console.log("entra a fill data");
        loadFromIndexedDB()
          .then(data => {
            this.setState({ stickers: data });
          })
          .catch(error => {
            console.log(`Error getting data: ${error}`);
          });
      })
      .catch(() => {
        console.log("ERROROORORO");
      });

    this.updateState = this.updateState.bind(this);
    this.getNewStatus = this.getNewStatus.bind(this);
    this.updateLocalStorage = this.updateLocalStorage.bind(this);
  }

  // @ts-ignore
  updateState = (id, status) => {
    // eslint-disable-next-line
    let newStatus = this.getNewStatus(status);

    updateStatus({ id: id, status: newStatus })
      .then(data => {
        // eslint-disable-next-line
        this.state.stickers[id].status = newStatus;
        this.forceUpdate();
      })
      .catch(error => {
        console.log("NEL");
      });
  };

  updateLocalStorage() {
    localStorage.setItem("stickers", JSON.stringify(this.state.stickers));
  }

  getNewStatus(status) {
    let newStatus;

    if (status === ONE) newStatus = DUPLICATE;
    else if (status === DUPLICATE) newStatus = MISSING;
    else if (status === MISSING) newStatus = ONE;
    return newStatus || "NO STATUS";
  }

  render() {
    if (this.state.stickers) {
      let { stickers } = this.state;
      return (
        <GridExample data={stickers} updateStateParent={this.updateState} />
      );
    } else {
      return <p>Loading data...</p>;
    }
  }
}

class GridExample extends Component {
  constructor(props) {
    super(props);
    this.state = { search: "", result: [] };
    this.filtrarFaltantes = this.filtrarFaltantes.bind(this);
    this.filtrarRepetidas = this.filtrarRepetidas.bind(this);
    this.filtrarUnicas = this.filtrarUnicas.bind(this);
    this.resetSearch = this.resetSearch.bind(this);
  }

  updateSearch = event => {
    this.setState({
      search: event.target.value.substr(0, 20),
      result: this.props.data.filter(
        sticker =>
          sticker.id.toString().indexOf(event.target.value.substr(0, 20)) !== -1
      )
    });
  };

  componentWillMount() {
    this.resetSearch();
    // let filter = this.props.data.filter(
    //   sticker => sticker.id.toString().indexOf(this.state.search) !== -1
    // );
    // this.setState({ result: fil  ter });
    // this.nameInput.focus();
  }

  resetSearch() {
    this.setState({ result: this.props.data });
    // this.searchBox.focus();
  }

  filtrarUnicas() {
    let result = this.props.data.filter(
      sticker => sticker.status.indexOf(ONE) !== -1
    );
    this.setState({ result });
  }

  filtrarFaltantes() {
    let result = this.props.data.filter(
      sticker => sticker.status.indexOf(MISSING) !== -1
    );
    this.setState({ result });
  }

  filtrarRepetidas() {
    let result = this.props.data.filter(
      sticker => sticker.status.indexOf(DUPLICATE) !== -1
    );
    this.setState({ result });
  }

  // @ts-ignore
  updateState = (id, status) => {
    // eslint-disable-next-line
    let newStatus = this.getNewStatus(status);

    updateStatus({ id: id, status: newStatus })
      .then(data => {
        // eslint-disable-next-line
        this.state.stickers[id].status = newStatus;
        this.forceUpdate();
      })
      .catch(error => {
        console.log("NEL");
      });
  };

  getNewStatus(status) {
    let newStatus;

    if (status === ONE) newStatus = DUPLICATE;
    else if (status === DUPLICATE) newStatus = MISSING;
    else if (status === MISSING) newStatus = ONE;
    return newStatus || "NO STATUS";
  }

  render() {
    let { stickers } = this.state;
    let Box = stickers ? (
      <StickersBlock data={stickers} updateStateParent={this.updateState} />
    ) : (
      <p>Loading data</p>
    );
    console.log(Box);

    return (
      <div>
        <SearchBox type="text" />
        <FilterButton key="btn1">Faltantes</FilterButton>
        <FilterButton key="btn2">Repetidas</FilterButton>
        <FilterButton key="btn3">Unicas</FilterButton>
        <FilterButton key="btn4">Reset Search</FilterButton>
        {/* {Box} */}
      </div>
    );
  }
}

class StickersBlock extends Component {
  constructor(props) {
    super(props);
  }

  updateSearch = event => {
    this.setState({
      search: event.target.value.substr(0, 20),
      result: this.props.data.filter(
        sticker =>
          sticker.id.toString().indexOf(event.target.value.substr(0, 20)) !== -1
      )
    });
  };

  componentWillMount() {
    this.resetSearch();
  }

  resetSearch() {
    this.setState({ result: this.props.data });
  }

  render() {
    return (
      <div>
        {grupos.map((elem, index) => {
          let stick = this.props.data.filter(ele => {
            return ele.id >= elem.i && ele.id <= elem.f;
          });
          console.log(stick, elem);
          return (
            <div key={index + "-Box"}>
              <Title>
                {elem.titulo} - {elem.emoji}
              </Title>
              <WrapperSticker>
                {stick.map(e => {
                  return <Sticker>{e.id}</Sticker>;
                })}
              </WrapperSticker>
            </div>
          );
        })}
      </div>
    );
  }
}
