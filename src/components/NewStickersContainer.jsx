// packages import
import React, { Component } from "react";
import styled from "styled-components";
import { ONE, DUPLICATE, MISSING } from "../data/const";
import { grupos } from "../utils/grupos.stickers";
//Components, const import
import Sticker from "./StickerItem";
// import { ONE, DUPLICATE, MISSING } from "../data/const";

// Wrapper creation
const Wrapper = styled.div`
  display: grid;
  grid-template-areas: "left right";
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
`;

const Title = styled.p`
  padding: 20px;
  grid-area: left;
`;

// Searchbox creation
const SearchBox = styled.input``;

// Filter reusable button created
const FilterButton = styled.button`
  background-color: deepPink;
  padding: 20px;
  color: #fff;
  border: 1px solid #fff;
`;

const ButtonContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
`;

// Class init
export default class StickersContanier extends Component {
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

  render() {
    console.log("render!");

    // eslint-disable-next-line

    // this.state.result = this.props.data.filter(
    //   sticker => sticker.id.toString().indexOf(this.state.search) !== -1
    // );

    let below;
    if (this.state.result.length === 0) {
      below = <p>:( sin datos</p>;
    } else {
      below = this.state.result.map(ele => {
        return (
          <Sticker
            key={ele.id}
            object={ele}
            updateStateParent={this.props.updateStateParent}
          />
        );
      });
    }

    return (
      <div>
        <div>
          <SearchBox
            ref={input => {
              this.nameInput = input;
            }}
            type="text"
            onChange={this.updateSearch}
            value={this.state.search}
          />
        </div>

        <ButtonContainer>
          <FilterButton
            key="btn1"
            text="Faltantes"
            onClick={this.filtrarFaltantes}
          >
            Faltantes
          </FilterButton>
          <FilterButton
            key="btn2"
            text="Repetidas"
            onClick={this.filtrarRepetidas}
          >
            Repetidas
          </FilterButton>

          <FilterButton key="btn3" text="Unicas" onClick={this.filtrarUnicas}>
            Unicas
          </FilterButton>

          <FilterButton key="btn4" text="Reset" onClick={this.resetSearch}>
            Reset Search
          </FilterButton>
        </ButtonContainer>

        <Wrapper>{below}</Wrapper>
      </div>
    );
  }
}
