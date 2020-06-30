import React, { Component } from "react";
import PropTypes from "prop-types";

import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
// import { v4 as uuidv4 } from "uuid";

import { connect } from "react-redux";
import { getItems, deleteItem } from "../actions/itemActions";

export class ShoppingList extends Component {
  // state = {
  //   items: [
  //     { id: uuidv4(), name: "Eggs" },
  //     { id: uuidv4(), name: "Pencil" },
  //     { id: uuidv4(), name: "Pen" },
  //     { id: uuidv4(), name: "Book" },
  //   ],
  // };
  //now we shall use redux instead

  componentDidMount() {
    //dispatching
    this.props.getItems();
  }
  onDeleteClick = (id) => {
    this.props.deleteItem(id);
  };
  render() {
    const { items } = this.props.item;

    return (
      <div>
        <Container>
          <ListGroup>
            <TransitionGroup className="shopping-list">
              {items.map(({ _id, name }) => (
                <CSSTransition key={_id} timeout={500} classNames="fade">
                  <ListGroupItem>
                    <Button
                      className="remove-btn"
                      color="danger"
                      size="sm"
                      onClick={this.onDeleteClick.bind(this, _id)}
                    >
                      &times;
                    </Button>
                    {name}
                  </ListGroupItem>
                </CSSTransition>
              ))}
            </TransitionGroup>
          </ListGroup>
        </Container>
      </div>
    );
  }
}

ShoppingList.propTypes = {
  getItems: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  item: state.item,
});

export default connect(mapStateToProps, { getItems, deleteItem })(ShoppingList);
