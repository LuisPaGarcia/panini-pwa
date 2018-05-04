//@ts-check
// import Swal from "sweetalert2";
import React, { Component } from "react";
// import initialJson from "./data/inicialArray";
import StickersContainer from "./components/NewStickersContainer";
import styled from "styled-components";
import Sticker from "./components/StickerItem";
import { ONE, DUPLICATE, MISSING } from "./data/const";
import grupos from "./utils/grupos.stickers";
import {
  loadFromIndexedDB,
  saveToIndexedDB as FillInitialData,
  updateStatus
} from "./utils/IndexDBManager";

Object.size = function(obj) {
  var size = 0,
    key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) size++;
  }
  return size;
};

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

export default class Principal extends Component {
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
        <StickersContainer
          data={stickers}
          updateStateParent={this.updateState}
        />
        // <StickersBlock data={stickers} updateStateParent={this.updateState} />
      );
    } else {
      return <p>Loading data...</p>;
    }
  }
}

class StickersBlock extends Component {
  constructor(props) {
    super(props);
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
                  return (
                    <Sticker
                      key={e.id}
                      object={e}
                      updateStateParent={this.props.updateStateParent}
                    >
                      {e.id}
                    </Sticker>
                  );
                })}
              </WrapperSticker>
            </div>
          );
        })}
      </div>
    );
  }
}
