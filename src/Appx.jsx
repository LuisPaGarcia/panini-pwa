//@ts-check
import React, { Component } from "react";
import styled, { keyframes } from "styled-components";
import grupos from "./utils/grupos.stickers";
import { ONE, DUPLICATE, MISSING } from "./data/const";
import {
  loadFromIndexedDB,
  saveToIndexedDB as FillInitialData,
  updateStatus
} from "./utils/IndexDBManager";

const Title = styled.div`
  display: grid;
  color: white;
  padding: 1.5rem;
  background-color: dimgray;
  border: 1px darkgray solid;
  text-align: center;
  font-size: 25px;
`;

const bgColorChooser = status => {
  if (status === ONE) return "green";
  else if (status === DUPLICATE) return "black";
  else if (status === MISSING) return "#444";
};

const StickerStyled = styled.div`
  display: grid;
  border-radius: 5px;
  padding: 20px;
  margin: 2px;
  border: 1px solid #fff;
  text-align: center;
  font-size: 1.2em;
  cursor: pointer;
  color: #fff;
  //@ts-ignore
  background-color: ${props => bgColorChooser(props.status)};
`;

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const Rotate = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${rotate360} 1s linear infinite;
  padding: 2rem 1rem;
  font-size: 5rem;
`;

const WrapperSticker = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
`;

const HeaderContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(50%, 1fr));
  margin: 0;
`;

// Searchbox creation
const SearchBox = styled.input`
  background-color: whitesmoke;
  padding: 20px;
  color: gray;
  border: 1px solid #fff;
  width: 90%;
  text-align: center;
  margin: auto;
`;

// Filter reusable button created
const FilterButton = styled.button`
  background-color: blueviolet;
  padding: 20px;
  height: 7em;
  color: #fff;
  border: 1px solid #fff;
  font-size: 1em;
  //@ts-ignore
  background-color: ${props => bgColorChooser(props.status)};
  cursor: pointer;
`;

const Container = styled.div`
  padding-bottom: 20px;
`;

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

    if (status === ONE) newStatus = MISSING;
    else if (status === MISSING) newStatus = DUPLICATE;
    else if (status === DUPLICATE) newStatus = ONE;
    return newStatus || "NO STATUS";
  }

  render() {
    if (this.state.stickers) {
      let { stickers } = this.state;
      return <Content data={stickers} updateState={this.updateState} />;
    } else {
      // return <p>Loading data...</p>;
      return <Loader />;
    }
  }
}

class Loader extends Component {
  render() {
    return (
      <Rotate>
        <span role="img" aria-label="ball">
          ⚽️
        </span>
      </Rotate>
    );
  }
}

class Content extends Component {
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
    this.setState({ result: this.props.data });
    // let filter = this.props.data.filter(
    //   sticker => sticker.id.toString().indexOf(this.state.search) !== -1
    // );
    // this.setState({ result: fil  ter });
    // this.nameInput.focus();
  }

  resetSearch() {
    this.setState({ result: this.props.data, search: "" });
    // this.searchBox.focus();
  }

  filtrarUnicas() {
    console.log(`UNICAS`);
    let result = this.props.data.filter(
      sticker => sticker.status.indexOf(ONE) !== -1
    );
    this.setState({ result, search: "" });
  }

  filtrarFaltantes() {
    console.log(`FALTANTES`);
    let result = this.props.data.filter(
      sticker => sticker.status.indexOf(MISSING) !== -1
    );
    this.setState({ result, search: "" });
  }

  filtrarRepetidas() {
    console.log(`REPETIDAS`);
    let result = this.props.data.filter(
      sticker => sticker.status.indexOf(DUPLICATE) !== -1
    );
    this.setState({ result, search: "" });
  }

  render() {
    let { result: stickers } = this.state;
    let Box =
      stickers.length > 0 ? (
        <StickersBlock
          data={stickers}
          updateStateParent={this.props.updateState}
        />
      ) : (
        <p>Sin resultados</p>
      );

    return (
      <div>
        <div
          style={{
            display: `flex`,
            justifyContent: `center`,
            alignItems: `center`,
            padding: `1em`
          }}
        >
          <a
            href="https://luispa.im"
            target="_blank"
            style={{ textDecoration: `none`, magin: `auto` }}
            rel="noopener noreferrer"
          >
            Creado por @diganluispa
          </a>
        </div>
        <div className="header" id="myHeader">
          <SearchBox
            placeholder="# de sticker"
            ref={input => {
              this.nameInput = input;
            }}
            type="text"
            onChange={this.updateSearch}
            value={this.state.search}
          />

          <HeaderContainer>
            <FilterButton
              key="btn1"
              onClick={this.filtrarUnicas}
              //@ts-ignore
              status={ONE}
            >
              Ver Faltantes
            </FilterButton>
            <FilterButton
              key="btn2"
              onClick={this.filtrarRepetidas}
              //@ts-ignore
              status={DUPLICATE}
            >
              Ver Repetidas
            </FilterButton>
            <FilterButton
              key="btn3"
              onClick={this.filtrarFaltantes}
              //@ts-ignore
              status={MISSING}
            >
              Ver Unicas
            </FilterButton>
            <FilterButton key="btn4" onClick={this.resetSearch}>
              Reiniciar búsqueda
            </FilterButton>
          </HeaderContainer>
        </div>

        {Box}
      </div>
    );
  }
}

class StickersBlock extends Component {
  render() {
    return (
      <div>
        {// eslint-disable-next-line
        grupos.map((elem, index) => {
          let stick = this.props.data.filter(ele => {
            return ele.id >= elem.i && ele.id <= elem.f;
          });
          if (stick.length > 0)
            return (
              <Container key={index + "-Box"}>
                <Title>
                  {elem.titulo} - {elem.emoji}
                </Title>
                <WrapperSticker>
                  {stick.map(e => {
                    return (
                      <Sticker
                        key={e.id}
                        object={e}
                        updateStateParent={this.props.updateStateParent}
                      />
                    );
                  })}
                </WrapperSticker>
              </Container>
            );
        })}
      </div>
    );
  }
}

//@ts-check

class Sticker extends Component {
  render() {
    let { id, status } = this.props.object;
    return (
      <StickerStyled
        key={id}
        id={id}
        //@ts-ignore
        status={status}
        onClick={() =>
          this.props.updateStateParent(
            this.props.object.id,
            this.props.object.status
          )
        }
      >
        {id}
      </StickerStyled>
    );
  }
}
